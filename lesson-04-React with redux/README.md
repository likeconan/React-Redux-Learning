# React&Redux Learning

## Implementing redux and react-redux

* ### Install essential packages

First of all you need to install these packages, type the commands into terminal:

    npm install --save redux react-redux redux-logger redux-promise-middleware redux-thunk
    npm install --save-dev babel-plugin-transform-class-properties babel-plugin-transform-decorators-legacy

Then you are ready to refactor the robot-chatroom you create before

* ### Using react-redux

Create the store.js and make the code like below:

    import {applyMiddleware, createStore} from 'redux'

    import logger from "redux-logger"
    import thunk from "redux-thunk"
    import promise from "redux-promise-middleware"

    import reducer from "./reducers"

    const middleware = applyMiddleware(promise(), thunk, logger())

    export default createStore(reducer, middleware)

As you can see, we only create one store,and use the applyMiddleware with promise,thunk,logger. thunk is used for pass dispatch in action function so that you can fire
it in async method

And then create reducers directory and an index.js file to combine all reducers like below:

    import {combineReducers} from 'redux';

    import userStore from './user.reducer';
    import tweetStore from './tweet.reducer';

    export default combineReducers({
        userStore,
        tweetStore,
    });

Next thing you need to do is adding related actions,create the actions directory, and taking one as an example like below:

    import axios from 'axios';

    export function post(tweet) {
        return {type: 'POST_TWEET', payload: tweet}
    }

    export function reply(val) {
        return function (dispatch) {
            axios.get("https://api.api.ai/api/query", {
                params: {
                    v: 20150910,
                    query: val,
                    lang: 'en',
                    sessionId: 'e1358954-8738-4ce5-b4ed-4dc94b8a68c8',
                    timezone: new Date()
                },
                headers: {
                    'Authorization': 'Bearer 3e6ff422acc74c45bc0069f5d0412a21'
                }
            }).then((res) => {
                dispatch({
                    type: 'REPLY_TWEET',
                    payload: {
                        text: res.data.result.fulfillment.speech,
                        className: 'list-group-item list-group-item-success',
                        user: {
                            username: 'Ewa',
                            header: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=149009507072' +
                                    '7&di=fbfb9dcd75efd6dd496ee7133f0454da&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.co' +
                                    'm%2Fforum%2Fw%253D580%2Fsign%3Dc1ac4eaa369b033b2c88fcd225cf3620%2F7cd98d1001e939' +
                                    '0134b9de9079ec54e737d196e0.jpg'
                        }
                    }
                });
            });
        }
    }

    export function editText(val) {
        return {type: 'EDIT_TEXT', payload: val}
    }

You can see how I use async method to dispatch from the reply function.

The last thing you need to change is in ReactDOM.render method, no matter what you render you must add the provider and wrap it,Also you add the store props with your
created redux store like below:

    import store from './store';
    import {Provider} from 'react-redux';

    ReactDOM.render(
        <Provider store={store}>
            <RobotChatRoom/>
        </Provider>, document.getElementById('root'));

The Provider is used for rerendering related component when the state changes.


* ### Refactoring components

The principle of refactoring components is dividing the components into smart ones and dumb ones.
The smart ones mean that when the state of the component is changeable so that the component would rerender again, you definitely do not
want to rerender the whole part just because of a tiny change.So we divide the robot-chatroom into four components.

> * One is TextField, beacuse it may be reused many times and we don't take the state into consideration so we make it a dumb one 
> * One is post-tweet, it would import the TextField and change the state with user's input value, so its a smart one
> * One is chats-list, beacuse it would change with every new posted meesage, so it defintely a smart one.
> * One is robot-chatroom, the original one, it is the root one and just need to render its childer, so its a dumb one.

The other thing you need to know is how to use connect in smart react component.

    import {connect} from 'react-redux';

    @connect((store) => {
        return {editText: store.tweetStore.editText, user: store.userStore.user}
    })

    class PostTweet extends Component {
            _onChange = (val) => {
                this
                    .props
                    .dispatch(editText(val));
            }   
           ......more code


Take one as example, you only need to add the decorator in front of the component class, and return the object from the store state,
Then the props will own dispatch propery and the returned object so that you can bind it into the component just with props. Once
you dispatch an action and the state changes, it will rerender the component again with new state.