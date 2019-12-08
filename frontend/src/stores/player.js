import { action, observable, set } from "mobx";
// import autoSave from "../utils/storeAutoSave";
import imgCharacter1 from "assets/img/char1.png";
import imgCharacter2 from "assets/img/char2.png";
import imgCharacter3 from "assets/img/char3.png";
import imgCharacter4 from "assets/img/char4.png";

const characters = [imgCharacter1, imgCharacter2, imgCharacter3, imgCharacter4];
const colors = ["#EF3340", "#3F43AD", "#FEDD00", "#00AB84"];

export class PlayerStore {
  @observable characterIndex = 0;

  @observable colorNumber = 0;

  @observable characterImage = characters[0];

  @observable color = colors[0];

  @action setCharacterIndex(index) {
    this.characterIndex = index;
    this.characterImage = characters[index];
  }

  @action setColorNumber(index) {
    this.colorNumber = index;
    this.color = colors[index];
  }

  // @action signout() {
  //   this.userInformation = {};
  // }

  // constructor() {
  // this.load();
  // autoSave(this, this.save.bind(this));
  // }

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

export default PlayerStore;
