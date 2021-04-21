import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { addToDestructionList } from '@store/actions';
import Card from './Card';

const mockStore = configureStore([]);
let store: Store, background: Element, info: Element, result: Element, approach: Element;
const asteroid = {
    id: '2417949',
    name: '417949 (2007 TB23)',
    diameter: 782.60499749675,
    isHazardous: false,
    inDestructionList: false,
    closestApproach: {
        date: '2021-04-21',
        distance: {
            kilometers: '33402476.379041615',
            lunar: '86.8566063905',
        },
    },
};
const closeApproachFull = [
    {
        date: '2021-04-21',
        dateFull: '2021-Apr-21 08:45',
        distance: {
            kilometers: '33402476.379041615',
            lunar: '86.8566063905',
        },
        orbitingBody: 'Earth',
        velocity: '21.4011261387',
    },
];

describe('Card component should correct render', () => {
    describe('short asteroid info', () => {
        describe('with distance in kilometers', () => {
            beforeEach(() => {
                store = mockStore({
                    distanceType: 'kilometers',
                });

                store.dispatch = jest.fn();
            });

            describe('not hazardous:', () => {
                beforeEach(() => {
                    render(
                        <Provider store={store}>
                            <Card asteroid={asteroid} type="short" />
                        </Provider>
                    );

                    background = screen.getByTestId('card-short').firstElementChild
                        ?.firstElementChild as Element;
                    info = screen.getByTestId('card-short').firstElementChild
                        ?.children[1] as Element;
                    result = screen.getByTestId('card-short').firstElementChild
                        ?.lastElementChild as Element;
                });

                it('has non-hazardous background', () => {
                    expect(background).not.toHaveClass('Card-Background_hazardous');
                });

                it('has asteroid icon style', () => {
                    expect(background.firstElementChild).toHaveStyle(
                        '--left-shift:139.875390749834px; --bottom-shift:5.595015629993361px; height: 279.750781499668px; width: 279.750781499668px;'
                    );
                });

                it('has link', () => {
                    expect(info.firstElementChild?.firstElementChild).toHaveAttribute(
                        'href',
                        '/asteroid?id=2417949'
                    );
                });

                it('has asteroid name in link', () => {
                    expect(info.firstElementChild?.firstElementChild).toHaveTextContent(
                        '417949 (2007 TB23)'
                    );
                });

                it('has formatted date', () => {
                    expect(info.lastElementChild?.firstElementChild).toHaveTextContent(
                        '21 апреля 2021 г.'
                    );
                });

                it('has formatted distance in kilometers', () => {
                    expect(info.lastElementChild?.children[1]).toHaveTextContent('33 402 476 км');
                });

                it('has formatted size', () => {
                    expect(info.lastElementChild?.lastElementChild).toHaveTextContent('783 м');
                });

                it('has button', () => {
                    expect(result.lastElementChild).toHaveClass('Button');
                });

                it('has no Await destruction message', () => {
                    expect(result.lastElementChild).not.toHaveClass('Card-AwaitDestruction');
                });

                it('has no hazard assessment', () => {
                    expect(result).toContainHTML('<div class="Card-IsHazardous">не опасен</div>');
                });

                describe('on button click', () => {
                    beforeEach(() => {
                        fireEvent.click(result.lastElementChild as Element);
                    });

                    it('call dispatch with addToDestructionList(id)', () => {
                        expect(store.dispatch).toBeCalledTimes(1);
                        expect(store.dispatch).toBeCalledWith(addToDestructionList('2417949'));
                    });
                });
            });

            describe('hazardous:', () => {
                beforeEach(() => {
                    asteroid.isHazardous = true;

                    render(
                        <Provider store={store}>
                            <Card asteroid={asteroid} type="short" />
                        </Provider>
                    );

                    background = screen.getByTestId('card-short').firstElementChild
                        ?.firstElementChild as Element;
                    result = screen.getByTestId('card-short').firstElementChild
                        ?.lastElementChild as Element;
                });

                it('has hazardous background', () => {
                    expect(background).toHaveClass('Card-Background_hazardous');
                });

                it('has hazard assessment', () => {
                    expect(result).toContainHTML('<div class="Card-IsHazardous">опасен</div>');
                });
            });

            describe('in destruction list:', () => {
                beforeEach(() => {
                    asteroid.inDestructionList = true;

                    render(
                        <Provider store={store}>
                            <Card asteroid={asteroid} type="short" />
                        </Provider>
                    );

                    result = screen.getByTestId('card-short').firstElementChild
                        ?.lastElementChild as Element;
                });

                it('has no button', () => {
                    expect(result.lastElementChild).not.toHaveClass('Button');
                });

                it('has Await destruction message', () => {
                    expect(result.lastElementChild).toHaveClass('Card-AwaitDestruction');
                });
            });
        });

        describe('with distance in lunar:', () => {
            beforeEach(() => {
                store = mockStore({
                    distanceType: 'lunar',
                });

                render(
                    <Provider store={store}>
                        <Card asteroid={asteroid} type="short" />
                    </Provider>
                );

                info = screen.getByTestId('card-short').firstElementChild?.children[1] as Element;
            });

            it('has formatted distance in lunar', () => {
                expect(info.lastElementChild?.children[1]).toHaveTextContent('86,86 LD');
            });
        });
    });

    describe('full asteroid info', () => {
        describe('with distance in kilometers:', () => {
            beforeEach(() => {
                store = mockStore({
                    distanceType: 'kilometers',
                });

                render(
                    <Provider store={store}>
                        <Card
                            asteroid={asteroid}
                            closeApproachFull={closeApproachFull}
                            type="full"
                        />
                    </Provider>
                );

                approach = screen.getByTestId('card-full').lastElementChild
                    ?.lastElementChild as Element;
            });

            it('has formatted date and time', () => {
                expect(approach.firstElementChild).toHaveTextContent('21 апреля 2021 г., 08:45');
            });

            it('has formatted velocity', () => {
                expect(approach.children[1]).toHaveTextContent('21,4 км/с');
            });

            it('has formatted distance in kilometers', () => {
                expect(approach.children[2]).toHaveTextContent('33 402 476 км');
            });

            it('has formatted orbiting body', () => {
                expect(approach.lastElementChild).toHaveTextContent('Земля');
            });
        });

        describe('with distance in lunar:', () => {
            beforeEach(() => {
                store = mockStore({
                    distanceType: 'lunar',
                });

                render(
                    <Provider store={store}>
                        <Card
                            asteroid={asteroid}
                            closeApproachFull={closeApproachFull}
                            type="full"
                        />
                    </Provider>
                );

                approach = screen.getByTestId('card-full').lastElementChild
                    ?.lastElementChild as Element;
            });

            it('has formatted distance in lunar', () => {
                expect(approach.children[2]).toHaveTextContent('86,86 LD');
            });
        });
    });
});
