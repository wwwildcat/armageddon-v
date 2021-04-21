import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { render, screen } from '@testing-library/react';
import Layout from './Layout';

const mockStore = configureStore([]);
let store: Store;

describe('Layout component should correct render', () => {
    describe('on home page:', () => {
        beforeEach(() => {
            store = mockStore({
                allAsteroids: [],
                currentAsteroid: {},
            });

            render(
                <Provider store={store}>
                    <Layout pageType={0} />
                </Provider>
            );
        });

        it('options', () => {
            expect(screen.getByTestId('options')).toBeInTheDocument();
        });

        it('list', () => {
            expect(screen.getByTestId('list')).toBeInTheDocument();
        });

        it('no full card', () => {
            expect(screen.queryByTestId('card-full')).not.toBeInTheDocument();
        });

        it('no error', () => {
            expect(screen.queryByTestId('error')).not.toBeInTheDocument();
        });
    });

    describe('on asteroid page:', () => {
        beforeEach(() => {
            store = mockStore({
                currentAsteroid: {
                    asteroid: {
                        diameter: 1,
                        closestApproach: {
                            distance: {},
                        },
                    },
                    closeApproachFull: [],
                },
                distanceType: 'kilometers',
            });

            render(
                <Provider store={store}>
                    <Layout pageType={1} />
                </Provider>
            );
        });

        it('options', () => {
            expect(screen.getByTestId('options')).toBeInTheDocument();
        });

        it('no list', () => {
            expect(screen.queryByTestId('list')).not.toBeInTheDocument();
        });

        it('full card', () => {
            expect(screen.getByTestId('card-full')).toBeInTheDocument();
        });

        it('no error', () => {
            expect(screen.queryByTestId('error')).not.toBeInTheDocument();
        });
    });

    describe('on destruction page:', () => {
        beforeEach(() => {
            store = mockStore({
                allAsteroids: [],
                currentAsteroid: {},
            });

            render(
                <Provider store={store}>
                    <Layout pageType={2} />
                </Provider>
            );
        });

        it('options', () => {
            expect(screen.getByTestId('options')).toBeInTheDocument();
        });

        it('list', () => {
            expect(screen.getByTestId('list')).toBeInTheDocument();
        });

        it('no full card', () => {
            expect(screen.queryByTestId('card-full')).not.toBeInTheDocument();
        });

        it('no error', () => {
            expect(screen.queryByTestId('error')).not.toBeInTheDocument();
        });
    });

    describe('on error page:', () => {
        beforeEach(() => {
            store = mockStore({
                currentAsteroid: {},
            });

            render(
                <Provider store={store}>
                    <Layout pageType={3} />
                </Provider>
            );
        });

        it('no options', () => {
            expect(screen.queryByTestId('options')).not.toBeInTheDocument();
        });

        it('no list', () => {
            expect(screen.queryByTestId('list')).not.toBeInTheDocument();
        });

        it('no full card', () => {
            expect(screen.queryByTestId('card-full')).not.toBeInTheDocument();
        });

        it('error', () => {
            expect(screen.getByTestId('error')).toBeInTheDocument();
        });
    });
});
