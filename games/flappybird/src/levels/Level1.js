import { Timestamp } from "./Timestamp.js"

import { Block } from "../test/Block.js"
import { CosBlock } from "../test/CosBlock.js"
import { PaternBase } from "../ennemies/paterns/PaternBase.js"
import paternList from "../ennemies/paterns/paternList.js"
import { Rotator } from "../ennemies/paterns/Rotator.js"
import { Shooter } from "../ennemies/shooter.js"

export class Level1{
    list = [

      new Timestamp(0.48, [
        {
          class: Shooter, dataConstructor : [
            {x:0,y:0}, 
            {
              x:paternList.linear,
              y:paternList.linear
            }, 
            {
              x:[900, 10],
              y:[900, 10]
            }, 
            0.5,
            100
          ]
        }
      ]),

      new Timestamp(0.5, [
        {
          class: Rotator, dataConstructor : [
            {x:400, y:400},
            3,
            20, 
            0.25,
            4,
            50,
            3
          ]
        }
      ]),
      new Timestamp(1, [
        {class : PaternBase, dataConstructor : [20, 
          0.25, 
          {
            x : paternList.invrtLinear,

            y : paternList.static,

          },
          {x:[900, 5],y:[]},
          {x:900,y:300},
          10,
          {
            x:paternList.static,

            y: paternList.waves
          },

          {x:[], y:[200, 2]}
        ]}
      ]),

      new Timestamp(10, [
        {class : CosBlock, dataConstructor : [{x:40,y:120}, {x:-1, y:0}]}
      ])
  ]
}
