import {createStore} from 'redux';


//reducer is for change that state
const reducer = function (state, action) {
    if (action.type == "INC") {
        return state + action.payload;
    }
    return state;
}

const store = createStore(reducer);

store.subscribe(() => {
    console.log('store changes', store.getState())
})

store.dispatch({type: "INC", payload: 1});
store.dispatch({type: "INC", payload: 1});
store.dispatch({type: "INC", payload: 1});
store.dispatch({type: "INC", payload: 1});
store.dispatch({type: "INC", payload: 1});