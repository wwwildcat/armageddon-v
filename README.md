## Armageddon-V

This is a [Next.js](https://nextjs.org/) sample app with near-Earth asteroids information. Based on [NASA API data](https://api.nasa.gov/).

Bootstrapped with [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Deployed on [Vercel](https://vercel.com/docs).

URL: [https://armageddon-v-wwwildcat.vercel.app/](https://armageddon-v-wwwildcat.vercel.app/)

### Features

- The list of asteroids sorted by their date of closest approach to the Earth (from current date to future) with infinite scroll (implemented by [react-infinite-scroller](https://github.com/danbovey/react-infinite-scroller)). Basic displayed info for each asteroid: name, size, potential hazard, closest approach date and distance to the Earth.
- Each asteroid has its own page with basic info and the list of all close approaches to the Earth. Displayed info for each approach: date and time, velocity relative to the Earth, distance to the Earth and orbiting body.
- Filter to show only hazardous asteroids.
- Distances in kilometers or in LD (Lunar Distance - distance from the Earth to the Moon).
- Asteroids can be added to the destruction list and then sent for destruction by Bruce Willis Brigade =)

### Technologies

- [Next.js](https://github.com/vercel/next.js/)
- [TypeScript](https://github.com/Microsoft/TypeScript)
- [Redux](https://github.com/reduxjs/redux)
- [react-redux](https://github.com/reduxjs/react-redux)
- [redux-thunk](https://github.com/reduxjs/redux-thunk)
- [node-sass](https://github.com/sass/node-sass)
- [cookie](https://github.com/jshttp/cookie)
- [react-cookie](https://github.com/reactivestack/cookies/tree/master/packages/react-cookie)

### Development
```
npm install
npm run dev
```
URL: [http://localhost:3000](http://localhost:3000)