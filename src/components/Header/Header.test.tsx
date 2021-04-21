import { render, screen } from '@testing-library/react';
import Header from './Header';

let asteroids: Element, destruction: Element;

describe('Header component should correct render', () => {
    describe('on home page:', () => {
        beforeEach(() => {
            render(<Header active={0} />);

            asteroids = screen.getByTestId('header').lastElementChild?.firstElementChild as Element;
            destruction = screen.getByTestId('header').lastElementChild
                ?.lastElementChild as Element;
        });

        describe('asteroids', () => {
            it('is active', () => {
                expect(asteroids).toHaveClass('Links-Item_active');
            });

            it('has no child', () => {
                expect(asteroids.children.length).toEqual(0);
            });
        });

        describe('destruction', () => {
            it('is not active', () => {
                expect(destruction).not.toHaveClass('Links-Item_active');
            });

            it('has link child', () => {
                expect(destruction.children.length).toEqual(1);
                expect(destruction.firstElementChild).toHaveAttribute('href', '/destruction-list');
            });
        });
    });

    describe('on asteroid page:', () => {
        beforeEach(() => {
            render(<Header active={1} />);

            asteroids = screen.getByTestId('header').lastElementChild?.firstElementChild as Element;
            destruction = screen.getByTestId('header').lastElementChild
                ?.lastElementChild as Element;
        });

        describe('asteroids', () => {
            it('is not active', () => {
                expect(asteroids).not.toHaveClass('Links-Item_active');
            });

            it('has link child', () => {
                expect(asteroids.children.length).toEqual(1);
                expect(asteroids.firstElementChild).toHaveAttribute('href', '/');
            });
        });

        describe('destruction', () => {
            it('is not active', () => {
                expect(destruction).not.toHaveClass('Links-Item_active');
            });

            it('has link child', () => {
                expect(destruction.children.length).toEqual(1);
                expect(destruction.firstElementChild).toHaveAttribute('href', '/destruction-list');
            });
        });
    });

    describe('on destruction page:', () => {
        beforeEach(() => {
            render(<Header active={2} />);

            asteroids = screen.getByTestId('header').lastElementChild?.firstElementChild as Element;
            destruction = screen.getByTestId('header').lastElementChild
                ?.lastElementChild as Element;
        });

        describe('asteroids', () => {
            it('is not active', () => {
                expect(asteroids).not.toHaveClass('Links-Item_active');
            });

            it('has link child', () => {
                expect(asteroids.children.length).toEqual(1);
                expect(asteroids.firstElementChild).toHaveAttribute('href', '/');
            });
        });

        describe('destruction', () => {
            it('is active', () => {
                expect(destruction).toHaveClass('Links-Item_active');
            });

            it('has no child', () => {
                expect(destruction.children.length).toEqual(0);
            });
        });
    });

    describe('on error page:', () => {
        beforeEach(() => {
            render(<Header active={3} />);

            asteroids = screen.getByTestId('header').lastElementChild?.firstElementChild as Element;
            destruction = screen.getByTestId('header').lastElementChild
                ?.lastElementChild as Element;
        });

        describe('asteroids', () => {
            it('is not active', () => {
                expect(asteroids).not.toHaveClass('Links-Item_active');
            });

            it('has link child', () => {
                expect(asteroids.children.length).toEqual(1);
                expect(asteroids.firstElementChild).toHaveAttribute('href', '/');
            });
        });

        describe('destruction', () => {
            it('is not active', () => {
                expect(destruction).not.toHaveClass('Links-Item_active');
            });

            it('has link child', () => {
                expect(destruction.children.length).toEqual(1);
                expect(destruction.firstElementChild).toHaveAttribute('href', '/destruction-list');
            });
        });
    });
});
