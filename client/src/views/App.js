import React, { useState } from 'react';
import get from "lodash.get";
import { connect } from 'react-redux';
import { fetchTweets } from '../actions';
import Tweets from '../components/Tweets';
import Form from '../components/Form';
import Hashtags from '../components/Hashtags';
import './App.scss';

const mapStateToProps = (state) => {
    return {
        ...state.params,
        ...state.tweets
    }
};

const COUNT_PER_REQUEST = 5;

function App(props) {
    const isFetching = get(props, 'isFetching', false);
    const items = get(props, 'items', null);
    const statuses = get(props, 'items.json.statuses', []);
    const [currentHashtag, setCurrentHashtag] = useState();
    const [count, setCount] = useState(COUNT_PER_REQUEST);
    const [hashtags, setHashtags] = useState([]);
    const [filteredItems, setFilteredItems] = useState();
    const [filterIsOn, setFilterIsOn] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState();

    function handleSubmit(hashtag) {
        const { dispatch } = props;
        setCurrentHashtag(hashtag);
        setCount(COUNT_PER_REQUEST);
        setHashtags([]);
        setFilteredItems(items);
        dispatch(fetchTweets(hashtag, COUNT_PER_REQUEST));
    }

    function handleHashtagClicks(value) {
        if (statuses == null) return;
        if (filterIsOn) return setFilterIsOn(false);

        const results = statuses.filter((entry) => {
            const hasCurrentHashtag = entry.entities.hashtags.some(e => e.text.toLowerCase() === value.toLowerCase());
            if (hasCurrentHashtag) return entry;
            return null;
        });

        setFilteredItems(results);
        setFilterIsOn(true);
        setSelectedFilter(value);
    }

    function handleLoadMore() {
        const { dispatch } = props;
        setCount(count + COUNT_PER_REQUEST);
        dispatch(fetchTweets(currentHashtag, count + COUNT_PER_REQUEST));
        uniqueHashtags(statuses);
    }

    function uniqueHashtags(statuses) {
        if (statuses == null) return;

        const results = statuses.map(status => {
            const hashtagsArray = get(status, 'entities.hashtags', []);
            if (hashtagsArray.length > 0) {
                return hashtagsArray.map(hashtag => {
                    return hashtag.text;
                });
            }
            return null;
        });

        const mergedArrays = [].concat.apply([], results);
        setHashtags(mergedArrays);
    }

    return (
        <div className={`App`}>
            <h1 className={`App__title`}>Tweet Feed</h1>
            <div className={`App__container`}>
                <div className={`App__column`}>
                    <Form handleSubmit={handleSubmit} isFetching={isFetching} />
                    <div className={`App__results--desktop`}>
                        <Tweets handleHashtagClicks={handleHashtagClicks} handleLoadMore={handleLoadMore} items={filterIsOn ? filteredItems : statuses} filterIsOn={filterIsOn} selectedFilter={selectedFilter} handleSubmit={handleSubmit} />
                    </div>
                </div>
                <div className={`App__column`}>
                    <Hashtags handleSubmit={handleHashtagClicks} isFetching={isFetching} hashtags={hashtags} filterIsOn={filterIsOn} selectedFilter={selectedFilter} />
                    <div className={`App__results--mobile`}>
                        <Tweets handleHashtagClicks={handleHashtagClicks} filterIsOn={filterIsOn} selectedFilter={selectedFilter} handleSubmit={handleSubmit} handleLoadMore={handleLoadMore} items={filterIsOn ? filteredItems : statuses} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(App);
