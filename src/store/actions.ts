import { AsteroidShort, AsteroidFull } from './types';

export const setAllAsteroids = (json: AsteroidShort[]) => ({
    type: 'SET_ALL_ASTEROIDS',
    payload: json,
});

export const setLinkToNext = (link: string) => ({
    type: 'SET_LINK_TO_NEXT',
    payload: link,
});

export const setCurrentAsteroid = (json: AsteroidFull) => ({
    type: 'SET_CURRENT_ASTEROID',
    payload: json,
});

export const addToDestructionList = (id: string) => ({
    type: 'ADD_TO_DESTRUCTION_LIST',
    payload: id,
});

export const setError = (err: Error) => ({
    type: 'SET_ERROR',
    payload: err,
});
