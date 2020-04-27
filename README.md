# modern-mobile

> EC Gaming version 2

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

Latest Version Features (1.0)

1. User Profile
2. User can Bet Stock Wise
3. Full Screen Mode
4. Multiple Screen User can Bets
5. User can Send invitation to Chat ECWORLD
6. In Game Channel User can Send Invitation Stock Game Wise
7. LeaderBoard (Top Users List With Bet Info)
8. User can Follow Top Player in EC Game.
9. User Stock Analysis
10. User Online History


Issues and enhancements to be addressed in future

1. Difference between confirmed and unconfirmed bets in fullscreen(design team will decide what to show in confirmed bet and what to show in unconfirmed bets).
2. Login screen flow after the user enter details on the whitelabel screen. The initial data should be set in plugins(callApi plugin) and then the first page index.vue should be shown where the game loader will load and then the user will be redirected to the home page.
3. Popups displayed while betting on the numbers. When the user bets on the numbers the numbers shown shifts the roadmap component down hence the numbers should be shown in a popup. It will not affect the whole screen then.