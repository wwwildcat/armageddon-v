import { useMemo } from 'react';
import { createStore, applyMiddleware, AnyAction, Reducer, Store } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import reducer from './reducers';
import State, { AsteroidShort, AsteroidFull } from './types';

export interface StoreExtension {
    dispatch: ThunkDispatch<State, void, AnyAction>;
}

let store: Store | null;

const initialState = {
    allAsteroids: [] as AsteroidShort[],
    currentAsteroid: null as null | AsteroidFull,
    error: null as null | Error,
};

const initStore = (preloadedState = initialState) => {
    return createStore<State, AnyAction, StoreExtension, void>(
        reducer as Reducer<State, AnyAction>,
        preloadedState as State,
        applyMiddleware(thunk)
    );
};

export const initializeStore = (preloadedState?: State) => {
    let _store = store ?? initStore(preloadedState as State);

    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        });

        store = null;
    }

    if (typeof window === 'undefined') return _store;

    if (!store) store = _store;

    return _store;
};

export const useStore = (state: State): Store<State, AnyAction> & StoreExtension =>
    useMemo(() => initializeStore(state), [state]);
