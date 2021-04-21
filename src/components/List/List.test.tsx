import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { render, screen, fireEvent } from '@testing-library/react';
import List from './List';

const mockStore = configureStore([]);
let store: Store, itemsContainer: Element, buttonContainer: Element;

describe('List component should correct render', () => {
    describe('without filter', () => {
        beforeEach(() => {
            store = mockStore({
                allAsteroids: [
                    {
                        name: '417949 (2007 TB23)',
                        diameter: 1,
                        isHazardous: true,
                        inDestructionList: true,
                        closestApproach: {
                            distance: {},
                        },
                    },
                    {
                        name: '474179 (1999 VS6)',
                        diameter: 1,
                        isHazardous: false,
                        inDestructionList: true,
                        closestApproach: {
                            distance: {},
                        },
                    },
                    {
                        name: '(2011 UT20)',
                        diameter: 1,
                        isHazardous: true,
                        inDestructionList: false,
                        closestApproach: {
                            distance: {},
                        },
                    },
                    {
                        name: '(2009 BD77)',
                        diameter: 1,
                        isHazardous: false,
                        inDestructionList: false,
                        closestApproach: {
                            distance: {},
                        },
                    },
                ],
                hazardous: false,
                distanceType: 'kilometers',
            });
        });

        describe('on home page:', () => {
            beforeEach(() => {
                render(
                    <Provider store={store}>
                        <List infinite />
                    </Provider>
                );

                itemsContainer = screen.getByTestId('list').firstElementChild as Element;
            });

            it('loader', () => {
                expect(screen.getByTestId('loader')).toBeInTheDocument();
            });

            it('no button container', () => {
                expect(screen.getByTestId('list').lastElementChild).not.toHaveClass(
                    'List-ButtonContainer'
                );
            });

            it('all children', () => {
                expect(itemsContainer.children.length).toEqual(5);
            });
        });

        describe('on destruction page:', () => {
            beforeEach(() => {
                render(
                    <Provider store={store}>
                        <List infinite={false} />
                    </Provider>
                );

                itemsContainer = screen.getByTestId('list').firstElementChild as Element;
                buttonContainer = screen.getByTestId('list').lastElementChild as Element;
            });

            it('no loader', () => {
                expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
            });

            it('children are filtered', () => {
                expect(itemsContainer.children.length).toEqual(2);
            });

            it('filtered children are in destruction list', () => {
                expect(itemsContainer.firstElementChild).toHaveTextContent('417949 (2007 TB23)');
                expect(itemsContainer.children[1]).toHaveTextContent('474179 (1999 VS6)');
            });

            it('button container', () => {
                expect(buttonContainer).toHaveClass('List-ButtonContainer');
            });

            it('no empty message', () => {
                expect(buttonContainer).not.toHaveTextContent(
                    'Вы пока не отправили ни одного астероида на уничтожение.'
                );
            });

            it('button', () => {
                expect(buttonContainer).toHaveTextContent('Заказать бригаду');
            });

            it('no message after click', () => {
                expect(buttonContainer).not.toHaveTextContent(
                    'Бригада им. Брюса Уиллиса будет доставлена на выбранные астероиды в нужный момент и выполнит свою нелёгкую работу.'
                );
            });
        });

        describe('with empty destruction list:', () => {
            beforeEach(() => {
                store = mockStore({
                    allAsteroids: [],
                });

                render(
                    <Provider store={store}>
                        <List infinite={false} />
                    </Provider>
                );

                buttonContainer = screen.getByTestId('list').lastElementChild as Element;
            });

            it('no button', () => {
                expect(buttonContainer).not.toHaveTextContent('Заказать бригаду');
            });

            it('empty message', () => {
                expect(buttonContainer).toHaveTextContent(
                    'Вы пока не отправили ни одного астероида на уничтожение.'
                );
            });
        });

        describe('after button click:', () => {
            beforeEach(() => {
                render(
                    <Provider store={store}>
                        <List infinite={false} />
                    </Provider>
                );

                buttonContainer = screen.getByTestId('list').lastElementChild as Element;
                fireEvent.click(buttonContainer.firstElementChild as Element);
            });

            it('no button', () => {
                expect(buttonContainer).not.toHaveTextContent('Заказать бригаду');
            });

            it('message after click', () => {
                expect(buttonContainer).toHaveTextContent(
                    'Бригада им. Брюса Уиллиса будет доставлена на выбранные астероиды в нужный момент и выполнит свою нелёгкую работу.'
                );
            });
        });
    });

    describe('with filter', () => {
        beforeEach(() => {
            store = mockStore({
                allAsteroids: [
                    {
                        name: '417949 (2007 TB23)',
                        diameter: 1,
                        isHazardous: true,
                        inDestructionList: true,
                        closestApproach: {
                            distance: {},
                        },
                    },
                    {
                        name: '474179 (1999 VS6)',
                        diameter: 1,
                        isHazardous: false,
                        inDestructionList: true,
                        closestApproach: {
                            distance: {},
                        },
                    },
                    {
                        name: '(2011 UT20)',
                        diameter: 1,
                        isHazardous: true,
                        inDestructionList: false,
                        closestApproach: {
                            distance: {},
                        },
                    },
                    {
                        name: '(2009 BD77)',
                        diameter: 1,
                        isHazardous: false,
                        inDestructionList: false,
                        closestApproach: {
                            distance: {},
                        },
                    },
                ],
                hazardous: true,
                distanceType: 'kilometers',
            });
        });

        describe('on home page:', () => {
            beforeEach(() => {
                render(
                    <Provider store={store}>
                        <List infinite />
                    </Provider>
                );

                itemsContainer = screen.getByTestId('list').firstElementChild as Element;
            });

            it('children are filtered', () => {
                expect(itemsContainer.children.length).toEqual(3);
            });

            it('filtered children are hazardous', () => {
                expect(itemsContainer.firstElementChild).toHaveTextContent('417949 (2007 TB23)');
                expect(itemsContainer.children[1]).toHaveTextContent('(2011 UT20)');
            });
        });

        describe('on destruction page:', () => {
            beforeEach(() => {
                render(
                    <Provider store={store}>
                        <List infinite={false} />
                    </Provider>
                );

                itemsContainer = screen.getByTestId('list').firstElementChild as Element;
            });

            it('children are filtered', () => {
                expect(itemsContainer.children.length).toEqual(1);
            });

            it('filtered children are hazardous & in destruction list', () => {
                expect(itemsContainer.firstElementChild).toHaveTextContent('417949 (2007 TB23)');
            });
        });
    });
});
