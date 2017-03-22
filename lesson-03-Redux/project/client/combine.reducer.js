import {combineReducers, createStore} from 'redux';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case "CHANGE_NAME":
            {
                state = {
                    ...state,
                    name: action.payload
                }
                break;
            }
        case "CHANGE_AGE":
            {
                state = {
                    ...state,
                    age: action.payload
                }
                break;
            }
    }
    return state;
}

const tweetsReducer = (state = [], action) => {
    return state;
}

//reducer is for change that state
const reducers = combineReducers({user: userReducer, tweets: tweetsReducer})

const store = createStore(reducers);

store.subscribe(() => {
    console.log('store changes', store.getState())
})

store.dispatch({type: "CHANGE_NAME", payload: "Conan"});
store.dispatch({type: "CHANGE_AGE", payload: 18});
