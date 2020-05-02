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


Version 2 Features List 

1.  Follow bet optimization (Will be based on the market response of version1)		
2.  Chip Setting(Min-Max Setting based on V1 response)	
3.  Every User has Different Currency ( Min and Max Chips Amount Depend on Currency)	
4.  Player Privacy Issues(Player Settings)	
5.  Big data statistics.	(Find the optimized solution to show big in-game data)	(Discussion with Designing Team)
6.  Responsive focusing	(Laptop,Desktop,Mobile,Browser)
7.  User top up balance option in Profile Page and redirect to portal Provider's Website.	
8.  Chat box Invitation	Add extra preset content while sending an invitation	(Discussion with Designing Team)
9.  Tutorial add character	Add mascot character in tutorial	( Discussion with Designing Team )
10. Sound Effect (Betting , After Win, After Loss)
11. User can set Avatar Picture. (Unable to Upload user own Picture)
12. Work on Security no one can Enter game With Authentication Server. 
13. Set Cookies for Users Important Information.



Issues and enhancements to be addressed in future

1. Difference between confirmed and unconfirmed bets in fullscreen(design team will decide what to show in confirmed bet and what to show in unconfirmed bets).
2. Login screen flow after the user enter details on the whitelabel screen. The initial data should be set in plugins(callApi plugin) and then the first page index.vue should be shown where the game loader will load and then the user will be redirected to the home page.
3. Popups displayed while betting on the numbers. When the user bets on the numbers the numbers shown shifts the roadmap component down hence the numbers should be shown in a popup. It will not affect the whole screen then.