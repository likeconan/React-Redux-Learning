export default function reducer(state = {
    user: {}
}, action) {
    switch (action.type) {
        case 'GET_USER':
            return {
                ...state,
                user: action.payload
            }
            break;

        default:
            return state;
    }
}