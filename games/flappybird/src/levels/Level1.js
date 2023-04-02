import { Timestamp } from "./Timestamp.js"

import { Block } from "../test/Block.js"
import { CosBlock } from "../test/CosBlock.js"
export default [
    new Timestamp(0, [
      {class : Block, dataConstructor : [{x:40,y:120}, {x:-1, y:0}]}
    ]),

    new Timestamp(10, [
      {class : CosBlock, dataConstructor : [{x:40,y:120}, {x:-1, y:0}]}
    ])
  ]
