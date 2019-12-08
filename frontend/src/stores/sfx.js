import { action, observable, set } from "mobx";
// import autoSave from "../utils/storeAutoSave";
import seCharacterChange from "assets/se/character_change_ef.mp3";
import seCharacterSelect from "assets/se/character_select_ef.mp3";

const SoundFX = require("sound-fx");

export class SFXStore {
  @observable sfx = new SoundFX();

  // @action
  // @action signout() {
  //   this.userInformation = {};
  // }

  @action play(soundName, loop, cb) {
    this.sfx.play(soundName, loop, cb);
  }

  @action stop(soundName) {
    this.sfx.stop(soundName);
  }

  constructor() {
    // this.load();
    // autoSave(this, this.save.bind(this));
    this.sfx.load(seCharacterChange, "slick");
    this.sfx.load(seCharacterSelect, "ready");
  }

  // load() {
  // if (localStorage.getItem("userInformation") !== null) {
  //   const data = localStorage.getItem("userInformation");
  //   set(this, JSON.parse(data));
  //   console.log(this.userInformation);
  // }
  // }

  //   save(json) {
  //     localStorage.setItem("userInformation", json);
  //   }
}

export default SFXStore;
