import get from "lodash.get";
import Tweet from "./Tweet";
import "./Tweets.scss";

function Tweets(props) {
    const tweets = get(props, 'items', []);

    return (
        <div className={`Tweets`}>
            {tweets.length > 0 ? tweets.map(tweet => <Tweet key={tweet.id} filterIsOn={props.filterIsOn} selectedFilter={props.selectedFilter} tweet={tweet} handleSubmit={props.handleHashtagClicks} />) : <div className={`Tweets__defaultMessage`}>0 tweets</div>}

            {tweets.length > 0 && <div className={`Tweets__action`}><button type="button" onClick={props.handleLoadMore} className={`Tweets__button`}>Load More</button></div>}
        </div>
    );
}

export default Tweets;
