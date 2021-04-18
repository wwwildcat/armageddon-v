export const formatDistance = (distance: string, distanceType: 'kilometers' | 'lunar') => {
    if (distanceType === 'kilometers') {
        return `${(+distance).toLocaleString('ru', {
            maximumFractionDigits: 0,
        })} км`;
    } else
        return `${(+distance).toLocaleString('ru', {
            maximumFractionDigits: 2,
        })} LD`;
};

export const formatDiameter = (diameter: number) => `${Math.round(diameter)} м`;

export const formatDate = (date: string) =>
    new Date(date).toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
