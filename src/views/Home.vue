<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <template v-slot:img>
        <v-img
          src="__static'../../330896.jpg"
          aspect-ratio='0.19'
          gradient="to top right, rgba(255,255,255,.45), rgba(255,0255,255,1)"
        ></v-img>
      </template>
      <v-list dense>
        <v-list-item @click.stop="left = !left">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{$t("Interface.New_file")}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="openfile()">
          <v-list-item-action>
            <v-icon>folder_open</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{$t("Interface.Open_file")}}</v-list-item-title>
          </v-list-item-content>
          <input ref="filElem" type="file" style="display:none" @change="getFile">
        </v-list-item>
        <v-list-item @click="savefile()">
          <v-list-item-action>
            <v-icon>save</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{$t("Interface.Save_file")}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="dialog = true">
          <v-list-item-action>
            <v-icon>info</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{$t("Interface.About")}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list dense>
        <v-subheader>{{$t("Interface.Setting")}}</v-subheader>
        <v-list-item @click="1">
          <v-list-item-action>
            <v-checkbox
              v-model="excludeunknown"
            ></v-checkbox>
          </v-list-item-action>
          <v-list-item-content @click.prevent="excludeunknown = !excludeunknown">
            <v-list-item-title>{{$t("Interface.Elimination_unknown_weapons")}}</v-list-item-title>
            <v-list-item-subtitle>{{$t("Explanatory.Elimination_unknown_weapons")}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item @click="1">
          <v-list-item-action>
            <v-checkbox
              v-model="sound"
            ></v-checkbox>
          </v-list-item-action>
          <v-list-item-content @click.prevent="sound = !sound">
            <v-list-item-title>{{$t("Interface.Raw_data_comparison")}}</v-list-item-title>
            <v-list-item-subtitle>{{$t("Explanatory.Raw_data_comparison")}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <!--
        <v-list-item @click="1">
          <v-list-item-action>
            <v-checkbox
              v-model="NewInterface"
            ></v-checkbox>
          </v-list-item-action>

          <v-list-item-content @click.prevent="NewInterface = !NewInterface">
            <v-list-item-title>{{$t("Interface.NewInterface")}}</v-list-item-title>
            <v-list-item-subtitle>{{$t("Explanatory.NewInterface")}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        -->
        <v-list-item @click="1">
          <v-list-item-action>
            <v-checkbox
              v-model="Old_version"
            ></v-checkbox>
          </v-list-item-action>

          <v-list-item-content @click.prevent="Old_version = !Old_version">
            <v-list-item-title>{{$t("Interface.Old_version")}}</v-list-item-title>
            <v-list-item-subtitle>{{$t("Explanatory.Old_version")}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="1" v-if="Old_version">
          <v-btn
            :loading="update"
            :disabled="update"
            color="secondary"
            @click.native="versionupdate"
          >
            {{$t("Interface.Version_update")}}
          </v-btn>
          <v-list-item-subtitle>{{$t("Explanatory.Version_update")}}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-subheader>{{$t("Interface.Tools")}}</v-subheader>
      <v-list>
        <!--
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-list-item v-on="on" @click="dataChangeToConfig">
              <v-list-item-action>
                <v-icon>mdi-call-merge</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{$t("Interface.Tools_dataConfig")}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <span>{{$t("Interface.Unopen")}}</span>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-list-item v-on="on">
                <v-list-item-action>
                  <v-icon>mdi-window-maximize</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{$t("Interface.Tools_Hex")}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          <span>{{$t("Interface.Unopen")}}</span>
        </v-tooltip>
        -->

        <v-list-item @click="tools('insertdata')">
          <v-list-item-action>
            <v-icon>mdi-pencil-plus-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{$t("Interface.Tools_insert")}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="tools(sourcemod ? 'edit' : 'hexedit')">
          <v-list-item-action >
            <v-icon>{{sourcemod ? 'mdi-window-maximize' : 'mdi-code-tags'}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{sourcemod ? $t("Interface.Tools_View") : $t("Interface.Tools_Hex")}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item @click="tools({target:'dialogEncryptionwarning'})">
          <v-list-item-action>
            <v-icon>mdi-folder-edit-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{$t("Interface.Tools_encryption")}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
      </v-list>
      <v-divider></v-divider>
      <v-list
        subheader
        three-line>
        <v-list-item @click="1">
        <v-select
          v-model="lang"
          :items="langlist"
          item-text="text"
          item-value="value"
          :label="$t('Interface.Lang')"
          return-object
        ></v-select>
        </v-list-item>
      </v-list>
      <div class="flex-grow-1"></div>
      <v-divider></v-divider>
      <v-dialog v-if="!isNotWeb" v-model="dialogDownload" max-width="450">
        <template v-slot:activator="{ on }">
          <v-list-item v-on="on">
            <v-list-item-action>
              <v-icon>mdi-cloud-download-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{$t("Interface.Download")}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-card>
          <v-card-title class="headline">{{$t("Interface.DownloadVersion")}}</v-card-title>
          <v-card-text class="text-center">
            <v-btn class="ma-2" x-large color="success" href="/download/MHW Equipment Editor.exe" @click="dialogDownload = false" dark>{{$t("Interface.Installed")}}</v-btn>
            <v-btn class="ma-2" x-large color="success" href="/download/MHW Equipment Editor.zip" @click="dialogDownload = false" dark>{{$t("Interface.FreeInstallation")}}</v-btn>
            <v-btn class="ma-2" x-large color="success" href="/download/MHW Equipment Editor Portable.zip" @click="dialogDownload = false" dark>{{$t("Interface.Portable")}}</v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      color="blue-grey"
      dark
      style="-webkit-app-region: drag"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" style="-webkit-app-region: no-drag"></v-app-bar-nav-icon>
      <v-toolbar-title>{{$t("Interface.Title")}} - {{file}}</v-toolbar-title>
      <div class="flex-grow-1"></div>

      <v-btn v-if="isNotWeb" @click="appOperation('hide')" icon style="-webkit-app-region: no-drag">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-btn v-if="isNotWeb" @click="appOperation('closed')" icon style="-webkit-app-region: no-drag">
        <v-icon>close</v-icon>
      </v-btn>

    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-navigation-drawer
      v-model="left"
      fixed
      temporary
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{$t("Interface.New_file")}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-group
          v-for="(item, i) in newfile"
          :key="i"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </template>

          <v-list-item
            v-for="subItem in item.items"
            :key="subItem.title"
            :disabled="subItem.disabled"
            @click="openfile(subItem.file),left = false"
          >
            <v-list-item-title>{{ subItem.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>

    <v-footer
      app
      color="blue-grey"
      class="white--text"
      style="-webkit-app-region: drag"
    >
      <span>&nbsp;&nbsp;&nbsp;By Alcedo  &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp; | {{$t("Interface.Data_version")}} 15.10.00 | {{$t("Interface.Original_file_version")}} 15.10.00 （{{$t("Interface.Extract_from")}} 2020-12-08） | {{$t("Interface.Current_file")}} {{file}}（{{weaponfilename}}）|</span>
    </v-footer>

    <!--弹窗-->
    <v-dialog
      v-model="dialog"
      max-width="490"
    >
      <v-card>
        <v-card-title class="headline">
          {{$t("Interface.About")}}
          <v-spacer />
          <div class="overline mb-4">{{$t("Interface.TranslationProvider")}}</div>
        </v-card-title>
  
        <v-card-text>
          <div>
            <p>{{$t("Explanatory.About_content")}}</p>
            <v-divider></v-divider>
            <p>{{$t("Explanatory.About_edition")}}</p>
            <p>{{$t("Interface.Update_description")}}</p>
            <div v-html="$t('Explanatory.Update_description')"></div>
            <v-divider></v-divider>
            <p><a>https://github.com/HalcyonAlcedo/MHW-Weaponeditor</a></p>
            <v-divider></v-divider>
          </div>
        </v-card-text>
  
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            {{$t("Interface.Read")}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="loaddialog"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          {{$t("Interface.Loading")}}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog 
      v-model="Explain"
      persistent 
      max-width="690">
      <v-card>
        <v-card-title class="headline">
          {{$t("Interface.Instructions")}}
          <v-spacer></v-spacer>
          <v-select
            v-model="lang"
            :items="langlist"
            item-text="text"
            item-value="value"
            :label="$t('Interface.Lang')"
            return-object
          ></v-select>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div v-html="$t('Explanatory.Instructions')"></div>
          <div v-if="loadenvironment && isNotWeb">
            <v-divider></v-divider>
            {{$t("Interface.Loading_Environment")}}
            <v-progress-linear
              indeterminate
              class="mb-0"
            ></v-progress-linear>
            <small>*{{$t("Interface.Loading_Environment_info")}}</small>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click.native="Explain = false">{{$t("Interface.Read")}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogEncryptionwarning" max-width="750">
      <v-card>
        <v-card-title class="headline">{{$t("Interface.Tools_encryption")}}</v-card-title>
        <v-card-text>
          <div v-html="$t('Explanatory.EncryptionHelp')"></div>
          <v-divider></v-divider>
          <v-container>
            <v-row>
              <v-col cols="12" sm="2">
                <v-switch label="批量" v-model="batch" disabled></v-switch>
              </v-col>
              <v-col cols="12" sm="5" v-if="!batch">
                <v-btn rounded color="primary" @click="EncryptionFile(true)" dark>{{$t("Interface.EncryptionFile")}}</v-btn>
              </v-col>
              <v-col cols="12" sm="5" v-if="!batch">
                <v-btn rounded color="primary" @click="EncryptionFile(false)" dark>{{$t("Interface.DencryptionFile")}}</v-btn>
              </v-col>
              <v-col cols="12" v-else>
                <v-data-table
                  v-model="selectEncryptionFileList"
                  :headers="[
                    { text: '文件', align: 'start', sortable: false, value: 'filename' },
                    { text: '密钥', value: 'key' },
                    { text: '文件路径', value: 'file' }
                  ]"
                  :items="EncryptionFileList"
                  item-key="file"
                  show-select
                  class="elevation-1"
                >
                <template v-slot:top>
                  <v-btn rounded color="primary" @click="EncryptionFile()" dark>读取文件列表</v-btn>
                  <v-btn rounded color="primary" @click="EncryptionFile(true)" dark>加密</v-btn>
                  <v-btn rounded color="primary" @click="EncryptionFile(false)" dark>解密</v-btn>
                </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <input ref="encodedFilElem" type="file" style="display:none" @change="EncryptionGetFile">
        <input ref="dencodedFilElem" type="file" style="display:none" @change="DencryptionGetFile">
      </v-card>
    </v-dialog>
    <v-dialog 
      v-model="devtools"
      persistent 
      max-width="690">
      <v-card>
        <v-card-title class="headline">
          {{$t("Interface.Tools")}}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div v-html="$t('Explanatory.Toolsinfo')"></div>
          <v-text-field
            v-model="modurl"
          ></v-text-field>
          <v-btn class="ma-2" tile outlined color="success" @click="request">
            {{$t('Interface.Request')}}
          </v-btn>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click.native="devtools = false; $store.dispatch('setlicense', true)">{{$t("Interface.Read")}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar.snackbar"
      :bottom="snackbar.y === 'bottom'"
      :left="snackbar.x === 'left'"
      :multi-line="snackbar.mode === 'multi-line'"
      :right="snackbar.x === 'right'"
      :timeout="snackbar.timeout"
      :top="snackbar.y === 'top'"
      :vertical="snackbar.mode === 'vertical'"
      style="-webkit-app-region: no-drag"
    >
      {{ snackbar.text }}
      <v-btn
        color="pink"
        text
        @click="snackbar.snackbar = false"
      >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>


<script>
import axios from 'axios'
import edit_core from '../plugins/edit_core'

export default {
  data () {
    let Language = this.$i18n.locale
    return {
      lang: Language,
      langlist: [
        {text: '简体中文', value: 'zh_cn'},
        {text: '繁體中文', value: 'zh_tw'}
      ],
      drawer: true,
      left: false,
      dialog: false,
      dialogDownload: false,
      dialogEncryptionwarning: false,
      Explain: false,
      appdark: false,
      sourcemod: false,
      excludeunknown: true,
      Old_version: false,
      NewInterface: false,
      update: false,
      loaddialog: false,
      loadenvironment: true,
      sound: false,
      batch: false,
      EncryptionFileList: [],
      selectEncryptionFileList: [],
      file: '',
      snackbar: {
        snackbar: false,
        y: 'top',
        x: null,
        mode: '',
        timeout: 6000,
        text: ''
      },
      modurl: '',
      importConfig: [],
      devtools: false
    }
  },
  computed: {
    isNotWeb () {
      return edit_core.notWeb
    },
    newfile () {
      let wp = [
        { title: this.$t('Weapon.Greatsword') + ' (l_sword)', file: 'l_sword.wp_dat' },
        { title: this.$t('Weapon.Blade') + ' (sword)', file: 'sword.wp_dat' },
        { title: this.$t('Weapon.Hammer') + ' (hammer)', file: 'hammer.wp_dat' },
        { title: this.$t('Weapon.Lance') + ' (lance)', file: 'lance.wp_dat' },
        { title: this.$t('Weapon.Switch_axe') + ' (s_axe)', file: 's_axe.wp_dat' },
        { title: this.$t('Weapon.Insect_glaive') + ' (rod)', file: 'rod.wp_dat' },
        { title: this.$t('Weapon.Light_crossbow') + ' (lbg)', file: 'lbg.wp_dat_g' },
        { title: this.$t('Weapon.Heavy_crossbow') + ' (hbg)', file: 'hbg.wp_dat_g' },
        { title: this.$t('Weapon.Longsword') + ' (tachi)', file: 'tachi.wp_dat' },
        { title: this.$t('Weapon.Dual_blade') + ' (w_sword)', file: 'w_sword.wp_dat' },
        { title: this.$t('Weapon.Hunting_horn') + ' (whistle)', file: 'whistle.wp_dat' },
        { title: this.$t('Weapon.Gunlance') + ' (g_lance)', file: 'g_lance.wp_dat' },
        { title: this.$t('Weapon.Charge_blade') + ' (c_axe)', file: 'c_axe.wp_dat' },
        { title: this.$t('Weapon.Hunting_bow') + ' (bow)', file: 'bow.wp_dat_g' }
      ]
      let wpm = [
        { title: this.$t('Weaponsmiscellaneous.Sharpness') + ' (kireaji.kire)', file: 'kireaji.kire'},
        { title: this.$t('Weaponsmiscellaneous.Wswordattribute') + ' (wep_wsword.wep_wsd)', file: 'wep_wsword.wep_wsd'},
        { title: this.$t('Weaponsmiscellaneous.Saxebottle') + ' (wep_saxe.wep_saxe)', file: 'wep_saxe.wep_saxe'},
        { title: this.$t('Weaponsmiscellaneous.Bombardment') + ' (wep_glan.wep_glan)', file: 'wep_glan.wep_glan'},
        { title: this.$t('Weaponsmiscellaneous.Syllable') + ' (wep_whistle.wep_wsl)', file: 'wep_whistle.wep_wsl'},
        { title: this.$t('Weaponsmiscellaneous.Bottle') + ' (bottle_table.bbtbl)', file: 'bottle_table.bbtbl'},
        { title: this.$t('Weaponsmiscellaneous.Shell') + ' (shell_table.shl_tbl)', file: 'shell_table.shl_tbl'},
        { title: this.$t('Weaponsmiscellaneous.Skill') + ' (skill_data.skl_dat)', file: 'skill_data.skl_dat'},
        { title: this.$t('Weaponsmiscellaneous.Rod') + ' (rod_insect.rod_inse)', file: 'rod_insect.rod_inse'},
        { title: this.$t('Weaponsmiscellaneous.ASkill') + ' (a_skill.ask)', file: 'a_skill.ask'},
        //{ title: this.$t('Weaponsmiscellaneous.WeaponMake') + ' (weapon.eq_crt)', file: 'weapon.eq_crt'},
        //{ title: this.$t('Weaponsmiscellaneous.WeaponDerived') + ' (weapon.eq_cus)', file: 'weapon.eq_cus'}
      ]
      let eq = [
        { title: this.$t('Armor.Armor') + ' (armor.am_dat)', file: 'armor.am_dat'},
        //{ title: this.$t('Armor.ArmorMake') + ' (armor.eq_crt)', file: 'armor.eq_crt'},
      ]
      let ip = this.importConfig
      return [
        {title: this.$t('Interface.Weapon'), items: wp},
        {title: this.$t('Interface.Weaponsmiscellaneous'), items: wpm},
        {title: this.$t('Interface.equipment'), items: eq},
        {title: this.$t('Interface.Other'), items: ip}
      ]
    },
    weapon () {
      return this.$store.getters.donefilename
    },
    filedata () {
      return this.$store.getters.donefiledata
    },
    license () {
      return this.$store.getters.donelicense
    },
    uuid () {
      return this.$store.getters.doneuuid
    },
    config () {
      return this.$store.getters.doneconfig
    },
    weaponfilename () {
      switch (this.weapon) {
        case 'l_sword.wp_dat':
          return this.$t('Weapon.Greatsword')
        case 'sword.wp_dat':
          return this.$t('Weapon.Blade')
        case 'hammer.wp_dat':
          return this.$t('Weapon.Hammer')
        case 'lance.wp_dat':
          return this.$t('Weapon.Lance')
        case 's_axe.wp_dat':
          return this.$t('Weapon.Switch_axe')
        case 'rod.wp_dat':
          return this.$t('Weapon.Insect_glaive')
        case 'lbg.wp_dat_g':
          return this.$t('Weapon.Light_crossbow')
        case 'tachi.wp_dat':
          return this.$t('Weapon.Longsword')
        case 'w_sword.wp_dat':
          return this.$t('Weapon.Dual_blade')
        case 'whistle.wp_dat':
          return this.$t('Weapon.Hunting_horn')
        case 'g_lance.wp_dat':
          return this.$t('Weapon.Gunlance')
        case 'c_axe.wp_dat':
          return this.$t('Weapon.Charge_blade')
        case 'bow.wp_dat_g':
          return this.$t('Weapon.Hunting_bow')
        case 'hbg.wp_dat_g':
          return this.$t('Weapon.Heavy_crossbow')
        case 'kireaji.kire':
          return this.$t('Weaponsmiscellaneous.Sharpness')
        case 'rod_insect.rod_inse':
          return this.$t('Weaponsmiscellaneous.Rod')
        case 'skill_data.skl_dat':
          return this.$t('Weaponsmiscellaneous.Skill')
        case 'a_skill.ask':
          return this.$t('Weaponsmiscellaneous.ASkill')
        case 'wep_glan.wep_glan':
          return this.$t('Weaponsmiscellaneous.Bombardment')
        case 'wep_saxe.wep_saxe':
          return this.$t('Weaponsmiscellaneous.Saxebottle')
        case 'wep_whistle.wep_wsl':
          return this.$t('Weaponsmiscellaneous.Syllable')
        case 'bottle_table.bbtbl':
          return this.$t('Weaponsmiscellaneous.Bottle')
        case 'shell_table.shl_tbl':
          return this.$t('Weaponsmiscellaneous.Shell')
        case 'wep_wsword.wep_wsd':
          return this.$t('Weaponsmiscellaneous.Wswordattribute')
        case 'weapon.eq_cus':
          return this.$t('Weaponsmiscellaneous.WeaponDerived')
        case 'weapon.eq_crt':
          return this.$t('Weaponsmiscellaneous.WeaponMake')
        case 'armor.eq_crt':
          return this.$t('Armor.ArmorMake')
        case 'armor.am_dat':
          return this.$t('Interface.equipment')
      }
      for (let configList = 0; configList < this.config.length; configList++) {
        if(this.weapon == this.config[configList].modeFile) {
          return this.config[configList].name
        }
      }
      return this.$t('Weapon.Unknown')
    }
  },
  watch: {
    excludeunknown: function () {
      this.$store.dispatch('excludeUnknown', this.excludeunknown)
    },
    NewInterface: function () {
      this.$store.dispatch('newInterface', this.NewInterface)
    },
    weapon: function () {
      if (this.file !== this.$store.getters.donefilename && this.$store.getters.donefilename !== 'Unknown') {
        this.snackbar.text = this.$t('Interface.Oldfile')
      }
      for (let configList = 0; configList < this.config.length; configList++) {
        if(this.weapon == this.config[configList].modeFile && this.config[configList].author != undefined && this.config[configList].author != '') {
          this.snackbar.text = this.$t('Explanatory.ConfigAuthor') + this.config[configList].author
        }
      }
      this.contrastdata()
    },
    sound: function () {
      this.contrastdata()
    },
    Old_version: function () {
      this.snackbar.text = this.Old_version ? this.$t('Explanatory.Old_version_open') : this.$t('Explanatory.Old_version_close')
      this.snackbar.snackbar = true
      this.$store.dispatch('setOldversion', this.Old_version)
    },
    lang: function () {
      this.$i18n.locale = this.lang.value
    },
    $route() {
      if (this.$route.path === '/edit') {
        this.sourcemod = false
      } else {
        this.sourcemod = true
      }
    }
  },
  methods: {
    openfile (file = null) {
      let _this = this
      edit_core.openfile(file, (setOld_version, filepath, data) => {
        if (setOld_version !== null) {
          _this.$store.dispatch('setOldversion', setOld_version)
          _this.Old_version = setOld_version
        }
        if (filepath !== null && data !== null) {
          _this.file = filepath.substring(filepath.lastIndexOf('\\') + 1)
          _this.$store.dispatch('setfile', filepath)
          _this.$store.dispatch('setdata', data)
          _this.$router.push('/edit')
          _this.snackbar.text = _this.$t('Interface.Open_Success')
          _this.snackbar.snackbar = true
          _this.loaddialog = false
        } else {
          _this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
        }
      }, () => {
        _this.snackbar.text = _this.$t('Interface.Open_Failure')
        _this.snackbar.snackbar = true
        _this.loaddialog = false
      })
    },
    request () {
      let _this = this
      axios({
        method: 'post',
        url: 'https://mhwee.com/requestauthorization.php', // 请求地址
        headers:{
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          modurl: this.modurl,
          UUID: this.uuid
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        responseType: 'json' // 表明返回服务器返回的数据类型
      }).then(() => { // 处理返回的文件流
        _this.devtools = false
        _this.$store.dispatch('setlicense', true)
      })
    },
    tools (target) {
      if (this.license) {
        if (typeof(target) == 'string') {
          this.$router.push('/' + target)
        } else {
          this[target.target] = true
        }
      } else {
        this.devtools = true
      }
    },
    EncryptionFile(encoded) {
      let _this = this
      if (encoded == null) {
        edit_core.openfile(null, null, null, false, true, this.batch, this, 'EncryptionFileList')
      } else {
        if (this.batch) {
          for(let i =0; i < this.selectEncryptionFileList.length; i++) {
            console.log(this.selectEncryptionFileList[i])
            edit_core.openfile(null, (_, filepath, data) => {
              if (filepath !== null && data !== null) {
                if (encoded) {
                  edit_core.encodedFile(filepath, data)
                } else {
                  edit_core.decodedFile(filepath, data)
                }
              } else {
                if (encoded) {
                  _this.$refs.encodedFilElem.dispatchEvent(new MouseEvent('click'))
                } else {
                  _this.$refs.dencodedFilElem.dispatchEvent(new MouseEvent('click'))
                }
              }
              _this.dialogEncryptionwarning = false
              _this.snackbar.text = _this.$t('Interface.Open_Success')
                _this.snackbar.snackbar = true
            }, null, false, true)
          }
        } else {
          edit_core.openfile(null, (_, filepath, data) => {
            if (filepath !== null && data !== null) {
              if (encoded) {
                edit_core.encodedFile(filepath, data)
              } else {
                edit_core.decodedFile(filepath, data)
              }
            } else {
              if (encoded) {
                _this.$refs.encodedFilElem.dispatchEvent(new MouseEvent('click'))
              } else {
                _this.$refs.dencodedFilElem.dispatchEvent(new MouseEvent('click'))
              }
            }
            _this.dialogEncryptionwarning = false
            _this.snackbar.text = _this.$t('Interface.Open_Success')
              _this.snackbar.snackbar = true
          }, null, false, true)
        }
        
      }
    },
    EncryptionGetFile (event) {
      let _this = this
      let file = event.target.files
      let reader = new FileReader();
      reader.readAsArrayBuffer(file[0]);
      reader.onload = function() {
        let temp_data = new Uint8Array(this.result)
        let data = new Buffer(this.result.byteLength);
        for (var i = 0; i < temp_data.length; ++i) {
          data[i] = temp_data[i];
        }
        edit_core.encodedFile(file[0].name, data)
        _this.dialogEncryptionwarning = false
        _this.snackbar.text = _this.$t('Interface.Open_Success')
        _this.snackbar.snackbar = true
      }
    },
    DencryptionGetFile (event) {
      let _this = this
      let file = event.target.files
      let reader = new FileReader();
      reader.readAsArrayBuffer(file[0]);
      reader.onload = function() {
        let temp_data = new Uint8Array(this.result)
        let data = new Buffer(this.result.byteLength);
        for (var i = 0; i < temp_data.length; ++i) {
          data[i] = temp_data[i];
        }
        edit_core.decodedFile(file[0].name, data)
        _this.dialogEncryptionwarning = false
        _this.snackbar.text = _this.$t('Interface.Open_Success')
        _this.snackbar.snackbar = true
      }
    },
    getFile (event) {
      let _this = this
      let file = event.target.files
      let reader = new FileReader();
      reader.readAsArrayBuffer(file[0]);
      reader.onload = function() {
        _this.file = file[0].name
        let temp_data = new Uint8Array(this.result)
        var data = new Buffer(this.result.byteLength);
        for (var i = 0; i < temp_data.length; ++i) {
          data[i] = temp_data[i];
        }
        _this.loaddialog = false
        let key = edit_core.CryptographicKey(file[0].name.substring(file[0].name.lastIndexOf('.')))
        if (key) {
          data = edit_core.decoded(key, data)
        }
        _this.$store.dispatch('setfile', file[0].name)
        _this.$store.dispatch('setdata', data)
        _this.snackbar.text = _this.$t('Interface.Open_Success')
        _this.snackbar.snackbar = true
      }
      reader.onerror = function() {
        _this.snackbar.text = _this.$t('Interface.Open_Failure')
        _this.snackbar.snackbar = true
      }
    },
    dataChangeToConfig () {
      if(this.file !== this.$t('Interface.No_file_opened')) {
        this.sound = true
        this.contrastdata()
        this.$store.dispatch('setdatatoconfig', true)
      } else {
        this.snackbar.text = this.$t('Interface.No_file_opened')
        this.snackbar.snackbar = true
      }
    },
    savefile () {
      let _this = this
      if (this.Old_version) {
        this.snackbar.text = this.$t('Interface.Old_version_save')
        this.snackbar.snackbar = true
      } else if (this.file !== this.$t('Interface.No_file_opened')) {
        edit_core.savefile(this.$t('Interface.Save_file'), this.weapon !== 'Unknown' ? this.weapon : this.file, this.filedata, () => {
          _this.snackbar.text = _this.$t('Interface.Save_Success')
          _this.snackbar.snackbar = true
        }, () => {
          _this.snackbar.text = _this.$t('Interface.Save_Failure')
        })
      } else {
        this.snackbar.text = this.$t('Interface.No_file_opened')
        this.snackbar.snackbar = true
      }
    },
    contrastdata () {
      let _this = this
      if (this.weapon !== 'Unknown' && this.sound) {
        edit_core.openfile(this.weapon, (setOld_version, filepath, data) => {
          _this.$store.dispatch('setsourcedata', data)
          _this.loaddialog = false
        }, (err) => {
          console.log('err:' + err)
        })
      } else {
        this.$store.dispatch('setsourcedata', false)
      }
    },
    appOperation (Operation) {
      edit_core.APPOperation(Operation)
    },
    versionupdate () {
      this.$store.dispatch('updateversion', true)
      this.sound = true
      this.contrastdata()
      this.Old_version = false
      this.snackbar.text = this.$t('Explanatory.Version_update_true')
      this.snackbar.snackbar = true
    }
  },
  mounted () {
    let _this = this
    this.file = this.$t('Interface.No_file_opened')
    document.addEventListener('dragover', function (e) {
      e.preventDefault()
      e.stopPropagation()
    })
    this.Explain = true
    edit_core.AddedConfig((data) => {
      if (data && data.name !== undefined && data.modeFile !== undefined){
        if(data.type == undefined) {
          data.type = data.modeFile.substring(data.modeFile.lastIndexOf('.') + 1)
        }
        this.importConfig.push({ title: `${data.name} (${data.modeFile})`, file: data.modeFile})
        _this.$store.dispatch('setconfig', data)
      }
    },(err) => {
      console.log(err)
    })
    
    edit_core.MultiLanguage((LanguageData, Language, file)=>{
      if (LanguageData && Language) {
        console.log(file)
        if (file == 'view') {
          _this.$i18n.setLocaleMessage(Language,LanguageData)
          for(let LanguageList in _this.$i18n.messages) {
            if (_this.langlist.filter(function (el) {
              return el.value == LanguageList;
            }).length == 0) {
              _this.langlist.push({
                text: _this.$i18n.messages[LanguageList].Config.Language,
                value: LanguageList
              })
            }
          }
        } else {
          _this.$store.dispatch('addlanguagedata', {
            name: file,
            language: Language,
            data: LanguageData
          })
        }
      }
    })

    this.loadenvironment = false
  }
}
</script>