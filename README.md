## React tractiv app

The task for Nixa.io React challenge.<br />
The Tractiv app allows a user to track and schedule their activities.

The assignment is to create a simple React application based on the Tractive UI Kit.
The prototype is designed for the mobile screen and
will be only concerned with testing on mobile browsers. It's assumed the website should
work and appear correctly when emulating iPhone 6/7/8 in Google Chrome at 375x667px
resolution.

### Building & Testing instructions

<div>To start a server in produciton mode, please use:</div>

```sh
yarn && yarn build && yarn start:prod
```

<div>To start a server in development mode, please use:</div>

```sh
yarn && yarn start
```

<div>To run tests, please use:</div>

```sh
yarn test
```

The `db.json` file is located in `server` directory. You can use it to edit hardcoded data.

The app is also deployed to Heroku, so you can <a href="https://react-tractiv-app.herokuapp.com/">visit it</a> without deployment. 

By default it starts on 3000 port, but if you want you can change it with `PORT` environment variable.
