<template>
  <v-container>
    <ObjView :Tree="LMTTree" />
  </v-container>
</template>

<script>
  import ObjView from './module/objectView'

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
          const str_pad = (hex, digits = 4) => {
            var zero = new Array(digits + 1).join('0')
            var tmp = digits - hex.length
            return zero.substr(0, tmp) + hex.toLocaleUpperCase()
          }
          const dataGet = (offset, size = 4) => {
              let _data = []
              for (let s = 0; s < size ; s++) {
                  _data[s] = _this.data[offset - s];
              }
              return parseInt(_data.map((_hex) => str_pad(_hex.toString(16), 2)).join(''), 16)
          }
          //数据获取
          lmtStruct.header.count = dataGet(7,2)
          let blockStartAddr = 16
          for(let b = 0;b < lmtStruct.header.count; b++){
            let block = {
                id: b,
                addr: dataGet(blockStartAddr + 7,8)
            }
            if(b != 0) {
                let point = {
                    actionPoint: dataGet(block.addr + 7,8),
                    bonesNumber: dataGet(block.addr + 7 + 4),
                    frameNumber: dataGet(block.addr + 7 + 4 + 4),
                    loopFrame: dataGet(block.addr + 7 + 4 + 4 + 4),
                    decisionPoint: dataGet(block.addr + 7 + 4 + 4 + 4 + 68 + 8, 8),
                }
                block.pointBlock = point
                //处理动作帧数据
                if(lmtStruct.frame.findIndex((f) => f.addr == block.pointBlock.actionPoint) == -1) {
                    let frame = {
                        addr: block.pointBlock.actionPoint,
                        count: block.pointBlock.frameNumber,
                        data: []
                    }
                    let frameStartAddr = frame.addr
                    for(let f = 0; f < frame.count; f++) {
                        frame.data.push({
                            actionType: dataGet(frameStartAddr, 1),
                            apply: dataGet(frameStartAddr + 1, 1),
                            jointType: dataGet(frameStartAddr + 2, 1),
                            bonesId: dataGet(frameStartAddr + 3, 1),
                            cushionSize: dataGet(frameStartAddr + 3 + 4),
                            weight: dataGet(frameStartAddr + 3 + 4 + 4),
                            actionOffsetLength: dataGet(frameStartAddr + 3 + 4 + 4 + 4),
                            actionOffset: dataGet(frameStartAddr + 3 + 4 + 4 + 4 + 8, 8),
                            referenceFrame: [
                                dataGet(frameStartAddr + 3 + 4 + 4 + 4 + 8 + 4, 4),
                                dataGet(frameStartAddr + 3 + 4 + 4 + 4 + 8 + 8, 4),
                                dataGet(frameStartAddr + 3 + 4 + 4 + 4 + 8 + 12, 4),
                                dataGet(frameStartAddr + 3 + 4 + 4 + 4 + 8 + 16, 4),
                            ],
                            limitOffset: dataGet(frameStartAddr + 3 + 4 + 4 + 4 + 8 + 16, 8),
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