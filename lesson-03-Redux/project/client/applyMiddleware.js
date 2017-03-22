import {applyMiddleware, createStore} from 'redux';

//reducer is for change that state
const reducer = function (state = 0, action) {
    if (action.type === "INC") {
        return state + action.payload;
    } else if (action.type === "DEC") {
        return state - action.payload;
    }

    return state;
}

const logger = (store) => (next) => (action) => {
    console.log("action filerd", action)
    next(action);
}

const middleware = applyMiddleware(logger);

const store = createStore(reducer, 0, middleware);

store.subscribe(() => {
    console.log('store changes', store.getState())
})

store.dispatch({type: "INC", payload: 1});
store.dispatch({type: "INC", payload: 1});
store.dispatch({type: "INC", payload: 1});
store.dispatch({type: "INC", payload: 1});
store.dispatch({type: "INC", payload: 1});