# Creating Basic React Component

## React is a library
As you know, react is very famous and it is always compared with angular, react actually can do anything for your single page application.
But react is more like a library as well as angular is a framework. You can treat react like a jquery if it helps you to understand it.

## Create a component with plain js

*  1.Create a directory and open visual studio code under it

*  2.Create an index.html file with the code as below and add an div element with id named root
        
        <!DOCTYPE html>
        <html lang="en">
        <head>
                <title></title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>

        <body>
                <div id="root"></div>
        </body>

        </html>

*  3.Create an index.js file with the code as below
        
        var Greeting = function () {
            return React.createElement("div", null, "Hello world!");
        }

        ReactDOM.render(Greeting(), document.getElementById('root'));


the React is an object that owns many method,the most used one is to createElement with mutiple parameters which will resulting in create the html dom in the page.
the ReactDOM is an object mostly used for rendering the whole element under the root element.
You can imagine that this is a jquery append method and ReactDOM.render is kind of like replace the content under the root element.

*  4.Add the libraries script tag after head like below:
        
        <script src="https://unpkg.com/react@15/dist/react.min.js"></script>
        <script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
        <script src="./index.js" async></script>

*  5.Open the index.html with brwoser,you can see the Hello world is present in front of you.



## Summary
In this chapter, I told you what is react like, and how to create a simple component with plain js. Also I told you what the mostly used functions do and what they
mean as like Jquery.
In next chapter, I will start a real project in developing situation, you can learn how to create a react component with ES6 by using nodejs,express,webpack.