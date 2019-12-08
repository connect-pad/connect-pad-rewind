import { action, observable, set } from "mobx";
import socketIOClient from "socket.io-client";
// import autoSave from "../utils/storeAutoSave";

export class SocketStore {
  @observable socket = socketIOClient("http://192.168.43.127:4747");

  // constructor() {
  // this.socket.on("gamepad:")
  // }
}

export default SocketStore;
