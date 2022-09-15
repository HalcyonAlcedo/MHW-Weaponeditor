<template>
    <v-container>
        <v-alert
        border="top"
        colored-border
        type="warning"
        elevation="2"
        >
        数据插入可能会对文件造成不可逆损毁，建议插入之前对文件先行备份，确认插入时检查插入数据和地址是否正确。
        </v-alert>
        <v-card>
            <v-toolbar flat color="primary" dark>
            <v-toolbar-title>插入数据</v-toolbar-title>
            </v-toolbar>
            <v-tabs vertical>
            <v-tab>
                <v-icon left>mdi-text-box-plus-outline</v-icon>
                指定地址插入数据
            </v-tab>
            <v-tab>
                <v-icon left>mdi-file-sign</v-icon>
                FSM派生数据插入
            </v-tab>

            <v-tab-item>
                <v-card flat>
                    <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-textarea outlined name="insert" :label="$t('Interface.InsertHex')" no-resize v-model="insertData"
                                @input="insertData = insertData.replace(/[^0-9a-fA-F]/g, '').replace(/(\S{2})/g, '$1 ').replace(/^\s|\s$/g, '').toUpperCase()" />
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field :label="$t('Interface.InsertAddress')" v-model="insertAddress"
                                @input="insertAddress = insertAddress.replace(/[^0-9a-fA-F]/g, '').replace(/^\s|\s$/g, '').toUpperCase()">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-btn depressed color="primary" @click="insertHex">{{$t('Interface.Insert')}}</v-btn>
                        </v-col>
                    </v-row>
                    </v-container>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-container>
                    <v-alert
                    border="left"
                    colored-border
                    type="info"
                    elevation="1"
                    >
                    先定位招式地址，然后生成派生数据模板，最后插入派生数据。派生id和条件id可参考fsm配置文件获取到的数据，描述和招式名可能会有出入，以招式id为准。
                    </v-alert>
                    <v-row>
                        <v-col cols="12">
                            <v-textarea outlined name="insert" label="派生主体" no-resize v-model="insertFsmData"
                                @input="insertData = insertData.replace(/[^0-9a-fA-F]/g, '').replace(/(\S{2})/g, '$1 ').replace(/^\s|\s$/g, '').toUpperCase()" />
                        </v-col>
                        <v-col cols="12" sm="3">
                            <v-text-field readonly label="派生序列" v-model="fsmStruc.structId">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <v-text-field readonly label="结构大小" v-model="fsmStruc.dataSize">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <v-text-field label="派生id" v-model="fsmStruc.destinationNodeld" hint="指定派生目标id" persistent-hint>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <v-text-field label="条件id" v-model="fsmStruc.conditionId" hint="指定派生条件id" persistent-hint>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="8">
                            <v-text-field label="派生名称" v-model="fsmStruc.structName" hint="插入派生的名称" persistent-hint>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-btn depressed color="primary" @click="fsmStructureGenerate">生成派生数据模板</v-btn>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col cols="12" sm="4">
                            <v-autocomplete
                                v-model="fsmSelect"
                                :items="entries"
                                :loading="isLoading"
                                :search-input.sync="search"
                                hide-no-data
                                hide-selected
                                item-text="name"
                                item-value="addr"
                                label="招式名称"
                                placeholder="输入招式名称进行检索"
                                return-object
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field label="招式起始地址" v-model="fsmSelect.addr" hint="招式的起始地址，如不清楚请在招式名称中选择" persistent-hint>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-btn depressed color="primary" @click="selectFsmStructure">定位招式地址</v-btn>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col cols="12" sm="4">
                            <v-text-field readonly label="招式派生数量" v-model="fsmStrucCount">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field readonly label="招式Id" v-model="fsmStrucId">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-btn depressed color="primary" @click="insertFsmStructure">插入派生数据</v-btn>
                        </v-col>
                    </v-row>
                    </v-container>
                </v-card>

            </v-tab-item>
            </v-tabs>
        </v-card>
        <v-snackbar
        v-model="snackbar"
        top
        style="-webkit-app-region: no-drag"
        >
        {{ $t('Interface.Insert_Success') }}
        <v-btn
            color="pink"
            text
            @click="snackbar = false"
        >
            <v-icon>close</v-icon>
        </v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
import { black } from 'color-name'

