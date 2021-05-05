import localForage from 'localforage';
import React, { FC, ReactNode } from 'react';
import { combineReducers, ReducersMapObject } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { LoadingCircle } from 'src/view/components/loading/Circle';
import { StateType } from 'typesafe-actions';
import createStore from './createStore';
import * as reducers from './reducers';
import ReduxProviderFactory from './_providers/ReduxProviderFactory';

/* ------------- Reducers ------------- */
const allReducers = Object.values(reducers).reduce(
    (prev: ReducersMapObject, curr: Record<string, any>): ReducersMapObject => {
        return {
            ...prev,
            ...curr.reducerMap,
        };
    },
    {},
);

const rootReducer = combineReducers(allReducers);

export type RootState = StateType<typeof rootReducer>;

localForage.config({
    name: 'Math-App',
    storeName: 'Math-App',
});

const persistConfig = {
    key: 'root',
    storage: localForage,
    whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* ------------- Create Store ------------- */
const { store } = createStore(persistedReducer);

const persistor = persistStore(store);

interface Props {
    loading?: ReactNode;
    children: ReactNode;
}

/* ------------- Create Provider ------------- */
export const ReduxProvider: FC<Props> = ({ children }) => (
    <ReduxProviderFactory store={store}>
        <PersistGate
            loading={<LoadingCircle loading={true} />}
            persistor={persistor}
        >
            {children}
        </PersistGate>
    </ReduxProviderFactory>
);
