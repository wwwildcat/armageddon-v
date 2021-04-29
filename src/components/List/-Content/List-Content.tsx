import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllAsteroids } from '@store/thunks';
import State from '@store/types';

interface Props {
    children: React.ReactElement[];
}

const THRESHOLD = 15;

const ListContent = ({ children }: Props) => {
    const linkToNext = useSelector((state: State) => state.linkToNext);
    const isLoading = useSelector((state: State) => state.isLoading);
    const dispatch = useDispatch();

    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(THRESHOLD);

    const loaderRef = useRef(null);
    const topRef = useRef(null);
    const bottomRef = useRef(null);

    const getItemParams = (index: number, lastIndex: number) => {
        if (index === 0) {
            return {
                ref: topRef,
                id: 'top',
            };
        }
        if (index === lastIndex) {
            return {
                ref: bottomRef,
                id: 'bottom',
            };
        }
        return {
            ref: null,
            id: '',
        };
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.01,
        };

        const loader = loaderRef.current;
        const topElement = topRef.current;
        const bottomElement = bottomRef.current;

        const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.target.id === 'loader') {
                    !isLoading && dispatch(fetchAllAsteroids(linkToNext));
                }

                if (entry.isIntersecting && entry.target.id === 'bottom') {
                    const maxStartIndex = children.length - 1 - THRESHOLD;
                    const maxEndIndex = children.length - 1;

                    const newStartIndex = Math.min(endIndex - 5, maxStartIndex);
                    const newEndIndex = Math.min(endIndex + 10, maxEndIndex);

                    setStartIndex(newStartIndex);
                    setEndIndex(newEndIndex);
                }

                if (entry.isIntersecting && entry.target.id === 'top') {
                    const newStartIndex = startIndex === 0 ? 0 : Math.max(startIndex - 10, 0);
                    const newEndIndex =
                        endIndex === THRESHOLD ? THRESHOLD : Math.max(endIndex - 10, THRESHOLD);

                    setStartIndex(newStartIndex);
                    setEndIndex(newEndIndex);
                }
            });
        }, options);

        loader && observer.observe((loader as unknown) as Element);
        topElement && observer.observe((topElement as unknown) as Element);
        bottomElement && observer.observe((bottomElement as unknown) as Element);

        return () => {
            loader && observer.unobserve((loader as unknown) as Element);
            topElement && observer.unobserve((topElement as unknown) as Element);
            bottomElement && observer.unobserve((bottomElement as unknown) as Element);
        };
    }, [startIndex, endIndex, children, dispatch, isLoading, linkToNext]);

    return (
        <>
            <ul className="List-Content">
                {children.length > THRESHOLD
                    ? children.slice(startIndex, endIndex).map((child, index, arr) => {
                          const { ref, id } = getItemParams(index, arr.length - 1);

                          return (
                              <li id={id} key={child.props.asteroid.id} ref={ref}>
                                  {child}
                              </li>
                          );
                      })
                    : children}
            </ul>
            <div data-testid="loader" id="loader" ref={loaderRef}>
                Loading...
            </div>
        </>
    );
};

export default ListContent;
