<template>
  <v-container>
  <v-row>
    <v-col cols="12" sm="6" md="4">
    <!--武器id-->
      <v-text-field
        :label="$t('WeaponExplain.Sequence_number')"
        v-model="hexdata.wp_Number.vul"
        readonly
      ></v-text-field>
    </v-col>

    <v-col cols="12" sm="6" md="4">
    <!--制造费用-->
      <v-text-field
        :label="$t('WeaponExplain.Manufacturing_costs')"
        @change="input_interchangeable(hexdata.wp_Money)"
        v-model="hexdata.wp_Money.vul"
        readonly
      ></v-text-field>
      <v-text-field
        v-if="sourcedata && (hexdata.wp_Money.vul !== hexdata.wp_sourcedata.wp_Money.vul)"
        :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Manufacturing_costs')"
        v-model="hexdata.wp_sourcedata.wp_Money.vul"
        prepend-icon="mdi-transfer-left"
        readonly
      ></v-text-field>
    </v-col>

    <v-col cols="12" sm="6" md="4">
      <!--稀有度-->
      <v-select
        v-model="hexdata.wp_Rarity.vul"
        :items="rankitem"
        @change="Select_interchangeable(hexdata.wp_Rarity)"
        :label="$t('WeaponExplain.Production_expenses')"
        item-text="text"
        item-value="value"
        return-object
      ></v-select>
      <v-text-field
        v-if="sourcedata && (hexdata.wp_Rarity.vul !== hexdata.wp_sourcedata.wp_Rarity.vul)"
        :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Production_expenses')"
        :value="'Rank' + Number(hexdata.wp_sourcedata.wp_Rarity.vul + 1)"
        prepend-icon="mdi-transfer-left"
        readonly
      ></v-text-field>
    </v-col>

    <v-col cols="12" sm="6" md="4">
      <!--伤害-->
      <v-text-field
        :label="$t('WeaponExplain.Damage')"
        @change="Damage_treatment(hexdata.wp_Damage_value)"
        v-model="hexdata.wp_Damage_value.vul"
      ></v-text-field>
      <v-text-field
        v-if="sourcedata && (hexdata.wp_Damage_value.vul !== hexdata.wp_sourcedata.wp_Damage_value.vul)"
        :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Damage')"
        v-model="hexdata.wp_sourcedata.wp_Damage_value.vul"
        prepend-icon="mdi-transfer-left"
        readonly
      ></v-text-field>
    </v-col>

    <v-col cols="12" sm="6" md="4">
      <!--防御-->
      <v-text-field
        :label="$t('WeaponExplain.Defense')"
        @change="Defense_treatment(hexdata.wp_Defense_value)"
        v-model="hexdata.wp_Defense_value.vul"
      ></v-text-field>
      <v-text-field
        v-if="sourcedata && (hexdata.wp_Defense_value.vul !== hexdata.wp_sourcedata.wp_Defense_value.vul)"
        :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Defense')"
        v-model="hexdata.wp_sourcedata.wp_Defense_value.vul"
        prepend-icon="mdi-transfer-left"
        readonly
      ></v-text-field>
    </v-col>

    <v-col cols="12" sm="6" md="4">
      <!--会心-->
      <v-text-field
        :label="$t('WeaponExplain.Heart')"
        suffix="%"
        @change="Heart_treatment(hexdata.wp_Heart_value)"
        v-model="hexdata.wp_Heart_value.vul"
      ></v-text-field>
      <v-text-field
        v-if="sourcedata && (hexdata.wp_Heart_value.vul !== hexdata.wp_sourcedata.wp_Heart_value.vul)"
        :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Heart')"
        suffix="%"
        v-model="hexdata.wp_sourcedata.wp_Heart_value.vul"
        prepend-icon="mdi-transfer-left"
        readonly
      ></v-text-field>
    </v-col>

    <v-col cols="12" sm="6" md="4">
      <!--可见属性-->
      <v-select
        v-model="hexdata.wp_Visible_attributes.vul"
        :items="attributeitem"
        @change="Select_interchangeable(hexdata.wp_Visible_attributes)"
        :label="$t('WeaponExplain.Visible_attributes')"
        item-text="text"
        item-value="value"
        return-object
      ></v-select>
      <v-text-field
        v-if="sourcedata && (hexdata.wp_Visible_attributes.vul !== hexdata.wp_sourcedata.wp_Visible_attributes.vul)"
        :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Visible_attributes')"
        :value="attribute(hexdata.wp_sourcedata.wp_Visible_attributes.vul)"
        prepend-icon="mdi-transfer-left"
        readonly
      ></v-text-field>
    </v-col>

    <v-col cols="12" sm="6">
      <!--可见属性值-->
      <v-text-field
        :label="$t('WeaponExplain.Visible_attribute_values')"
        @change="Attribute_treatment(hexdata.wp_Visible_attribute_values)"
        v-model="hexdata.wp_Visible_attribute_values.vul"
      ></v-text-field>
      <v-text-field
        v-if="sourcedata && (hexdata.wp_Visible_attribute_values.vul !== hexdata.wp_sourcedata.wp_Visible_attribute_values.vul)"
        :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Visible_attribute_values')"
        v-model="hexdata.wp_sourcedata.wp_Visible_attribute_values.vul"
        prepend-icon="mdi-transfer-left"
        readonly
      ></v-text-field>

    </v-col>

    <v-col cols="12" sm="6" md="4">
      <!--隐藏属性-->
      <v-select
        v-model="hexdata.wp_Hidden_attribute.vul"
        :items="attributeitem"
        @change="Select_interchangeable(hexdata.wp_Hidden_attribute)"
        :label="$t('WeaponExplain.Hidden_attributes')"
        item-text="text"
        item-value="value"
        return-object
      ></v-select>
      <v-text-field
        v-if="sourcedata && (hexdata.wp_Hidden_attribute.vul !== hexdata.wp_sourcedata.wp_Hidden_attribute.vul)"
        :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Hidden_attributes')"
        :value="attribute(hexdata.wp_sourcedata.wp_Hidden_attribute.vul)"
        prepend-icon="mdi-transfer-left"
        readonly
      ></v-text-field>
    </v-col>

    <v-col cols="12" sm="6">
      <!--隐藏属性值-->
      <v-text-field
        :label="$t('WeaponExplain.Hidden_attribute_values')"
        @change="Attribute_treatment(hexdata.wp_Hidden_attribute_values)"
        v-model="hexdata.wp_Hidden_attribute_values.vul"
      ></v-text-field>
      <v-text-field
        v-if="sourcedata && (hexdata.wp_Hidden_attribute_values.vul !== hexdata.wp_sourcedata.wp_Hidden_attribute_values.vul)"
        :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Hidden_attribute_values')"
        v-model="hexdata.wp_sourcedata.wp_Hidden_attribute_values.vul"
        prepend-icon="mdi-transfer-left"
        readonly
      ></v-text-field>
    </v-col>

    <v-col cols="12" sm="6" md="4">
      <!--封龙力-->
      <v-select
        v-model="hexdata.wp_Seal_Dragon.vul"
        :items="generalsizeitem"
        @change="Select_interchangeable(hexdata.wp_Seal_Dragon)"
        :label="$t('WeaponExplain.Seal_Dragon')"
        item-text="text"
        item-value="value"
        return-object
      ></v-select>
      <v-text-field
        v-if="sourcedata && (hexdata.wp_Seal_Dragon.vul !== hexdata.wp_sourcedata.wp_Seal_Dragon.vul)"
        :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Seal_Dragon')"
        :value="generalsize(hexdata.wp_sourcedata.wp_Seal_Dragon.vul)"
        prepend-icon="mdi-transfer-left"
        readonly
      ></v-text-field>
    </v-col>

    <v-col cols="12" sm="6">
      <!--技能-->
      <v-autocomplete
        :label="$t('WeaponExplain.Weapon_skills')"
        v-model="hexdata.wp_Weapon_skills.vul"
        :items="skillitem"
        @change="input_interchangeable(hexdata.wp_Weapon_skills)"
        item-text="text"
        persistent-hint
        :no-data-text="$t('Interface.No_data')"
      >
      </v-autocomplete>
      <v-text-field
        v-if="sourcedata && (hexdata.wp_Weapon_skills.vul !== hexdata.wp_sourcedata.wp_Weapon_skills.vul)"
        :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Weapon_skills')"
        v-model="hexdata.wp_sourcedata.wp_Weapon_skills.vul"
        prepend-icon="mdi-transfer-left"
        readonly
      ></v-text-field>
    </v-col>
    
    <v-col cols="12" md="3">
      <!--孔槽数-->
      <v-select
        v-model="hexdata.wp_Slot_grade_Number.vul"
        :items="grooveitem"
        @change="Select_interchangeable(hexdata.wp_Slot_grade_Number)"
        :label="$t('WeaponExplain.Slot_grade_Number')"
        item-text="text"
        item-value="value"
        return-object
      ></v-select>
      <v-text-field
        v-if="sourcedata && (hexdata.wp_Slot_grade_Number.vul !== hexdata.wp_sourcedata.wp_Slot_grade_Number.vul)"
        :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Slot_grade_Number')"
        :value="groove(hexdata.wp_sourcedata.wp_Slot_grade_Number.vul)"
        prepend-icon="mdi-transfer-left"
        readonly
      ></v-text-field>
    </v-col>
    
    <v-col cols="12" sm="6" md="3">
      <!--1孔槽-->
      <v-select
        v-model="hexdata.wp_Slot_grade_1.vul"
        :items="gradeitem"
        @change="Select_interchangeable(hexdata.wp_Slot_grade_1)"
        :label="$t('WeaponExplain.Slot_grade_Number1')"
        item-text="text"
        item-value="value"
        return-object
      ></v-select>
      <v-text-field
        v-if="sourcedata && (hexdata.wp_Slot_grade_1.vul !== hexdata.wp_sourcedata.wp_Slot_grade_1.vul)"
        :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Slot_grade_Number1')"
        :value="grade(hexdata.wp_sourcedata.wp_Slot_grade_1.vul)"
        prepend-icon="mdi-transfer-left"
        readonly
      ></v-text-field>
    </v-col>
    
    <v-col cols="12" sm="6" md="3">
      <!--2孔槽-->
      <v-select
        v-model="hexdata.wp_Slot_grade_2.vul"
        :items="gradeitem"
        @change="Select_interchangeable(hexdata.wp_Slot_grade_2)"
        :label="$t('WeaponExplain.Slot_grade_Number2')"
        item-text="text"
        item-value="value"
        return-object
      ></v-select>
      <v-text-field
        v-if="sourcedata && (hexdata.wp_Slot_grade_2.vul !== hexdata.wp_sourcedata.wp_Slot_grade_2.vul)"
        :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Slot_grade_Number2')"
        :value="grade(hexdata.wp_sourcedata.wp_Slot_grade_2.vul)"
        prepend-icon="mdi-transfer-left"
        readonly
      ></v-text-field>
    </v-col>
    
    <v-col cols="12" sm="6" md="3">
      <!--3孔槽-->
      <v-select
        v-model="hexdata.wp_Slot_grade_3.vul"
        :items="gradeitem"
        @change="Select_interchangeable(hexdata.wp_Slot_grade_3)"
        :label="$t('WeaponExplain.Slot_grade_Number3')"
        item-text="text"
        item-value="value"
        return-object
      ></v-select>
      <v-text-field
        v-if="sourcedata && (hexdata.wp_Slot_grade_3.vul !== hexdata.wp_sourcedata.wp_Slot_grade_3.vul)"
        :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Slot_grade_Number3')"
        :value="grade(hexdata.wp_sourcedata.wp_Slot_grade_3.vul)"
        prepend-icon="mdi-transfer-left"
        readonly
      ></v-text-field>
    </v-col>

    
    
    <v-col cols="12" sm="6" md="4">
      <!--特殊内容-->
      <v-select
        v-model="hexdata.wp_Special_attributes.vul"
        :items="specialattributesitem"
        @change="Select_interchangeable(hexdata.wp_Special_attributes)"
        :label="$t('WeaponExplain.Special_attributes')"
        item-text="text"
        item-value="value"
        return-object
      ></v-select>
      <v-text-field
        v-if="sourcedata && (hexdata.wp_Special_attributes.vul !== hexdata.wp_sourcedata.wp_Special_attributes.vul)"
        :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Special_attributes')"
        :value="specialattributes(hexdata.wp_sourcedata.wp_Special_attributes.vul)"
        prepend-icon="mdi-transfer-left"
        readonly
      ></v-text-field>
    </v-col>
    
    <v-col cols="12" sm="6" md="4">
      <!--斩味-->
      <v-menu
        :close-on-content-click="false"
        :nudge-width="300"
        offset-x
      >
        <template v-slot:activator="{ on }">
          <v-btn class="ma-2" tile outlined color="success" v-on="on">
            <v-icon left>mdi-sword</v-icon> {{$t('WeaponExplain.Chopping_grade')}}
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item justify-space-around>
              <v-layout justify-space-around>
              <v-list-item-avatar>
                  <v-btn small @click="hexdata.wp_Chopping_value.vul = 33,
                    hexdata.wp_Chopping_grade.vul = 8,
                    input_interchangeable(hexdata.wp_Chopping_value),
                    input_interchangeable(hexdata.wp_Chopping_grade)">
                    {{$t('WeaponExplain.Chopping_grade_quick1')}}
                  </v-btn>
              </v-list-item-avatar>
              <v-list-item-avatar>
                  <v-btn small @click="hexdata.wp_Chopping_value.vul = 38,
                    hexdata.wp_Chopping_grade.vul = 8,
                    input_interchangeable(hexdata.wp_Chopping_value),
                    input_interchangeable(hexdata.wp_Chopping_grade)">
                    {{$t('WeaponExplain.Chopping_grade_quick2')}}
                  </v-btn>
              </v-list-item-avatar>
              <v-list-item-avatar>
                  <v-btn small @click="hexdata.wp_Chopping_value.vul = 39,
                    hexdata.wp_Chopping_grade.vul = 8,
                    input_interchangeable(hexdata.wp_Chopping_value),
                    input_interchangeable(hexdata.wp_Chopping_grade)">
                    {{$t('WeaponExplain.Chopping_grade_quick3')}}
                  </v-btn>
              </v-list-item-avatar>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-list-item-avatar v-on="on">
                    <v-btn small @click="
                      hexdata.wp_Chopping_value.vul = hexdata.wp_sourcedata.wp_Chopping_value.vul,
                      hexdata.wp_Chopping_grade.vul = hexdata.wp_sourcedata.wp_Chopping_grade.vul,
                      input_interchangeable(hexdata.wp_Chopping_value),
                      input_interchangeable(hexdata.wp_Chopping_grade)"
                      :disabled="!sourcedata"
                    >
                      {{$t('WeaponExplain.Reset')}}
                    </v-btn>
                  </v-list-item-avatar>
                </template>
                <span>{{$t('Explanatory.ResetChopping')}}</span>
              </v-tooltip>
              </v-layout>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-subheader>{{$t('WeaponExplain.Chopping_value') + '(' + hexdata.wp_Chopping_value.vul + ')'}}</v-subheader>
            <v-list-item>
              <v-list-item-content>
                <v-slider
                  @change="input_interchangeable(hexdata.wp_Chopping_value)"
                  v-model="hexdata.wp_Chopping_value.vul"
                  max=118
                ></v-slider>
              </v-list-item-content>
            </v-list-item>
            <v-subheader>{{$t('WeaponExplain.Chopping_grade')}}</v-subheader>
            <v-list-item>
              <v-list-item-content>
                <v-slider
                  @change="input_interchangeable(hexdata.wp_Chopping_grade)"
                  v-model="hexdata.wp_Chopping_grade.vul"
                  max=8
                  ticks="always"
                  tick-size="2"
                ></v-slider>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-col>
  </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
    }),
    props: ['hexdata', 'sourcedata'],
    computed: {
      weapon () {
        return this.$store.getters.donefilename
      },
      rankitem () {
        return [
          {value: 0, text: 'Rank1'},
          {value: 1, text: 'Rank2'},
          {value: 2, text: 'Rank3'},
          {value: 3, text: 'Rank4'},
          {value: 4, text: 'Rank5'},
          {value: 5, text: 'Rank6'},
          {value: 6, text: 'Rank7'},
          {value: 7, text: 'Rank8'},
          {value: 8, text: 'Rank9'},
          {value: 9, text: 'Rank10'},
          {value: 10, text: 'Rank11'},
          {value: 11, text: 'Rank12'},
        ]
      },
      attributeitem () {
        return [
          {value: 0, text: this.$t('WeaponExplain.Nothing')},
          {value: 1, text: this.$t('WeaponExplain.Fire')},
          {value: 2, text: this.$t('WeaponExplain.Water')},
          {value: 3, text: this.$t('WeaponExplain.Ice')},
          {value: 4, text: this.$t('WeaponExplain.Electricity')},
          {value: 5, text: this.$t('WeaponExplain.Dragon')},
          {value: 6, text: this.$t('WeaponExplain.Poison')},
          {value: 7, text: this.$t('WeaponExplain.Hemp')},
          {value: 8, text: this.$t('WeaponExplain.Sleep')},
          {value: 9, text: this.$t('WeaponExplain.Burst')}
        ]
      },
      generalsizeitem () {
        return [
          {value: 0, text: this.$t('WeaponExplain.Nothing')},
          {value: 1, text: this.$t('WeaponExplain.Small')},
          {value: 2, text: this.$t('WeaponExplain.Inside')},
          {value: 3, text: this.$t('WeaponExplain.Big')},
          {value: 4, text: this.$t('WeaponExplain.Verybig')}
        ]
      },
      grooveitem () {
        return [
          {value: 0, text: this.$t('WeaponExplain.NoGroove')},
          {value: 1, text: this.$t('WeaponExplain.OneGroove')},
          {value: 2, text: this.$t('WeaponExplain.TwoGroove')},
          {value: 3, text: this.$t('WeaponExplain.ThreeGroove')}
        ]
      },
      gradeitem () {
        return [
          {value: 0, text: this.$t('WeaponExplain.NoGroove')},
          {value: 1, text: this.$t('WeaponExplain.OneGroovel')},
          {value: 2, text: this.$t('WeaponExplain.TwoGroovel')},
          {value: 3, text: this.$t('WeaponExplain.ThreeGroovel')},
          {value: 4, text: this.$t('WeaponExplain.FourGroovel')}
        ]
      },
      specialattributesitem () {
        if (this.weapon === 'rod.wp_dat') {
          return [
            {value: 0, text: this.$t('WeaponExplain.Cut')},
            {value: 1, text: this.$t('WeaponExplain.Strike')},
            {value: 2, text: this.$t('WeaponExplain.Attribute')},
            {value: 3, text: this.$t('WeaponExplain.Speed')},
            {value: 4, text: this.$t('WeaponExplain.Endurance')},
            {value: 5, text: this.$t('WeaponExplain.Restores')}
          ]
        } else if (this.weapon === 'c_axe.wp_dat') {
          return [
            {value: 0, text: this.$t('WeaponExplain.Strong_exocet_bottle')},
            {value: 1, text: this.$t('WeaponExplain.Strong_attribute_bottle')}
          ]
        } else if (this.weapon === 'g_lance.wp_dat') {
          return [
            {value: 0, text: this.$t('WeaponExplain.Normal_type') + ' LV1'},
            {value: 1, text: this.$t('WeaponExplain.Normal_type') + ' LV2'},
            {value: 2, text: this.$t('WeaponExplain.Normal_type') + ' LV3'},
            {value: 3, text: this.$t('WeaponExplain.Normal_type') + ' LV4'},
            {value: 4, text: this.$t('WeaponExplain.Normal_type') + ' LV5'},
            {value: 5, text: this.$t('WeaponExplain.Diffusion_type') + ' LV1'},
            {value: 6, text: this.$t('WeaponExplain.Diffusion_type') + ' LV2'},
            {value: 7, text: this.$t('WeaponExplain.Diffusion_type') + ' LV3'},
            {value: 8, text: this.$t('WeaponExplain.Diffusion_type') + ' LV4'},
            {value: 9, text: this.$t('WeaponExplain.Diffusion_type') + ' LV5'},
            {value: 10, text: this.$t('WeaponExplain.Radiological_type') + ' LV1'},
            {value: 11, text: this.$t('WeaponExplain.Radiological_type') + ' LV2'},
            {value: 12, text: this.$t('WeaponExplain.Radiological_type') + ' LV3'},
            {value: 13, text: this.$t('WeaponExplain.Radiological_type') + ' LV4'},
            {value: 14, text: this.$t('WeaponExplain.Radiological_type') + ' LV5'}
          ]
        } else if (this.weapon === 'whistle.wp_dat') {
          return []
        } else if (this.weapon === 'w_sword.wp_dat') {
          return []
        } else if (this.weapon === 's_axe.wp_dat') {
          let saxebottle = []
          saxebottle.push({value: 0, text: this.$t('WeaponExplain.Strong_exocet_bottle')})
          saxebottle.push({value: 1, text: this.$t('WeaponExplain.Strong_attribute_bottle')})
          for (let i = 2; i <= 41; i++) {
            if (i < 10) {
              saxebottle.push({value: i, text: this.$t('WeaponExplain.Extinguish_dragon') + '(' + ((i - 1) * 6) * 10 + ')'})
            } else if (i < 12 && i >= 10) {
              saxebottle.push({value: i, text: this.$t('WeaponExplain.Extinguish_dragon') + '(' + (52 + ((i - 10) * 6)) * 10 + ')'})
            } else if (i < 22 && i >= 12) {
              saxebottle.push({value: i, text: this.$t('WeaponExplain.Reduce_breath') + '(' + (6 + ((i - 11) * 3)) * 10 + ')'})
            } else if (i < 32 && i >= 22) {
              saxebottle.push({value: i, text: this.$t('WeaponExplain.Hemp') + '(' + (12 + ((i - 21) * 3)) * 10 + ')'})
            } else if (i < 40 && i >= 22) {
              saxebottle.push({value: i, text: this.$t('WeaponExplain.Poison') + '(' + ((i - 31) * 6) * 10 + ')'})
            } else if (i < 42 && i >= 40) {
              saxebottle.push({value: i, text: this.$t('WeaponExplain.Poison') + '(' + (52 + ((i - 40) * 6)) * 10 + ')'})
            }
          }
          return saxebottle
        } else {
          return [
            {value: 0, text: this.$t('WeaponExplain.Nothing')}
          ]
        }
      },
      skillitem () {
        let skill = []
        for (let i = 0; i < 214; i++) {
          if (this.$te('Skill.' + i)) {
            skill.push(
              {
                text: this.$t('Skill.' + i),
                value: i
              }
            )
          }
        }
        return skill
      },
    },
    methods: {
      str_pad (hex, digits = 8) {
        var zero = new Array(digits + 1).join('0')
        var tmp = digits - hex.length
        return zero.substr(0, tmp) + hex.toLocaleUpperCase()
      },
      save (val) {
        if (val.vul.length === 0) {
          val.vul = 0
        }
        let data = this.str_pad(Number(val.vul).toString(16), Math.ceil(Number(val.vul).toString(16).length / 2) * 2)
        for (let i = 0; i < val.hexL; i++) {
          let setvul
          if (val.hexL - i <= (data.length / 2)) {
            setvul = parseInt(data.substr(-2 - (val.hexL - (i * 2)), 2), 16)
          } else {
            setvul = '00'
          }
          this.$store.dispatch('editdata', {
            address: val.hex - i,
            value: setvul
          })
        }
      },
      input_interchangeable (val) {
        let valsave
        if (val.vul === '') {
          val.vul = 0
        }
        valsave = val
        this.save(valsave)
      },
      Select_interchangeable (val) {
        let valsave
        if (val.vul === '') {
          val.vul = 0
        }
        valsave = val
        valsave.vul = valsave.vul.value
        this.save(valsave)
      },
      weapon_damage (file) {
        let weapondamage = 0
        switch (file) {
          case 'l_sword.wp_dat':
            weapondamage = 4.8
            break
          case 'sword.wp_dat':
            weapondamage = 1.4
            break
          case 'hammer.wp_dat':
            weapondamage = 5.2
            break
          case 'lance.wp_dat':
            weapondamage = 2.3
            break
          case 's_axe.wp_dat':
            weapondamage = 3.5
            break
          case 'rod.wp_dat':
            weapondamage = 3.1
            break
          case 'lbg.wp_dat_g':
            weapondamage = 1.3
            break
          case 'tachi.wp_dat':
            weapondamage = 3.3
            break
          case 'w_sword.wp_dat':
            weapondamage = 1.4
            break
          case 'whistle.wp_dat':
            weapondamage = 4.2
            break
          case 'g_lance.wp_dat':
            weapondamage = 2.3
            break
          case 'c_axe.wp_dat':
            weapondamage = 3.6
            break
          case 'bow.wp_dat_g':
            weapondamage = 1.2
            break
          case 'hbg.wp_dat_g':
            weapondamage = 1.5
            break
          default:
            weapondamage = 1
        }
        return weapondamage
      },
      Defense_treatment (val) {
        let valsave
        if (val.vul === '') {
          val.vul = 0
        }
        valsave = val
        valsave.vul = Math.ceil(valsave.vul)
        this.save(valsave)
      },
      Heart_treatment (val) {
        let valsave
        if (val.vul === '') {
          val.vul = 0
        }
        valsave = val
        if (Math.abs(Number(valsave.vul)) > 100) {
          valsave.vul = Number(valsave.vul) >= 0 ? 100 : -100
        }
        valsave.vul = Number(valsave.vul) >= 0 ? Number(valsave.vul) : 256 - Math.abs(Number(valsave.vul))
        this.save(valsave)
        valsave.vul = this.wpheart(valsave).vul // 回显有问题，好像还原处理就好了，不影响save时数据，不知道啥原因喵″
      },
      Attribute_treatment (val) {
        let valsave
        if (val.vul === '') {
          val.vul = 0
        }
        valsave = val
        valsave.vul = Math.ceil(val.vul / 10)
        this.save(valsave)
        valsave.vul = Math.ceil(val.vul * 10) // 同上喵″
      },
      Damage_treatment (val) {
        let valsave
        if (val.vul === '') {
          val.vul = 0
        }
        valsave = val
        valsave.vul = Math.ceil(val.vul / this.weapon_damage(this.weapon))
        this.save(valsave)
        valsave.vul = Math.ceil(val.vul * this.weapon_damage(this.weapon)) // 同上喵″
      },
    }
  }
</script>
