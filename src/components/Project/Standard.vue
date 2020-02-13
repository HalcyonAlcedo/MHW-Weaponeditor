<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-card
          class="mx-auto"
          width="344"
          outlined
          v-on="on"
        >
          <v-list-item three-line>
          <v-list-item-content>
              <div class="overline mb-4">
                {{contentType}}
                <v-spacer></v-spacer>
                {{ $t('WeaponExplain.Address') }}：<span class="red--text">{{ str_pad(data.wp_Hex) }}</span>
              </div>
              <v-list-item-title class="headline mb-1">{{contentTitle}}</v-list-item-title>
          </v-list-item-content>

          <!--
          <v-list-item-avatar
              tile
              size="80"
              color="grey"
          ></v-list-item-avatar>
          -->
          </v-list-item>

          <v-card-actions>

          </v-card-actions>
        </v-card>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{contentTitle}}</span>
          <v-spacer></v-spacer>
          <v-subheader>
            {{ $t('WeaponExplain.Address') }}：<span class="red--text">{{ str_pad(data.wp_Hex) }}</span>
          </v-subheader>
        </v-card-title>
        <v-card-text>
          <wpdat v-if="category == 'wp_dat'" :hexdata="data" :sourcedata="sourcedata" />
          <wpdatg v-else-if="category == 'wp_dat_g'" :hexdata="data" :sourcedata="sourcedata" />
          <rodinse v-else-if="category == 'rod_inse'" :hexdata="data" :sourcedata="sourcedata" />
          <div v-else>{{$t('Explanatory.DidNotOpen')}}</div>
          <small>{{$t('Explanatory.NoLimit')}}</small>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import wpdat from './module/wp_dat'
  import wpdatg from './module/wp_dat_g'
  import rodinse from './module/rod_inse'

  export default {
    data: () => ({
      dialog: false,
    }),
    props: ['data','sourcedata','items'],
    components: {
      wpdat,
      wpdatg,
      rodinse,
    },
    computed: {
      contentTitle () {
        let title = this.$t('WeaponExplain.Error')
        if (this.existence(this.data.wp_Number)) { title = this.data.wp_Name } else 
        if (this.existence(this.data.eq_Number)) { title = this.data.wp_Name } else 
        if (this.existence(this.data.as_Number)) { title = this.data.wp_Name } else 
        if (this.existence(this.data.wrt_Number)) { title = this.data.wp_Name } else 
        if (this.existence(this.data.wus_Number)) { title = this.data.wp_Name } else 
        if (this.existence(this.data.art_Number)) { title = this.data.wp_Name } else 
        if (this.existence(this.data.ri_Number)) { title = this.data.wp_Name } else 
        if (this.existence(this.data.sk_Number)) { title = this.data.wp_Name + 'LV' + this.data.sk_level.vul } else 
        if (this.existence(this.data.k_Number)) { title = this.$t('Weaponsmiscellaneous.Sharpness') + this.data.k_Number.vul } else 
        if (this.existence(this.data.ws_Number)) { title = this.$t('Weaponsmiscellaneous.Wswordattribute') + this.data.ws_Number.vul } else 
        if (this.existence(this.data.bt_Number)) { title = this.$t('Weaponsmiscellaneous.Bottle') + this.data.bt_Number.vul } else 
        if (this.existence(this.data.sa_Number)) { title = this.$t('Weaponsmiscellaneous.Saxebottle') + this.data.sa_Number.vul } else 
        if (this.existence(this.data.ww_Number)) { title = this.$t('Weaponsmiscellaneous.Syllable') + this.data.ww_Number.vul } else 
        if (this.existence(this.data.gl_Number)) { title = this.$t('Weaponsmiscellaneous.Bombardment') + this.data.gl_Number.vul } else 
        if (this.existence(this.data.sh_Number)) { title = this.$t('Weaponsmiscellaneous.Shell') + this.data.sh_Number.vul } 
        return title
      },
      weapon () {
        return this.$store.getters.donefilename
      },
      category () {
        return this.weapon.substring(this.weapon.lastIndexOf('.') + 1)
      },
      contentType () {
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
          default:
            return this.$t('Weapon.Unknown')
        }
      }
    },
    methods: {
      //检查项目是否存在
      existence (target) {
        return target !== undefined && target !== false
      },
      str_pad (hex, digits = 8) {
        var zero = new Array(digits + 1).join('0')
        var tmp = digits - hex.length
        return zero.substr(0, tmp) + hex.toLocaleUpperCase()
      },
    },
  }
</script>