import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Provider } from "mobx-react";
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";
import { Router } from "react-router";
import { SocketStore } from "stores/socket";
import { PlayerStore } from "stores/player";
import { SFXStore } from "stores/sfx";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const socketStore = new SocketStore();

const playerStore = new PlayerStore();

const sfxStore = new SFXStore();

const stores = {
  // Key can be whatever you want
  routing: routingStore,
  socket: socketStore,
  player: playerStore,
  sfx: sfxStore

  // ...other stores
};

const history = syncHistoryWithStore(browserHistory, routingStore);

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
