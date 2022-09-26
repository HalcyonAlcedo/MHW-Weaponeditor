<template>
    <v-container>
        <v-card class="mx-auto">
            <v-toolbar color="primary" dark flat>
                <v-icon>mdi-cube-scan</v-icon>
                <v-toolbar-title> 文件结构 </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field v-model="treeSearch" label="检索结构数据" dark flat solo-inverted hide-details clearable
                    clear-icon="mdi-close-circle-outline"></v-text-field>
                <v-btn icon color="green" @click="$copyText(JSON.stringify(Tree))">
                    <v-icon>mdi-content-paste</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-treeview dense :items="TreeItem" :search="treeSearch"></v-treeview>
            </v-card-text>
        </v-card>
    </v-container>
</template>
  
<script>
export default {
    data: () => ({
        treeSearch: null,
    }),
    props: ['Tree'],
    computed: {
        TreeItem() {
            let id = 1
            let formatName = (name) => {
                switch (name) {
                    case 'header':
                        return '文件头'
                    case 'data':
                        return '数据区'
                    case 'derived':
                        return '派生'
                    case 'condition':
                        return '条件'
                    case 'addrStart':
                        return '结构起始地址'
                    case 'size':
                        return '结构大小'
                    case 'count':
                        return '结构数量'
                    case 'struct':
                        return '结构体'
                    case 'tree':
                        return '条件树'
                    case 'offset':
                        return '偏移量'
                    case 'name':
                        return '名称'
                    case 'destination':
                        return '派生'
                    case 'link':
                        return '派生链接'
                    case 'number':
                        return '条件编号'
                    case 'node':
                        return '节点'
                    case 'child':
                        return '子项'
                    case 'list':
                        return '列表'
                    case 'conditionName':
                        return '条件名'
                    case 'block':
                        return '数据块'
                    case 'pointBlock':
                        return '下级数据块'
                    case 'actionPoint':
                        return '动作偏移'
                    case 'bonesNumber':
                        return '骨骼数量'
                    case 'frameNumber':
                        return '帧数量'
                    case 'loopFrame':
                        return '循环帧'
                    case 'decisionPoint':
                        return '判定偏移'
                    case 'frame':
                        return '关键帧'
                    case 'actionType':
                        return '动作类型'
                    case 'apply':
                        return '使用'
                    case 'jointType':
                        return '关节类型'
                    case 'bonesId':
                        return '骨骼id'
                    case 'cushionSize':
                        return '缓存大小'
                    case 'weight':
                        return '权重'
                    case 'actionOffsetLength':
                        return '动作偏移长度'
                    case 'actionOffset':
                        return '动作偏移'
                    case 'referenceFrame':
                        return '参考系'
                    case 'limitOffset':
                        return '限制偏移'
                    default:
                        return name
                }
            }
            let obj = (o) => {
                id += 1
                let it = []
                Object.keys(o).forEach((key) => {
                    id += 1
                    if (typeof (o[key]) == "object") {
                        it.push({
                            id: id,
                            name: formatName(key),
                            children: obj(o[key])
                        })
                    } else {
                        it.push({
                            id: id,
                            name: `${formatName(key)}: ${o[key]}`,
                        })
                    }
                })
                return it
            }
            return obj(this.Tree)
        }
    }
}
</script>
  