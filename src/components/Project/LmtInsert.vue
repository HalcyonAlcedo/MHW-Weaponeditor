<template>
  <v-container>
    <v-alert
    border="left"
    colored-border
    type="info"
    elevation="1"
    >
    开发中，目前只支持结构查看
    </v-alert>
    <ObjView :Tree="LMTTree" />
  </v-container>
</template>

<script>
  import ObjView from './module/objectView'
  import hexHandler from '../../plugins/edit/hexHandler'

  export default {
    data: () => ({
      LMTTree: [],
    }),
    components: {
      ObjView,
    },
    computed: {
      file () {
        return this.$store.getters.donefile
      },
      data () {
        return this.$store.getters.donefiledata
      }
    },
    mounted () {
      var startIndex = this.file.lastIndexOf(".");
      if(startIndex != -1 && this.file.substring(startIndex+1, this.file.length).toLowerCase() == 'lmt') {
        this.LMTTree = this.parseFsm()
      } else {
        console.log('不是LMT文件')
      }

    },
    methods: {
      parseFsm() {
          let _this = this
          let lmtStruct = {
              header: {
                addrStart: 0,
                count: 0,
                block: []
              },
              frame: []
          }
          //临时方法
          const dataGet = (offset, size = 4) => {
              let _data = []
              for (let s = 0; s < size ; s++) {
                  _data[s] = _this.data[offset - s];
              }
              return parseInt(_data.map((_hex) => hexHandler.str_pad(_hex.toString(16), 2)).join(''), 16)
          }
          //数据获取
          lmtStruct.header.count = dataGet(7,2)
          let blockStartAddr = 16
          for(let b = 0;b < lmtStruct.header.count; b++){
            let block = {
                id: b,
                addrStart: dataGet(blockStartAddr + 7,8)
            }
            if(b != 0) {
                let point = {
                    actionPoint: dataGet(block.addrStart + 7,8),
                    bonesNumber: dataGet(block.addrStart + 7 + 4),
                    frameNumber: dataGet(block.addrStart + 7 + 4 + 4),
                    loopFrame: dataGet(block.addrStart + 7 + 4 + 4 + 4),
                    decisionPoint: dataGet(block.addrStart + 7 + 4 + 4 + 4 + 68 + 8, 8),
                }
                block.pointBlock = point
                //处理动作帧数据
                if(lmtStruct.frame.findIndex((f) => f.addrStart == block.pointBlock.actionPoint) == -1) {
                    let frame = {
                        addrStart: block.pointBlock.actionPoint,
                        count: block.pointBlock.frameNumber,
                        data: []
                    }
                    let frameStartAddr = frame.addrStart
                    for(let f = 0; f < frame.count; f++) {
                        frame.data.push({
                            actionType: dataGet(frameStartAddr, 1),
                            apply: dataGet(frameStartAddr + 1, 1),
                            jointType: dataGet(frameStartAddr + 2, 1),
                            bonesId: dataGet(frameStartAddr + 3, 1),
                            cushionSize: dataGet(frameStartAddr + 3 + 4) << 0,
                            weight: hexHandler.HexToSingle(hexHandler.str_pad(dataGet(frameStartAddr + 3 + 4 + 4).toString(16), 8)),
                            actionOffsetLength: dataGet(frameStartAddr + 3 + 4 + 4 + 4),
                            actionOffset: dataGet(frameStartAddr + 3 + 4 + 4 + 4 + 8, 8),
                            referenceFrame: [
                              hexHandler.HexToSingle(hexHandler.str_pad(dataGet(frameStartAddr + 3 + 4 + 4 + 4 + 8 + 4).toString(16), 8)),
                              hexHandler.HexToSingle(hexHandler.str_pad(dataGet(frameStartAddr + 3 + 4 + 4 + 4 + 8 + 8).toString(16), 8)),
                              hexHandler.HexToSingle(hexHandler.str_pad(dataGet(frameStartAddr + 3 + 4 + 4 + 4 + 8 + 12).toString(16), 8)),
                              hexHandler.HexToSingle(hexHandler.str_pad(dataGet(frameStartAddr + 3 + 4 + 4 + 4 + 8 + 16).toString(16), 8)),
                            ],
                            limitOffset: dataGet(frameStartAddr + 3 + 4 + 4 + 4 + 8 + 16 + 8, 8),
                        })
                        frameStartAddr += 48
                    }
                    lmtStruct.frame.push(frame)
                }
            }
            lmtStruct.header.block.push(block)
            blockStartAddr += 8
          }
          lmtStruct.frame
          return lmtStruct
      },
    },
  }
</script>