import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { setAllAsteroids, setLinkToNext, setError } from './actions';
import { formatAllAsteroids } from '../utils/formatJSON';
import State from './types';

export const fetchAllAsteroids = (url: string) => {
    return async (dispatch: ThunkDispatch<State, void, Action>) => {
        try {
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
