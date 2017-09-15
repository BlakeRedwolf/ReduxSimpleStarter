# Redux Blog

[![forthebadge](http://forthebadge.com/images/badges/built-with-swag.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/gluten-free.svg)](http://forthebadge.com)

#### An awesome redux blogging app for easy intergration with other React/Redux projects. [reduxblog](https://github.com/BlakeRedwolf/reduxblog) repo link.

### Code Breakdown

##### React Lifecycle Method

A lifecycle method is a function on a component class that is automatically called by react.
There are several of these methods, but the one i used was componentDidMount(). The reason behind this is because react will automatically call this method when a component is about to be rendered, so it makes it the perfect place to fetch some data.

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
As opposed to using for loops and what not.

#### Issues & Bugs

When routing to a new component, the root path renders along with the component.

```
ReactDom.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Route path="/" component={PostsIndex} /> <!-- !!! -->
                <Route path="/posts/new" component={PostsNew} /> <!-- !!! -->
            </div>
        </BrowserRouter>
    </Provider>
    , document.querySelector('.container));
```

React Router's behavior is funny here. To take care of this issue i added the Switch component from react-router-dom. The Switch component takes in a collection of different routes. Routes are nested inside of the Switch component. Switch will look at all the Routes inside of it, then decide to render only the first route in the current url. In other words you want to put your most specific Routes to the top of the list.

```
<Switch>
    <Route path="/posts/new" component={PostsNew} />
    <Route path="/" component={PostsIndex} />
</Switch>
```

This makes React Router behave as expected, and will render routes correctly.

### The 'Programmatic Navigation' Feature

Here we can see that our api request has returned successfully as an object, with an ID.

![reduxblogsuccessrequestwithid](https://user-images.githubusercontent.com/22486834/30468260-00355954-999f-11e7-8a0a-2ff6244e1181.JPG)

But what happens now? For a better user experience, we would probably want the user to automatically be navigated to there new post after it has been successfully posted. This feature is known as 'Programmatic Navigation'. To accomplish this, we need to specify a route in our application navigate to and we know that we want to navigate to this route after our request has been successfully posted.

Lets start by adding a history.push() and we will specify our root route that shows all our applications posts.

![reduxblogprogrammaticroutenav](https://user-images.githubusercontent.com/22486834/30468266-08a1a052-999f-11e7-9d74-5b7b8a69417e.JPG)

But just being able to navigate to the route is only half the problem, we want to be able navigate there after our post has been successfully created. If our application remained like this, we would be navigating to the route before our post has been created which enters us into a sort of race condition where that post is being created at the same time that we're fetching our list of posts. So theres a 50/50 chance that the new post will even show up.

To accomplish this we are going to pass in a callback function, and move the history.push call inside of it.

![reduxblogprogrammaticroutenavinsideaction](https://user-images.githubusercontent.com/22486834/30468268-0a02c200-999f-11e7-92bf-8314b59822b3.JPG)

Now if the action creator calls this function it will automatically navigate us back to our list of posts. Next we have to visit our action creator file and make sure we receive this as callback by passing 'callback' as the second argument to createPost(). 

```
export function createPost(values, callback) { // <- here
```

Finally we will call the callback as a promise after the API request.

```
const request = axios.post(`${ROOT_URL}/posts${API_KEY}` , values)
.then(() => callback()); // <- & here
```

![reduxblogprogrammaticroutenavcallback](https://user-images.githubusercontent.com/22486834/30468269-0bb252aa-999f-11e7-9dfd-28f903fc8de9.JPG)

 Now after we submit our new post, were are automatically navigated to our new post. In the request log you can see the first request complete, then the page instantly changes as we navigate to our list of posts.

![reduxblogfrontpagesuccessnavtopost](https://user-images.githubusercontent.com/22486834/30468244-f3c9f03a-999e-11e7-9727-1816c58f1268.JPG)

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
    redux-form 6.6.3
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
