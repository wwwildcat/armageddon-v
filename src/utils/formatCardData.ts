const dateFormatter = new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

const numberFormatter = new Intl.NumberFormat('ru', {
    maximumFractionDigits: 0,
});

export const formatDistance = (distance: string, distanceType: 'kilometers' | 'lunar') => {
    if (distanceType === 'kilometers') {
        return `${numberFormatter.format(+distance)} км`;
    } else return distance;
};

export const formatDiameter = (minDiameter: number, maxDiameter: number) =>
    `${Math.round((maxDiameter + minDiameter) / 2)} м`;

export const formatDate = (date: string) => dateFormatter.format(new Date(date));
