const generateShortISODate = () => new Date().toISOString().split('T')[0];

export const generateNextLink = () => {
    const url = new URL('https://api.nasa.gov/neo/rest/v1/feed');
    const date = generateShortISODate();

    url.searchParams.set('start_date', date);
    url.searchParams.set('end_date', date);
    url.searchParams.set('api_key', 'DcJeRMBDemkmfOb08AdVwZduiONIxgKSV8epiuhT');

    return url.toString();
};
