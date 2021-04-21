import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { setDistanceType, setHazardous } from '@store/actions';
import Options from './Options';

const mockStore = configureStore([]);
let store: Store, filter: Element, kilometers: Element, lunar: Element;

describe('Options component should correct render', () => {
    describe('filter', () => {
        describe('on:', () => {
            beforeEach(() => {
                store = mockStore({
                    hazardous: true,
                });

                store.dispatch = jest.fn();

                render(
                    <Provider store={store}>
                        <Options showFilter />
                    </Provider>
                );

                filter = screen.getByTestId('options').firstElementChild as Element;
            });

            it('checked', () => {
                expect(filter.firstElementChild).toHaveAttribute('checked');
            });

            it('call dispatch with setHazardous(false)', () => {
                fireEvent.click(filter.firstElementChild as Element);

                expect(store.dispatch).toBeCalledTimes(1);
                expect(store.dispatch).toBeCalledWith(setHazardous(false));
            });
        });

        describe('off:', () => {
            beforeEach(() => {
                store = mockStore({
                    hazardous: false,
                });

                store.dispatch = jest.fn();

                render(
                    <Provider store={store}>
                        <Options showFilter />
                    </Provider>
                );

                filter = screen.getByTestId('options').firstElementChild as Element;
            });

            it('not checked', () => {
                expect(filter.firstElementChild).not.toHaveAttribute('checked');
            });

            it('call dispatch with setHazardous(true)', () => {
                fireEvent.click(filter.firstElementChild as Element);

                expect(store.dispatch).toBeCalledTimes(1);
                expect(store.dispatch).toBeCalledWith(setHazardous(true));
            });
        });
    });

    describe('without filter:', () => {
        beforeEach(() => {
            render(
                <Provider store={store}>
                    <Options showFilter={false} />
                </Provider>
            );
        });

        it('no filter', () => {
            expect(screen.getByTestId('options').firstElementChild).not.toHaveClass(
                'Options-Filter'
            );
        });
    });

    describe('links', () => {
        describe('with kilometers distance:', () => {
            beforeEach(() => {
                store = mockStore({
                    distanceType: 'kilometers',
                });

                store.dispatch = jest.fn();

                render(
                    <Provider store={store}>
                        <Options showFilter />
                    </Provider>
                );

                kilometers = screen.getByTestId('options').lastElementChild?.children[1] as Element;
                lunar = screen.getByTestId('options').lastElementChild?.children[3] as Element;
            });

            describe('kilometers', () => {
                it('is active', () => {
                    expect(kilometers).toHaveClass('Links-Item_active');
                });

                it('has no child', () => {
                    expect(kilometers.children.length).toEqual(0);
                });
            });

            describe('lunar', () => {
                it('is not active', () => {
                    expect(lunar).not.toHaveClass('Links-Item_active');
                });

                it('has button child', () => {
                    expect(lunar.children.length).toEqual(1);
                    expect(lunar.firstElementChild).toHaveClass('Options-Button');
                });

                it('call dispatch with setDistanceType("lunar")', () => {
                    fireEvent.click(lunar.firstElementChild as Element);

                    expect(store.dispatch).toBeCalledTimes(1);
                    expect(store.dispatch).toBeCalledWith(setDistanceType('lunar'));
                });
            });
        });

        describe('with lunar distance:', () => {
            beforeEach(() => {
                store = mockStore({
                    distanceType: 'lunar',
                });

                store.dispatch = jest.fn();

                render(
                    <Provider store={store}>
                        <Options showFilter />
                    </Provider>
                );

                kilometers = screen.getByTestId('options').lastElementChild?.children[1] as Element;
                lunar = screen.getByTestId('options').lastElementChild?.children[3] as Element;
            });

            describe('kilometers', () => {
                it('is not active', () => {
                    expect(kilometers).not.toHaveClass('Links-Item_active');
                });

                it('has button child', () => {
                    expect(kilometers.children.length).toEqual(1);
                    expect(kilometers.firstElementChild).toHaveClass('Options-Button');
                });

                it('call dispatch with setDistanceType("kilometers")', () => {
                    fireEvent.click(kilometers.firstElementChild as Element);

                    expect(store.dispatch).toBeCalledTimes(1);
                    expect(store.dispatch).toBeCalledWith(setDistanceType('kilometers'));
                });
            });

            describe('lunar', () => {
                it('is active', () => {
                    expect(lunar).toHaveClass('Links-Item_active');
                });

                it('has no child', () => {
                    expect(lunar.children.length).toEqual(0);
                });
            });
        });
    });
});
