import { Hud } from "./hud.js"

export class PersistantData{

  upgrade = {
    test : 0,
    test2 : 0
  }


  _totalScore = 0
  get totalScore(){return this._totalScore}
  set totalScore(value){
    this._totalScore = value
    Hud.getInstance().hud.persistantData.score = value
  }

  static getInstance(){
    if(PersistantData.instance === undefined){
      return PersistantData.instance = new PersistantData()
    }
    return PersistantData.instance
  }

  constructor(){
    
    this.totalScore = this._totalScore
  }
}