export default {
    data() {
        return {
            insertData: '',
            insertFsmData: '',
            insertAddress: '00',
            insertFsmAddress: '00',
            snackbar: false,
            fsmStruc: {
                structId: 0,
                dataSize: 0,
                structName: '',
                destinationNodeld: 0,
                conditionId: 0
            },
            fsmSelect: {
                addr: '',
                id: 0,
                name: '',
                size: 0
            },
            fsmStartAddr: 0,
            fsmStrucCountAddr: 0,
            fsmStrucCount: 0,
            fsmStrucId: 0,
            isLoading: false,
            search: null,
            entries: []
        }
    },
    computed: {
        data () {
            return this.$store.getters.donefiledata
        }
    },
    watch: {
      search (val) {
        this.parseStructure()
      },
    },
    methods: {
        insertHex() {
            const _this = this
            const address = this.insertAddress
            const buffer = this.insertData.split(" ").map(function(item) {return _this.hex2int(item)})
            this.$store.dispatch('insertdata', {
                buffer: new Buffer.from(buffer),
                target: this.hex2int(address)
            })
            this.snackbar = true
        },
        fsmStructureGenerate() {
            const header = '07 00 ' //结构开始标记
            let structId = this.int2hex(parseInt(this.fsmStruc.structId),4) //结构序列id
            let dataSize = '08 00 00 00 00 00 00 00 ' //结构数据区域大小
            const structNameHeader = '01 00 00 00 ' //结构名称开始标记
            let structName = this.fsmStruc.structName //结构名称
            const destinationNodeldHeader = '01 00 00 00 ' //派生ID开始标记
            let destinationNodeld = (parseInt(this.fsmStruc.destinationNodeld).toString(16).length < 2 ? '0' + parseInt(this.fsmStruc.destinationNodeld).toString(16) : parseInt(this.fsmStruc.destinationNodeld).toString(16)) + ' 00 00 00 ' //派生ID
            const existCondition = '01 00 00 00 01 ' //存在条件
            const conditionIdHeader = '01 00 00 00 ' //条件开始标记
            let conditionId = (parseInt(this.fsmStruc.conditionId).toString(16).length < 2 ? '0' + parseInt(this.fsmStruc.conditionId).toString(16) : parseInt(this.fsmStruc.conditionId).toString(16)) + ' 00 00 00' //条件ID
            if(structName.substr(-6,5) != '_t000') {
                structName += '_t0001'
                this.fsmStruc.structName = structName
            }
            structName = this.strToUtf8Bytes(structName).map(function(hex) {return hex.toString(16)}).join(' ') + ' 00 '
            let struct = dataSize + structNameHeader + structName + destinationNodeldHeader + destinationNodeld + existCondition + conditionIdHeader + conditionId
            dataSize = struct.split(" ").length.toString(16) + ' 00 00 00 00 00 00 00 '
            this.fsmStruc.dataSize = this.hex2int(dataSize)
            struct = header + structId + dataSize + structNameHeader + structName + destinationNodeldHeader + destinationNodeld + existCondition + conditionIdHeader + conditionId
            this.insertFsmData = struct
        },
        selectFsmStructure() {
            if(this.entries.length == 0) {this.parseStructure()}
            if(this.fsmSelect.addr != '') {
                this.fsmStartAddr = this.hex2int(this.fsmSelect.addr)
                const strucSizeHex = this.data.slice(this.fsmStartAddr + 4,this.fsmStartAddr + 12)
                let array = []
                for (let i = 0; i < strucSizeHex.length ; i++) {
                    array[i] = strucSizeHex[strucSizeHex.length - 1 - i];
                }
                let strucSize = this.hex2int(array.map((hex) => hex.toString(16).length == 2 ? hex.toString(16) : '0' + hex.toString(16)).join(''))
                for(let i = 0; i < strucSize; i++) {
                    if(this.data[this.fsmStartAddr + 16 + i] == 0) {
                        this.fsmStrucCountAddr = this.fsmStartAddr + 16 + i +33
                        this.fsmStrucCount = this.data[this.fsmStrucCountAddr]
                        this.fsmStrucId = this.data[this.fsmStartAddr + 16 + i + 5]
                        let _structId = []
                        for (let s = 0; s < 4 ; s++) {
                            _structId[s] = this.data[11 - s];
                        }
                        this.fsmStruc.structId = this.hex2int(_structId.map(function(hex) {return hex.toString(16)}).join('')) + 1
                        //获取派生名
                        let bytes = new Uint8Array(this.data.slice(this.fsmStartAddr + 16,this.fsmStartAddr + 16 + i))
                        this.fsmSelect.name = this.utf8BytesToStr(bytes)
                        //获取插入点
                        let targetAddr = this.fsmStrucCountAddr + 4
                        for(let f = 0; f < this.fsmStrucCount; f++) {
                            let _structSize = 4 + this.data[targetAddr + 4]
                            targetAddr = targetAddr + _structSize
                        }
                        this.insertFsmAddress = targetAddr
                        break;
                    }
                }
            }
        },
        parseStructure() {
            if (this.entries.length > 0) return
            if (this.isLoading) return
            this.isLoading = true
            let dataStr = Array.from(this.data).map((hex) => hex.toString(16).length == 2 ? hex.toString(16) : '0' + hex.toString(16)).join('')
            let targetStr = this.strToUtf8Bytes('mEnumNameCRC').map((hex) => hex.toString(16).length == 2 ? hex.toString(16) : '0' + hex.toString(16)).join('')
            let startAddr = dataStr.indexOf(targetStr) / 2 + 91
            let structCount = this.data[startAddr]
            startAddr += 4
            let struct = []
            for(let s = 0; s < structCount; s++){
                let structStartAdd = startAddr
                //获取区域大小
                const strucSizeHex = this.data.slice(structStartAdd + 4,structStartAdd + 12)
                let array = []
                for (let i = 0; i < strucSizeHex.length ; i++) {
                    array[i] = strucSizeHex[strucSizeHex.length - 1 - i];
                }
                let structSize = this.hex2int(array.map((hex) => hex.toString(16).length == 2 ? hex.toString(16) : '0' + hex.toString(16)).join(''))
                for(let i = 0; i < structSize; i++) {
                    if(this.data[structStartAdd + 16 + i] == 0) {
                        // startAddr = structStartAdd + 16 + i + 33
                        let structId = this.data[structStartAdd + 16 + i + 5]
                        //获取派生名
                        let bytes = new Uint8Array(this.data.slice(structStartAdd + 16,structStartAdd + 16 + i))
                        let structName = this.utf8BytesToStr(bytes)
                        struct.push({
                            id: structId,
                            name: structName,
                            addr: structStartAdd.toString(16),
                            size: structSize
                        })
                        startAddr += 4 + structSize
                        break;
                    }
                }
            }
            console.log(struct)
            this.entries = struct
            this.isLoading = false
        },
        insertFsmStructure() {
            if(this.insertFsmAddress == '' || this.insertFsmData == '') return
            const _this = this
            //模板数据
            let address = this.insertFsmAddress
            let buffer = this.insertFsmData.split(" ").map(function(item) {return _this.hex2int(item)})
            this.$store.dispatch('insertdata', {
                buffer: new Buffer.from(buffer),
                target: address
            })
            //扩容派生
            this.$store.dispatch('editdata', {
                address: this.fsmStrucCountAddr,
                value: this.fsmStrucCount + 1
            })
            //扩容序号
            this.$store.dispatch('editdata', {
                address: 8,
                value: this.fsmStruc.structId
            })
            this.snackbar = true
        },
        hex2int(hexStr) {
            let twoStr = parseInt(hexStr, 16).toString(2); // 将十六转十进制，再转2进制
            let bitNum = hexStr.length * 4; // 1个字节 = 8bit ，0xff 一个 "f"就是4位
            if (twoStr.length < bitNum) {
                while (twoStr.length < bitNum) {
                    twoStr = "0" + twoStr;
                }
            }
            if (twoStr.substring(0, 1) == "0") {
                // 正数
                twoStr = parseInt(twoStr, 2); // 二进制转十进制
                return twoStr;
            } else {
                // 负数
                let twoStr_unsign = "";
                twoStr = parseInt(twoStr, 2) - 1; // 补码：(负数)反码+1，符号位不变；相对十进制来说也是 +1，但这里是负数，+1就是绝对值数据-1
                twoStr = twoStr.toString(2);
                twoStr_unsign = twoStr.substring(1, bitNum); // 舍弃首位(符号位)
                // 去除首字符，将0转为1，将1转为0   反码
                twoStr_unsign = twoStr_unsign.replace(/0/g, "z");
                twoStr_unsign = twoStr_unsign.replace(/1/g, "0");
                twoStr_unsign = twoStr_unsign.replace(/z/g, "1");
                twoStr = parseInt(-twoStr_unsign, 2);
                return twoStr;
            }
        },
        int2hex(dec, len) {
            var hex = "";
            while( dec ) {
            var last = dec & 15;
            hex = String.fromCharCode(((last>9)?55:48)+last) + hex;
            dec >>= 4;
            }
            if(len) {
            while(hex.length < len) hex = '0' + hex;
            }
            if(len > 2){
                let _hex = ''
                for(let i = 0;i < hex.length/2;i++) {
                    _hex += hex.substring(hex.length-(i*2),hex.length-(i*2)-2) + ' '
                }
                hex = _hex
            }
            return hex + ' ';
        },
        strToUtf8Bytes(text) {
            const code = encodeURIComponent(text)
            const bytes = []
            for (let i = 0;i < code.length;i++) {
                const c = code.charAt(i)
                if (c === '%') {
                const hex = code.charAt(i + 1) + code.charAt(i + 2)
                const hexval = parseInt(hex, 16)
                bytes.push(hexval)
                i += 2
                } else {
                bytes.push(c.charCodeAt(0))
                }
            }
            return bytes
        },
        utf8BytesToStr(bytes) {
            let text = ''
            for (let i = 0;i < bytes.length;i++) {
                text += '%' + bytes[i].toString(16)
            }
            return decodeURIComponent(text)
        }
    }

}

function str_pad (hex, digits = 8) {
  var zero = new Array(digits + 1).join('0')
  var tmp = digits - hex.length
  return zero.substr(0, tmp) + hex.toLocaleUpperCase()
}
</script>