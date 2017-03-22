export default function reducer(state = {
    tweets: [],
    editText: ''
}, action) {
    switch (action.type) {
        case 'POST_TWEET':
            return {
                ...state,
                tweets: [
                    ...state.tweets,
                    action.payload
                ]
            }
            break;
        case 'REPLY_TWEET':
            return {
                ...state,
                tweets: [
                    ...state.tweets,
                    action.payload
                ]
            }
        case 'EDIT_TEXT':
            return {
                ...state,
                editText: action.payload
            }
        default:
            return state;
    }
}