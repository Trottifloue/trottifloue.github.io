import { Timestamp } from "./Timestamp.js"

import { Block } from "../test/Block.js"
import { CosBlock } from "../test/CosBlock.js"
import { PaternBase } from "../ennemies/PaternBase.js"
export class Level1{
    list = [
        {class : Block, dataConstructor : [{x:40,y:120}, {x:-1, y:0}]}
      ]),

      new Timestamp(1, [
        {class : PaternBase, dataConstructor : [10, 0.5, {
          x : function(alpha){
            return (alpha/5)*900
          },

          y : function(alpha){
            return Math.pow(1-alpha/5, 2)*900}
        }, {x:0,y:0}]},

        {class : PaternBase, dataConstructor : [10, 0.5, {
          x : function(alpha){
            return (1-Math.pow(alpha/5, 2))*900
            
          },

          y : function(alpha){
            return (alpha/5)*900
          }
        }, {x:0,y:0}]}
      ]),

      new Timestamp(1.25, [
        {class : PaternBase, dataConstructor : [10, 0.5, {
          x : function(alpha){
            return (1-alpha/5)*900
          },

          y : function(alpha){
            return (Math.pow(1-alpha/5, 2))*900}
        }, {x:0,y:0}]}
      ]),

      new Timestamp(1.5, [
        {class : PaternBase, dataConstructor : [10, 0.5, {
          x : function(alpha){
            return (Math.pow(alpha/5, 2))*900
            
          },

          y : function(alpha){
            return (alpha/5)*900
          }
        }, {x:0,y:0}]}
      ]),*/

      new Timestamp(4, [
        {class : PaternBase, dataConstructor : [10, 
          0.5, 
          {
            x : function(alpha){
              return (1-alpha/5)*900
            },

            y : function(alpha){
              return (Math.pow(alpha/5, 2))*900}
          }, 
          {x:0,y:0},
          5,
          {
            x:function(alpha){
              return 100
            },

            y: function(alpha){
              return (alpha - (alpha)%0.5)%1*300
            }
          }
        ]}
      ]),

      new Timestamp(10, [
        {class : CosBlock, dataConstructor : [{x:40,y:120}, {x:-1, y:0}]}
      ])
  ]
}
