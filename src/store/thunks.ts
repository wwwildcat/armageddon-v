import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { setAllAsteroids, setError } from './actions';
import { formatAllAsteroids } from '../utils/formatJSON';
import State from './types';

export const fetchAllAsteroids = () => {
    return async (dispatch: ThunkDispatch<State, void, Action>) => {
        try {
            const response = await fetch(
                'https://api.nasa.gov/neo/rest/v1/feed?start_date=2021-04-18&end_date=2021-04-18&api_key=DEMO_KEY'
            );
            const fullJSON = await response.json();
            const asteroids = fullJSON.near_earth_objects['2021-04-18'];

            dispatch(setAllAsteroids(formatAllAsteroids(asteroids, fullJSON.links.next)));
        } catch (err) {
            dispatch(setError(err));
        }
    };
};
