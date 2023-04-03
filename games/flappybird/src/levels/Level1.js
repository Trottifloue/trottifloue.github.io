import { Timestamp } from "./Timestamp.js"

import { Block } from "../test/Block.js"
import { CosBlock } from "../test/CosBlock.js"
import { PaternBase } from "../ennemies/PaternBase.js"
import paternList from "../ennemies/paterns/paternList.js"

export class Level1{
    list = [
      new Timestamp(1, [
        {class : PaternBase, dataConstructor : [500, 
          0.02, 
          {
            x : function(alpha){
              return (1-alpha/5)*900
            },

            y : function(alpha){
              return (1-alpha/5)*900}
              //return (Math.pow(alpha/5, 2))*900}
          },

          {x:[],y:[]},
          {x:0,y:0},
          10,
          {
            x:function(alpha){
              return 100
            },

            y: paternList.alternatePosition
          },

          {x:[], y:[4, 100, 0.5]}
        ]}
      ]),

      new Timestamp(10, [
        {class : CosBlock, dataConstructor : [{x:40,y:120}, {x:-1, y:0}]}
      ])
  ]
}
