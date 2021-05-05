import { applyMiddleware, compose, createStore, Reducer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import container from 'src/container';

interface CreatedStore {
    store: Store;
}

// creates the store
export default (rootReducer: Reducer): CreatedStore => {
    /* ------------- Redux Configuration ------------- */

    const middleware = [];
    const enhancers = [];

    // middleware.push(GraphQLClient.middleware())

    /* ------------- Thunk Middleware ------------- */
    // inject container to thunk's extra argument
    const thunkMiddleWare = thunk.withExtraArgument(container);
    middleware.push(thunkMiddleWare);

    /* ------------- Assemble Middleware ------------- */

    enhancers.push(composeWithDevTools(applyMiddleware(...middleware)));

    /* ------------- createStore ------------- */

    const store = createStore(rootReducer, compose(...enhancers));

    return { store };
};
