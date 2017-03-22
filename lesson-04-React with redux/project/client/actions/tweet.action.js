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