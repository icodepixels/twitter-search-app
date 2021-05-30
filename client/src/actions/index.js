import fetch from 'cross-fetch';

export const UPDATE_HASHTAG = 'UPDATE_HASHTAG';
export const updateHashtag = hashtag => ({
    type: UPDATE_HASHTAG,
    hashtag
});

export const UPDATE_PARAMS = 'UPDATE_PARAMS';
export const updateParams = (hashtag, count, result_type) => ({
    type: UPDATE_PARAMS,
    hashtag,
    count,
    result_type
})

export const REQUEST_TWEETS = 'REQUEST_TWEETS';
export const requestTweets = () => ({
    type: REQUEST_TWEETS
});

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const receiveTweets = (json) => {
    return ({
        type: RECEIVE_TWEETS,
        tweets: json,
        receivedAt: Date.now()
    })
};

export const fetchTweets = (hashtag, count, result_type) => {
    return function (dispatch) {
        dispatch(updateParams(hashtag, count, result_type));
        dispatch(requestTweets());
        return fetch(`http://127.0.0.1:8080/search/${hashtag}/${count}/${result_type}`)
            .then(
                response => response.json(),
                error => console.log('ERROR => ', error)
            )
            .then(json => dispatch(receiveTweets(json))
            )
    }
}


