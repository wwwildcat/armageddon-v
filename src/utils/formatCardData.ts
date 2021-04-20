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
        dateStyle: 'long',
    });

export const formatDateFull = (date: string) =>
    new Date(date).toLocaleString('ru', {
        dateStyle: 'long',
        timeStyle: 'short',
    });

export const formatVelocity = (velocity: string) =>
    `${(+velocity).toLocaleString('ru', {
        maximumFractionDigits: 2,
    })} км/с`;

const bodies = {
    Merc: 'Меркурий',
    Venus: 'Венера',
    Moon: 'Луна',
    Earth: 'Земля',
    Mars: 'Марс',
    Juptr: 'Юпитер',
};

export type OrbitingBodies = 'Merc' | 'Venus' | 'Moon' | 'Earth' | 'Mars' | 'Juptr';

export const formatOrbitingBody = (body: OrbitingBodies) => bodies[body];
