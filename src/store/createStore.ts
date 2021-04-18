import { useMemo } from 'react';
import { createStore, applyMiddleware, AnyAction, Reducer, Store } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { generateNextLink } from 'src/utils/generators';
import reducer from './reducers';
import State, { AsteroidShort, AsteroidFull } from './types';

export interface StoreExtension {
    dispatch: ThunkDispatch<State, void, AnyAction>;
}

let store: Store | null;

const initialState = {
    allAsteroids: [] as AsteroidShort[],
    currentAsteroid: {} as AsteroidFull,
    error: null as null | Error,
    linkToNext: generateNextLink(),
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
            allAsteroids: [...store.getState().allAsteroids, ...preloadedState.allAsteroids],
            distanceType: store.getState().distanceType,
            linkToNext: store.getState().linkToNext,
        });

        store = null;
    }

    if (typeof window === 'undefined') return _store;

    if (!store) store = _store;

    return _store;
};

export const useStore = (state: State): Store<State, AnyAction> & StoreExtension =>
    useMemo(() => initializeStore(state), [state]);
