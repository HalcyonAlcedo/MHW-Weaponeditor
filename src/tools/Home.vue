<template>
  <v-card
    class="mx-auto"
  >
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card>
            <v-row>
              <v-col class="d-flex" cols="6">
                <v-img
                  :src="card.mainImgSrc"
                ></v-img>
              </v-col>
              <v-col cols="6">
                <v-container
                  class="pa-0 pl-2"
                  style="margin: -4px 0"
                >
                  <v-row>
                    <v-col 
                      v-for="imgSrc in card.secondaryImgSrc"
                      :key="imgSrc"
                      class="d-flex"
                      cols="6"
                    >
                      <v-img
                        :src="imgSrc"
                      ></v-img>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
            <v-card-title class="align-start">
              <div>
                <span class="headline">{{card.title}}</span>
                <div class="grey--text font-weight-light">{{card.subtitle}}</div>
              </div>
              <v-spacer></v-spacer>
              <v-dialog
                v-model="card.dialog"
                width="400"
              >
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">
                    mdi-share-variant
                  </v-icon>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="title font-weight-bold">分享</span>
                    <v-spacer></v-spacer>
                    <v-btn
                      class="mx-0"
                      icon
                      @click="card.dialog = false"
                    >
                      <v-icon>mdi-close-circle-outline</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-text-field
                    ref="link"
                    label="分享代码"
                    class="pa-4"
                    readonly
                    :value="card.share"
                    @click="copy"
                  ></v-text-field>
                </v-card>
              </v-dialog>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon :color="card.good ? 'green' : 'blue-grey lighten-2'">
                <v-icon>thumb_up_alt</v-icon>
              </v-btn>
              <span class="subheading mr-2">{{card.reputation}}</span>
              <v-btn icon :color="card.inwarehouse ? 'green' : 'blue-grey lighten-2'">
                <v-icon>{{card.inwarehouse ? 'cloud_done' : 'cloud_download'}}</v-icon>
              </v-btn>
              <span class="subheading mr-2">{{card.saveNumber}}</span>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      cards: [
        { 
          title: '颗粒特效',
          subtitle:'',
          mainImgSrc: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          secondaryImgSrc: [
            'https://cdn.vuetifyjs.com/images/cards/house.jpg',
            'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          ],
          download: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
          good: true,
          inwarehouse: false,
          reputation: 244,
          saveNumber: 511,
          share:'zx92a91',
          flex: 12
        },
        {
          title: '衣服',
          subtitle:'',
          mainImgSrc: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
          secondaryImgSrc: [
            'https://cdn.vuetifyjs.com/images/cards/house.jpg',
            'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          ],
          download: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
          good: false,
          inwarehouse: false,
          reputation: 244,
          saveNumber: 511,
          share:'zx92a91',
          flex: 6
        },
      ],
    }),
    methods: {
      copy () {
        const markup = this.$refs.link
        markup.focus()
        document.execCommand('selectAll', false, null)
        this.copied = document.execCommand('copy')
      },
    },
  }
</script>