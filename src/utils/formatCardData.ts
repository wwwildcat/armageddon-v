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

export const formatDiameter = (diameter: number) => `${Math.round(diameter)} м`;

export const formatDate = (date: string) => dateFormatter.format(new Date(date));
