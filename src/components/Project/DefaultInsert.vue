<template>
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
  export default {
    data: () => ({
      insertData: '',
      insertAddress: '00',
      snackbar: false,
    }),
    computed: {
        data () {
            return this.$store.getters.donefiledata
        }
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
    },
  }
</script>