import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
    setIsLoading,
    setAllAsteroids,
    setCurrentAsteroid,
    setLinkToNext,
    setError,
} from './actions';
import { formatAllAsteroids, formatCurrentAsteroid } from '@utils/formatJSON';
import State, { AsteroidFull } from './types';

export const fetchAllAsteroids = (url: string) => {
    return async (dispatch: ThunkDispatch<State, void, Action>) => {
        try {
            dispatch(setIsLoading());
            const response = await fetch(url);
            const fullJSON = await response.json();
            const currentDate = new URL(url).searchParams.getAll('start_date')[0];
            const asteroids = fullJSON.near_earth_objects[currentDate];

            dispatch(setAllAsteroids(formatAllAsteroids(asteroids)));
            dispatch(setLinkToNext(fullJSON.links.next));
        } catch (err) {
            dispatch(setError(err));
        }
    };
};

export const fetchCurrentAsteroid = (id: string, date: string, destruction: string) => {
    return async (dispatch: ThunkDispatch<State, void, Action>) => {
        try {
            const response = await fetch(
                `http://www.neowsapp.com/rest/v1/neo/${id}?api_key=DEMO_KEY`
            );
            const fullJSON = await response.json();

            dispatch(
                setCurrentAsteroid(
                    formatCurrentAsteroid(fullJSON, date, destruction) as AsteroidFull
                )
            );
        } catch (err) {
            dispatch(setError(err));
        }
    };
};
