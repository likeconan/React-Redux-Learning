# Redux

## Handle immutable well in js

As you know,js is not handling immutable very well, what does it mean, you can try the below code in console:

    var a = {name:"Hello"}
    var b = a
    b.name = "World"

You will see that the name of a is changed into "World", that's not what we want in redux, so we need to keep every state immutable in order to make the store clean and right.

## The basic contents of redux

* ### Store and reducer

You create one store by createStore() method, and pass the reducer as a parameter into the createStore method, the reducer is a function used for exectuing related action when
the dispatch fired, you can check the code like below:

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

So the store and reducer is extremly simple, just create your one store, and pass reducer, dispatch the action you want, make the reducer method for exectuing related action,
But also we definitely have many reducers in different files in a real project, So next I will tell you combineReducer.

* ### combineReducer

As you can tell from the name, you can combine mutiple reducers with the method and then pass the combined one into createStore method like below:

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

You can take the userReducer and tweetsReducer as from different files.

* ### applyMiddleware

In a real project, we always use async method, and the applyMiddleware is used for handling that. The applyMiddleware is fired between dispatch and reducers, it means
you can handle everything before it goes to reducer, for example we create a logger applyMiddleware like below:

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

So far so good, you know the basic contents for redux now, its enough for you to start react and redux.