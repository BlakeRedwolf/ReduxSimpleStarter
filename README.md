# Redux Blog

An awesome redux blogging app for easy intergration with my other projects. [reduxblog](https://github.com/BlakeRedwolf/reduxblog) repo link.

### Dependencies

    axios 0.16.2
    babel-preset-stage-1 6.1.18
    lodash 3.10.1
    react 0.14.3
    react-dom 0.14.3
    react-redux 4.3.0
    react-router 2.0.1
    react-router-dom 4.0.0
    redux 3.0.4
    redux-promise 0.5.3

### Dev Dependencies

    babel-core 6.2.1
    babel-loader 6.2.0
    babel-preset-es2015 6.1.18
    babel-preset-react 6.1.18
    chai 3.5.0
    chai-jquery 2.0.0
    jquery 2.2.1
    jsdom 8.1.0
    mocha 2.4.5
    react-addons-test-utils 0.14.7
    webpack 1.12.9
    webpack-dev-server 1.14.0

### Code Breakdown

##### The 'Magic' Function

For managing state inside the apps posts reducer (ref. reducer_posts.js), i utilized a magic function called mapKeys. The way mapKeys works is to provide the first argument with an array and the second argument with the property we want to pull off each object to use as the key on the result object. 

```
const posts = [
  { id: 4, title: "Blog post 4" },
  { id: 25, title: "Blog post 25" },
  { id: 36, title: "Blog post 36" }
];

const state = _.mapKeys(posts, 'id');
```

So to quickly look up a post:

```
state["4"]
```
As opposed to using for loops and what not. Simple yet effective.

##### React Lifecycle Method

A lifecycle method is a function on a component class that is automatically called by react.
There are serval of these methods, but the one i used was componentDidMount(). The reason behind this is because react will automatically call this method when a component is about to be rendered, so it makes it the perfect place to fetch some data.

```
class PostsIndex extends Component {
    componentDidMount() {
        // perfect place to fetch data
    }

    render() {
        return(
            <div>
                Posts Index
            </div>
        )
    }
}
```

As opposed to fetching data on user action, like onClick. It doesnt make a difference if we call our action creator before or after our component is rendered. Reason for this is because fetching our data is an asyncronous operation. React doesnt have any concept of figuring out how to 'not render this component before we do some preloading operation". React will always render as soon as it can.