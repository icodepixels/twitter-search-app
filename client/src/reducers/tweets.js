import { REQUEST_TWEETS, RECEIVE_TWEETS } from '../actions';

const initialState = {
    isFetching: false,
    items: {}
}

function tweets(state = initialState, action) {
    switch (action.type) {
        case REQUEST_TWEETS:
            return {
                ...state,
                isFetching: true,
            }
        case RECEIVE_TWEETS:
            return {
                ...state,
                isFetching: false,
                items: action.tweets,
                lastUpdated: action.receivedAt
            }
        default:
            return state;
    }
}
export default tweets;