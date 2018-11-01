<template>
  <div id="wrapper">
    <main>
      <v-app id="inspire">
        <v-autocomplete
          v-model="search"
          :items="filteritem"
          item-text="wp_Name"
          persistent-hint
          prepend-icon="search"
          :no-data-text="$t('Interface.No_data')"
        >
          <v-slide-x-reverse-transition
            slot="append-outer"
            mode="out-in"
          >
          <v-icon
            @click="search = null"
          >clear</v-icon>
          </v-slide-x-reverse-transition>
        </v-autocomplete>
        <v-container fluid grid-list-md>
          <v-data-iterator
            :items="filteritem"
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
            content-tag="v-layout"
            row
            wrap
            :search="search"
          >
            <v-flex
              slot="item"
              slot-scope="props"
              xs12
              sm6
              md6
              lg6
            >
              <v-card>
                <v-card-title>
                  <h4>{{ props.item.wp_Name }}</h4><v-spacer></v-spacer>
                  <h5>{{ $t('WeaponExplain.Address') }}：<span class="red--text">{{ str_pad(props.item.wp_Hex) }}</span></h5>
                </v-card-title>
                <v-divider></v-divider>
                <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-list two-line>
                  <v-list-tile v-if="props.item.wp_Number !== false">
                    <v-text-field
                      :label="$t('WeaponExplain.Sequence_number')"
                      v-model="props.item.wp_Number.vul"
                      full-width
                      box
                      disabled
                    ></v-text-field>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Money !== false">
                    <v-text-field
                      :label="$t('WeaponExplain.Manufacturing_costs')"
                      @change="input_interchangeable(props.item.wp_Money)"
                      v-model="props.item.wp_Money.vul"
                      full-width
                      box
                      disabled
                    ></v-text-field>
                    <v-text-field
                      v-if="sourceitems && (props.item.wp_Money.vul !== props.item.wp_sourcedata.wp_Money.vul)"
                      :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Manufacturing_costs')"
                      v-model="props.item.wp_sourcedata.wp_Money.vul"
                      full-width
                      box
                      color="red"
                      disabled
                    ></v-text-field>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Rarity !== false">
                    <v-select
                      v-model="props.item.wp_Rarity.vul"
                      :items="rankitem"
                      @change="Select_interchangeable(props.item.wp_Rarity)"
                      box
                      :label="$t('WeaponExplain.Production_expenses')"
                      item-text="text"
                      item-value="value"
                      return-object
                    ></v-select>
                    <v-text-field
                      v-if="sourceitems && (props.item.wp_Rarity.vul !== props.item.wp_sourcedata.wp_Rarity.vul)"
                      :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Production_expenses')"
                      :value="'Rank' + Number(props.item.wp_sourcedata.wp_Rarity.vul + 1)"
                      full-width
                      box
                      color="red"
                      disabled
                    ></v-text-field>
                  </v-list-tile>
                  <!-- 新斩味 -->
                  <v-list-tile v-if="props.item.wp_Chopping_value !== false">
                    <v-menu
                      v-model="props.menu"
                      :close-on-content-click="false"
                      :nudge-width="300"
                      offset-x
                    >
                      <v-btn
                        slot="activator"
                        color="indigo"
                        dark
                      >
                        {{$t('WeaponExplain.Chopping_grade')}}
                      </v-btn>

                      <v-card>
                        <v-list>
                          <v-list-tile avatar justify-space-around>
                            <v-layout justify-space-around>
                            <v-list-tile-avatar>
                                <v-btn small @click="props.item.wp_Chopping_value.vul = 33,props.item.wp_Chopping_grade.vul = 8">{{$t('WeaponExplain.Chopping_grade_quick1')}}</v-btn>
                            </v-list-tile-avatar>
                            <v-list-tile-avatar>
                                <v-btn small @click="props.item.wp_Chopping_value.vul = 38,props.item.wp_Chopping_grade.vul = 8">{{$t('WeaponExplain.Chopping_grade_quick2')}}</v-btn>
                            </v-list-tile-avatar>
                            <v-list-tile-avatar>
                                <v-btn small @click="props.item.wp_Chopping_value.vul = 39,props.item.wp_Chopping_grade.vul = 8">{{$t('WeaponExplain.Chopping_grade_quick3')}}</v-btn>
                            </v-list-tile-avatar>
                            </v-layout>
                          </v-list-tile>
                        </v-list>
                        <v-divider></v-divider>
                        <v-list>
                          <v-list-tile>
                            <v-list-tile-title>
                            <v-layout row wrap>
                              <v-flex xs3>
                                {{$t('WeaponExplain.Chopping_value')}}
                              </v-flex>
                              <v-flex xs9>
                                <v-slider
                                  full-width
                                  @change="input_interchangeable(props.item.wp_Chopping_value)"
                                  v-model="props.item.wp_Chopping_value.vul"
                                  max=118
                                ></v-slider>
                              </v-flex>
                            </v-layout>
                            </v-list-tile-title>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-title>
                            <v-layout row wrap>
                              <v-flex xs3>
                                {{$t('WeaponExplain.Chopping_grade')}}
                              </v-flex>
                              <v-flex xs9>
                                <v-slider
                                  full-width
                                  @change="input_interchangeable(props.item.wp_Chopping_grade)"
                                  v-model="props.item.wp_Chopping_grade.vul"
                                  max=8
                                  ticks="always"
                                  tick-size="2"
                                ></v-slider>
                              </v-flex>
                            </v-layout>
                            </v-list-tile-title>
                          </v-list-tile>
                        </v-list>
                      </v-card>
                    </v-menu>
                  </v-list-tile>
                  <!-- 暂时关闭
                  <v-list-tile v-if="props.item.wp_Chopping_value !== false">
                    <v-list-tile-content>{{ $t('WeaponExplain.Chopping_value') }}:</v-list-tile-content>
                    <v-list-tile-content class="align-end">
                        <v-slider
                          v-model="props.item.wp_Chopping_value.vul"
                          max=118
                          readonly
                        ></v-slider>
                        {{ props.item.wp_Chopping_value.vul }}
                        <Contrast v-if="sourceitems" class="red--text">{{ props.item.wp_Chopping_value.vul !== props.item.wp_sourcedata.wp_Chopping_value.vul ? '(' + props.item.wp_sourcedata.wp_Chopping_value.vul + ')' : ''}}</Contrast>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Chopping_grade !== false">
                    <v-list-tile-content>{{ $t('WeaponExplain.Chopping_grade') }}:</v-list-tile-content>
                    <v-list-tile-content class="align-end">
                        <v-slider
                          v-model="props.item.wp_Chopping_grade.vul"
                          max=8
                          ticks="always"
                          tick-size="2"
                          readonly
                        ></v-slider>
                        {{ props.item.wp_Chopping_grade.vul }}
                        <Contrast v-if="sourceitems" class="red--text">{{ props.item.wp_Chopping_grade.vul !== props.item.wp_sourcedata.wp_Chopping_grade.vul ? '(' + props.item.wp_sourcedata.wp_Chopping_grade.vul + ')' : ''}}</Contrast>
                    </v-list-tile-content>
                  </v-list-tile>
                  -->
                  <v-list-tile v-if="props.item.wp_Damage_value !== false">
                    <v-text-field
                      :label="$t('WeaponExplain.Damage')"
                      @change="Damage_treatment(props.item.wp_Damage_value)"
                      v-model="props.item.wp_Damage_value.vul"
                      full-width
                      box
                    ></v-text-field>
                    <v-text-field
                      v-if="sourceitems && (props.item.wp_Damage_value.vul !== props.item.wp_sourcedata.wp_Damage_value.vul)"
                      :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Damage')"
                      v-model="props.item.wp_sourcedata.wp_Damage_value.vul"
                      full-width
                      box
                      color="red"
                      disabled
                    ></v-text-field>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Defense_value !== false">
                    <v-text-field
                      :label="$t('WeaponExplain.Defense')"
                      @change="Defense_treatment(props.item.wp_Defense_value)"
                      v-model="props.item.wp_Defense_value.vul"
                      full-width
                      box
                    ></v-text-field>
                    <v-text-field
                      v-if="sourceitems && (props.item.wp_Defense_value.vul !== props.item.wp_sourcedata.wp_Defense_value.vul)"
                      :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Defense')"
                      v-model="props.item.wp_sourcedata.wp_Defense_value.vul"
                      full-width
                      box
                      color="red"
                      disabled
                    ></v-text-field>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Heart_value !== false">
                    <v-text-field
                      :label="$t('WeaponExplain.Heart')"
                      suffix="%"
                      @change="Heart_treatment(props.item.wp_Heart_value)"
                      v-model="props.item.wp_Heart_value.vul"
                      full-width
                      box
                    ></v-text-field>
                    <v-text-field
                      v-if="sourceitems && (props.item.wp_Heart_value.vul !== props.item.wp_sourcedata.wp_Heart_value.vul)"
                      :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Heart')"
                      suffix="%"
                      v-model="props.item.wp_sourcedata.wp_Heart_value.vul"
                      full-width
                      box
                      color="red"
                      disabled
                    ></v-text-field>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Visible_attributes !== false">
                    <v-select
                      v-model="props.item.wp_Visible_attributes.vul"
                      :items="attributeitem"
                      @change="Select_interchangeable(props.item.wp_Visible_attributes)"
                      box
                      :label="$t('WeaponExplain.Visible_attributes')"
                      item-text="text"
                      item-value="value"
                      return-object
                    ></v-select>
                    <v-text-field
                      v-if="sourceitems && (props.item.wp_Visible_attributes.vul !== props.item.wp_sourcedata.wp_Visible_attributes.vul)"
                      :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Visible_attributes')"
                      :value="attribute(props.item.wp_sourcedata.wp_Visible_attributes.vul)"
                      full-width
                      box
                      color="red"
                      disabled
                    ></v-text-field>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Visible_attribute_values !== false">
                    <v-text-field
                      :label="$t('WeaponExplain.Visible_attribute_values')"
                      @change="Attribute_treatment(props.item.wp_Visible_attribute_values)"
                      v-model="props.item.wp_Visible_attribute_values.vul"
                      full-width
                      box
                    ></v-text-field>
                    <v-text-field
                      v-if="sourceitems && (props.item.wp_Visible_attribute_values.vul !== props.item.wp_sourcedata.wp_Visible_attribute_values.vul)"
                      :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Visible_attribute_values')"
                      v-model="props.item.wp_sourcedata.wp_Visible_attribute_values.vul"
                      full-width
                      box
                      color="red"
                      disabled
                    ></v-text-field>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Hidden_attribute !== false">
                    <v-select
                      v-model="props.item.wp_Hidden_attribute.vul"
                      :items="attributeitem"
                      @change="Select_interchangeable(props.item.wp_Hidden_attribute)"
                      box
                      :label="$t('WeaponExplain.Hidden_attributes')"
                      item-text="text"
                      item-value="value"
                      return-object
                    ></v-select>
                    <v-text-field
                      v-if="sourceitems && (props.item.wp_Hidden_attribute.vul !== props.item.wp_sourcedata.wp_Hidden_attribute.vul)"
                      :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Hidden_attributes')"
                      :value="attribute(props.item.wp_sourcedata.wp_Hidden_attribute.vul)"
                      full-width
                      box
                      color="red"
                      disabled
                    ></v-text-field>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Hidden_attribute_values !== false">
                    <v-text-field
                      :label="$t('WeaponExplain.Hidden_attribute_values')"
                      @change="Attribute_treatment(props.item.wp_Hidden_attribute_values)"
                      v-model="props.item.wp_Hidden_attribute_values.vul"
                      full-width
                      box
                    ></v-text-field>
                    <v-text-field
                      v-if="sourceitems && (props.item.wp_Hidden_attribute_values.vul !== props.item.wp_sourcedata.wp_Hidden_attribute_values.vul)"
                      :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Hidden_attribute_values')"
                      v-model="props.item.wp_sourcedata.wp_Hidden_attribute_values.vul"
                      full-width
                      box
                      color="red"
                      disabled
                    ></v-text-field>
                  </v-list-tile>
                  </v-list>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-list two-line>
                  <v-list-tile v-if="props.item.wp_Cartridge_matching !== false">
                    <v-text-field
                      :label="$t('WeaponExplain.Match_projectile')"
                      @change="input_interchangeable(props.item.wp_Cartridge_matching)"
                      v-model="props.item.wp_Cartridge_matching.vul"
                      full-width
                      box
                    ></v-text-field>
                    <v-text-field
                      v-if="sourceitems && (props.item.wp_Cartridge_matching.vul !== props.item.wp_sourcedata.wp_Cartridge_matching.vul)"
                      :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Match_projectile')"
                      v-model="props.item.wp_sourcedata.wp_Cartridge_matching.vul"
                      full-width
                      box
                      color="red"
                      disabled
                    ></v-text-field>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Offset_size !== false">
                    <v-select
                      v-model="props.item.wp_Offset_size.vul"
                      :items="generalsizeitem"
                      @change="Select_interchangeable(props.item.wp_Offset_size)"
                      box
                      :label="$t('WeaponExplain.Ballistic_offset')"
                      item-text="text"
                      item-value="value"
                      return-object
                    ></v-select>
                    <v-text-field
                      v-if="sourceitems && (props.item.wp_Offset_size.vul !== props.item.wp_sourcedata.wp_Offset_size.vul)"
                      :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Ballistic_offset')"
                      :value="generalsize(props.item.wp_sourcedata.wp_Offset_size.vul)"
                      full-width
                      box
                      color="red"
                      disabled
                    ></v-text-field>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Seal_Dragon !== false">
                    <v-select
                      v-model="props.item.wp_Seal_Dragon.vul"
                      :items="generalsizeitem"
                      @change="Select_interchangeable(props.item.wp_Seal_Dragon)"
                      box
                      :label="$t('WeaponExplain.Seal_Dragon')"
                      item-text="text"
                      item-value="value"
                      return-object
                    ></v-select>
                    <v-text-field
                      v-if="sourceitems && (props.item.wp_Seal_Dragon.vul !== props.item.wp_sourcedata.wp_Seal_Dragon.vul)"
                      :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Seal_Dragon')"
                      :value="generalsize(props.item.wp_sourcedata.wp_Seal_Dragon.vul)"
                      full-width
                      box
                      color="red"
                      disabled
                    ></v-text-field>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Slot_grade_Number !== false">
                    <v-select
                      v-model="props.item.wp_Slot_grade_Number.vul"
                      :items="grooveitem"
                      @change="Select_interchangeable(props.item.wp_Slot_grade_Number)"
                      box
                      :label="$t('WeaponExplain.Slot_grade_Number')"
                      item-text="text"
                      item-value="value"
                      return-object
                    ></v-select>
                    <v-text-field
                      v-if="sourceitems && (props.item.wp_Slot_grade_Number.vul !== props.item.wp_sourcedata.wp_Slot_grade_Number.vul)"
                      :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Slot_grade_Number')"
                      :value="groove(props.item.wp_sourcedata.wp_Slot_grade_Number.vul)"
                      full-width
                      box
                      color="red"
                      disabled
                    ></v-text-field>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Slot_grade_1 !== false">
                    <v-select
                      v-model="props.item.wp_Slot_grade_1.vul"
                      :items="gradeitem"
                      @change="Select_interchangeable(props.item.wp_Slot_grade_1)"
                      box
                      :label="$t('WeaponExplain.Slot_grade_Number1')"
                      item-text="text"
                      item-value="value"
                      return-object
                    ></v-select>
                    <v-text-field
                      v-if="sourceitems && (props.item.wp_Slot_grade_1.vul !== props.item.wp_sourcedata.wp_Slot_grade_1.vul)"
                      :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Slot_grade_Number1')"
                      :value="grade(props.item.wp_sourcedata.wp_Slot_grade_1.vul)"
                      full-width
                      box
                      color="red"
                      disabled
                    ></v-text-field>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Slot_grade_2 !== false">
                    <v-select
                      v-model="props.item.wp_Slot_grade_2.vul"
                      :items="gradeitem"
                      @change="Select_interchangeable(props.item.wp_Slot_grade_2)"
                      box
                      :label="$t('WeaponExplain.Slot_grade_Number2')"
                      item-text="text"
                      item-value="value"
                      return-object
                    ></v-select>
                    <v-text-field
                      v-if="sourceitems && (props.item.wp_Slot_grade_2.vul !== props.item.wp_sourcedata.wp_Slot_grade_2.vul)"
                      :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Slot_grade_Number2')"
                      :value="grade(props.item.wp_sourcedata.wp_Slot_grade_2.vul)"
                      full-width
                      box
                      color="red"
                      disabled
                    ></v-text-field>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Slot_grade_3 !== false">
                    <v-select
                      v-model="props.item.wp_Slot_grade_3.vul"
                      :items="gradeitem"
                      @change="Select_interchangeable(props.item.wp_Slot_grade_3)"
                      box
                      :label="$t('WeaponExplain.Slot_grade_Number3')"
                      item-text="text"
                      item-value="value"
                      return-object
                    ></v-select>
                    <v-text-field
                      v-if="sourceitems && (props.item.wp_Slot_grade_3.vul !== props.item.wp_sourcedata.wp_Slot_grade_3.vul)"
                      :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Slot_grade_Number3')"
                      :value="grade(props.item.wp_sourcedata.wp_Slot_grade_3.vul)"
                      full-width
                      box
                      color="red"
                      disabled
                    ></v-text-field>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Special_attributes !== false">
                    <v-text-field
                      :label="$t('WeaponExplain.Special_attributes')"
                      @change="input_interchangeable(props.item.wp_Special_attributes)"
                      v-model="props.item.wp_Special_attributes.vul"
                      full-width
                      box
                    ></v-text-field>
                    <v-text-field
                      v-if="sourceitems && (props.item.wp_Special_attributes.vul !== props.item.wp_sourcedata.wp_Special_attributes.vul)"
                      :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Special_attributes')"
                      v-model="props.item.wp_sourcedata.wp_Special_attributes.vul"
                      full-width
                      box
                      color="red"
                      disabled
                    ></v-text-field>
                  </v-list-tile>
                  <!-- model -->
                  <v-list-tile v-if="props.item.wp_Unprefixed_Model.vul !== 65535">
                    <v-text-field
                      :label="$t('WeaponExplain.Independent_model')"
                      @change="input_interchangeable(props.item.wp_Unprefixed_Model)"
                      v-model="props.item.wp_Unprefixed_Model.vul"
                      full-width
                      box
                    ></v-text-field>
                    <v-text-field
                      v-if="sourceitems && (props.item.wp_Unprefixed_Model.vul !== props.item.wp_sourcedata.wp_Unprefixed_Model.vul)"
                      :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Independent_model')"
                      v-model="props.item.wp_sourcedata.wp_Unprefixed_Model.vul"
                      full-width
                      box
                      color="red"
                      disabled
                    ></v-text-field>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Model.vul !== 65535">
                    <v-text-field
                      :label="$t('WeaponExplain.Weapon_model')"
                      @change="input_interchangeable(props.item.wp_Model)"
                      v-model="props.item.wp_Model.vul"
                      full-width
                      box
                    ></v-text-field>
                    <v-text-field
                      v-if="sourceitems && (props.item.wp_Model.vul !== props.item.wp_sourcedata.wp_Model.vul)"
                      :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Weapon_model')"
                      v-model="props.item.wp_sourcedata.wp_Model.vul"
                      full-width
                      box
                      color="red"
                      disabled
                    ></v-text-field>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Minor_Model.vul !== 65535">
                    <v-text-field
                      :label="$t('WeaponExplain.Weapon_secondary_model')"
                      @change="input_interchangeable(props.item.wp_Minor_Model)"
                      v-model="props.item.wp_Minor_Model.vul"
                      full-width
                      box
                    ></v-text-field>
                    <v-text-field
                      v-if="sourceitems && (props.item.wp_Minor_Model.vul !== props.item.wp_sourcedata.wp_Minor_Model.vul)"
                      :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Weapon_secondary_model')"
                      v-model="props.item.wp_sourcedata.wp_Minor_Model.vul"
                      full-width
                      box
                      color="red"
                      disabled
                    ></v-text-field>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Weapon_skills !== false">
                    <v-text-field
                      :label="$t('WeaponExplain.Weapon_skills')"
                      @change="input_interchangeable(props.item.wp_Weapon_skills)"
                      v-model="props.item.wp_Weapon_skills.vul"
                      full-width
                      box
                    ></v-text-field>
                    <v-text-field
                      v-if="sourceitems && (props.item.wp_Weapon_skills.vul !== props.item.wp_sourcedata.wp_Weapon_skills.vul)"
                      :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Weapon_skills')"
                      v-model="props.item.wp_sourcedata.wp_Weapon_skills.vul"
                      full-width
                      box
                      color="red"
                      disabled
                    ></v-text-field>
                  </v-list-tile>
                  </v-list>
                </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-data-iterator>
        </v-container>
      </v-app>
    </main>
  </div>
</template>

<script>
export default {
  name: 'wpfile',
  data: () => ({
    rowsPerPageItems: [2, 4],
    pagination: {
      rowsPerPage: 2
    },
    search: null,
    items: [
      {
        wp_Name: '',
        wp_Number: 0,
        wp_Money: 0,
        wp_Rarity: 0,
        wp_Chopping_value: false,
        wp_Chopping_grade: false,
        wp_Damage_value: 0,
        wp_Defense_value: 0,
        wp_Heart_value: 0,
        wp_Visible_attributes: false,
        wp_Visible_attribute_values: false,
        wp_Hidden_attribute: false,
        wp_Hidden_attribute_values: false,
        wp_Cartridge_matching: false,
        wp_Offset_size: false,
        wp_Seal_Dragon: false,
        wp_Slot_grade_Number: 0,
        wp_Slot_grade_1: 0,
        wp_Slot_grade_2: 0,
        wp_Slot_grade_3: 0,
        wp_Special_attributes: false,
        wp_Weapon_skills: 0
      }
    ],
    sourceitems: false
  }),
  computed: {
    getfile () {
      return this.$store.getters.donefile
    },
    data () {
      return this.$store.getters.donefiledata
    },
    sourcedata () {
      return this.$store.getters.donefilesourcedata
    },
    weapon () {
      return this.$store.getters.donefilename
    },
    excludeunknown () {
      return this.$store.getters.doneexcludeunknown
    },
    filteritem () {
      let _items = this.items
      if (this.excludeunknown) {
        let itemsarr = []
        for (let i = 0, l = _items.length; i < l; i++) {
          if (this.wpname(_items[i].wp_Number.vul) !== this.$t('WeaponExplain.Unknown') && this.wpname(_items[i].wp_Number.vul) !== 'Unknown') {
            itemsarr.push(_items[i])
          }
        }
        return itemsarr
      } else {
        return _items
      }
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
        {value: 3, text: this.$t('WeaponExplain.Big')}
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
        {value: 3, text: this.$t('WeaponExplain.ThreeGroovel')}
      ]
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
        {value: 7, text: 'Rank8'}
      ]
    }
  },
  watch: {
    data: function () {
      this.items = this.hexdata(this.data)
    },
    sourcedata: function () {
      if (this.sourcedata) {
        this.sourceitems = this.hexdata(this.sourcedata)
        this.items = this.hexdata(this.data)
      } else {
        this.sourceitems = false
      }
    }
  },
  mounted () {
    if (this.sourcedata) {
      this.sourceitems = this.hexdata(this.sourcedata)
    }
    this.items = this.hexdata(this.data)
  },
  methods: {
    str_pad (hex, digits = 8) {
      var zero = new Array(digits + 1).join('0')
      var tmp = digits - hex.length
      return zero.substr(0, tmp) + hex.toLocaleUpperCase()
    },
    save (val) {
      let data = this.str_pad(val.vul.toString(16), Math.ceil(val.vul.toString(16).length / 2) * 2)
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
    Heart_treatment (val) {
      let valsave = val
      if (Math.abs(Number(valsave.vul)) > 100) {
        valsave.vul = Number(valsave.vul) >= 0 ? 100 : -100
      }
      valsave.vul = Number(valsave.vul) >= 0 ? Number(valsave.vul) : 256 - Math.abs(Math.abs(Number(valsave.vul)) + 256)
      this.save(valsave)
    },
    Attribute_treatment (val) {
      let valsave = val
      valsave.vul = Math.ceil(val.vul / 10)
      this.save(valsave)
      valsave.vul = Math.ceil(val.vul * 10) // 回显有问题，好像还原处理就好了，不影响save时数据，不知道啥原因喵″
    },
    Damage_treatment (val) {
      let valsave = val
      valsave.vul = Math.ceil(val.vul / this.weapon_damage(this.weapon))
      this.save(valsave)
      valsave.vul = Math.ceil(val.vul * this.weapon_damage(this.weapon)) // 同上喵″
    },
    input_interchangeable (val) {
      let valsave = val
      this.save(valsave)
    },
    Select_interchangeable (val) {
      let valsave = val
      valsave.vul = valsave.vul.value
      this.save(valsave)
    },
    Defense_treatment (val) {
      let valsave = val
      valsave.vul = Math.ceil(valsave.vul)
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
    attribute (attribute) {
      let attributetext = this.$t('WeaponExplain.Nothing')
      switch (attribute) {
        case 0:
          attributetext = this.$t('WeaponExplain.Nothing')
          break
        case 1:
          attributetext = this.$t('WeaponExplain.Fire')
          break
        case 2:
          attributetext = this.$t('WeaponExplain.Water')
          break
        case 3:
          attributetext = this.$t('WeaponExplain.Ice')
          break
        case 4:
          attributetext = this.$t('WeaponExplain.Electricity')
          break
        case 5:
          attributetext = this.$t('WeaponExplain.Dragon')
          break
        case 6:
          attributetext = this.$t('WeaponExplain.Poison')
          break
        case 7:
          attributetext = this.$t('WeaponExplain.Hemp')
          break
        case 8:
          attributetext = this.$t('WeaponExplain.Sleep')
          break
        default:
          attributetext = this.$t('WeaponExplain.Burst')
      }
      return attributetext
    },
    groove (groove) {
      let groovetext = this.$t('WeaponExplain.NoGroove')
      switch (groove) {
        case 0:
          groovetext = this.$t('WeaponExplain.NoGroove')
          break
        case 1:
          groovetext = this.$t('WeaponExplain.OneGroove')
          break
        case 2:
          groovetext = this.$t('WeaponExplain.TwoGroove')
          break
        case 3:
          groovetext = this.$t('WeaponExplain.ThreeGroove')
          break
        default:
          groovetext = this.$t('WeaponExplain.Error')
      }
      return groovetext
    },
    grade (grade) {
      let gradetext = this.$t('WeaponExplain.NoGroove')
      switch (grade) {
        case 0:
          gradetext = this.$t('WeaponExplain.NoGroove')
          break
        case 1:
          gradetext = this.$t('WeaponExplain.OneGroovel')
          break
        case 2:
          gradetext = this.$t('WeaponExplain.TwoGroovel')
          break
        case 3:
          gradetext = this.$t('WeaponExplain.ThreeGroovel')
          break
        default:
          gradetext = this.$t('WeaponExplain.Error')
      }
      return gradetext
    },
    generalsize (generalsize) {
      let generalsizetext = this.$t('WeaponExplain.Nothing')
      switch (generalsize) {
        case 0:
          generalsizetext = this.$t('WeaponExplain.Nothing')
          break
        case 1:
          generalsizetext = this.$t('WeaponExplain.Small')
          break
        case 2:
          generalsizetext = this.$t('WeaponExplain.Inside')
          break
        case 3:
          generalsizetext = this.$t('WeaponExplain.Big')
          break
        default:
          generalsizetext = this.$t('WeaponExplain.Error')
      }
      return generalsizetext
    },
    HexFunction (data, Hexpointer, HexRuler, i) {
      let ret = ''
      if (Hexpointer === undefined) {
        return false
      }
      for (let p = 0; p < Hexpointer[1]; p++) {
        let Hex16 = data[(HexRuler * i) + Hexpointer[0] - p]
        if (Hex16 !== undefined) {
          ret += Hex16.toString(16)
        } else {
          ret = 0
        }
      }
      return {vul: parseInt(ret, 16), hex: (HexRuler * i) + Hexpointer[0], hexL: Hexpointer[1]}
    },
    wpname (id) {
      let wpnamelist
      if (this.weapon) {
        wpnamelist = require('./Weaponinfo/' + this.weapon + '.json')
      } else {
        return this.$t('WeaponExplain.Unknown')
      }
      let namedata = wpnamelist.Data
      for (let i = 0; i < namedata.length; i++) {
        if (namedata[i].Weapon_Number === id) {
          return namedata[i].name
        }
      }
      return this.$t('WeaponExplain.Unknown')
    },
    wpdefense (HexFunction) {
      HexFunction.vul = Math.ceil(HexFunction.vul)
      return HexFunction
    },
    wpheart (HexFunction) {
      HexFunction.vul = HexFunction.vul <= 100 ? HexFunction.vul : '-' + (256 - HexFunction.vul)
      return HexFunction
    },
    wpattribute (HexFunction) {
      HexFunction.vul = HexFunction.vul * 10
      return HexFunction
    },
    wpdamage (HexFunction) {
      HexFunction.vul = Math.ceil(HexFunction.vul * this.weapon_damage(this.weapon))
      return HexFunction
    },
    hexdata (data, setsourcedata = false) {
      let _this = this
      let HexRuler
      let HexPointer
      if (data[7] === 0 && data[71] === 1 && data[136] === 2) {
        HexRuler = 16 * 4 + 1 // 近程武器
        HexPointer = {
          'wp_Number': [6, 1], // 6
          'wp_Unprefixed_Model': [13, 2], // 12~13
          'wp_Model': [15, 2], // 14~15
          'wp_Minor_Model': [17, 2], // 16~17
          'wp_Money': [24, 4], // 21~24
          'wp_Rarity': [25, 1], // 25
          'wp_Chopping_value': [26, 1], // 26
          'wp_Chopping_grade': [27, 1], // 27
          'wp_Damage_value': [29, 2], // 28~29
          'wp_Defense_value': [31, 2], // 30~31
          'wp_Heart_value': [32, 1], // 32
          'wp_Visible_attributes': [33, 1], // 33
          'wp_Visible_attribute_values': [35, 2], // 34~35
          'wp_Hidden_attribute': [36, 1], // 36
          'wp_Hidden_attribute_values': [38, 2], // 37~38
          'wp_Seal_Dragon': [39, 1], // 39
          'wp_Slot_grade_Number': [40, 1], // 40
          'wp_Slot_grade_1': [41, 1], // 41
          'wp_Slot_grade_2': [42, 1], // 42
          'wp_Slot_grade_3': [43, 1], // 43
          'wp_Special_attributes': [44, 1], // 44
          'wp_Weapon_skills': [(HexRuler + 2), 1] // HexRuler(下一行) + 2
        }
      } else {
        HexRuler = 16 * 4 + 4 // 远程武器
        HexPointer = {
          'wp_Number': [6, 1], // 6
          'wp_Unprefixed_Model': [13, 2], // 12~13
          'wp_Model': [15, 2], // 14~15
          'wp_Minor_Model': [17, 2], // 16~17
          'wp_Money': [28, 4], // 25~28
          'wp_Rarity': [29, 1], // 29
          'wp_Damage_value': [31, 2], // 30~31
          'wp_Defense_value': [33, 2], // 32~33
          'wp_Heart_value': [34, 1], // 34
          'wp_Visible_attributes': [35, 1], // 35
          'wp_Visible_attribute_values': [37, 2], // 36~37
          'wp_Hidden_attribute': [38, 1], // 38
          'wp_Hidden_attribute_values': [40, 2], // 39~40
          'wp_Seal_Dragon': [41, 1], // 41
          'wp_Cartridge_matching': [42, 1], // 42
          'wp_Offset_size': [44, 1], // 44
          'wp_Slot_grade_Number': [45, 1], // 45
          'wp_Slot_grade_1': [46, 1], // 46
          'wp_Slot_grade_2': [47, 1], // 47
          'wp_Slot_grade_3': [48, 1], // 48
          'wp_Weapon_skills': [(HexRuler + 2), 1] // HexRuler(下一行) + 2
        }
      }
      let wplist = []
      for (let l = data.length / HexRuler, i = 0; i < l; i++) {
        wplist[i] = {
          'wp_Hex': (HexRuler * i).toString(16),
          'wp_Unprefixed_Model': _this.HexFunction(data, HexPointer.wp_Unprefixed_Model, HexRuler, i),
          'wp_Model': _this.HexFunction(data, HexPointer.wp_Model, HexRuler, i),
          'wp_Minor_Model': _this.HexFunction(data, HexPointer.wp_Minor_Model, HexRuler, i),
          'wp_Name': _this.wpname(_this.HexFunction(data, HexPointer.wp_Number, HexRuler, i).vul),
          'wp_Number': _this.HexFunction(data, HexPointer.wp_Number, HexRuler, i),
          'wp_Money': _this.HexFunction(data, HexPointer.wp_Money, HexRuler, i),
          'wp_Rarity': _this.HexFunction(data, HexPointer.wp_Rarity, HexRuler, i),
          'wp_Chopping_value': _this.HexFunction(data, HexPointer.wp_Chopping_value, HexRuler, i),
          'wp_Chopping_grade': _this.HexFunction(data, HexPointer.wp_Chopping_grade, HexRuler, i),
          'wp_Damage_value': _this.wpdamage(_this.HexFunction(data, HexPointer.wp_Damage_value, HexRuler, i)),
          'wp_Defense_value': _this.wpdefense(_this.HexFunction(data, HexPointer.wp_Defense_value, HexRuler, i)),
          'wp_Heart_value': _this.wpheart(_this.HexFunction(data, HexPointer.wp_Heart_value, HexRuler, i)),
          'wp_Visible_attributes': _this.HexFunction(data, HexPointer.wp_Visible_attributes, HexRuler, i),
          'wp_Visible_attribute_values': _this.wpattribute(_this.HexFunction(data, HexPointer.wp_Visible_attribute_values, HexRuler, i)),
          'wp_Hidden_attribute': _this.HexFunction(data, HexPointer.wp_Hidden_attribute, HexRuler, i),
          'wp_Hidden_attribute_values': _this.wpattribute(_this.HexFunction(data, HexPointer.wp_Hidden_attribute_values, HexRuler, i)),
          'wp_Cartridge_matching': _this.HexFunction(data, HexPointer.wp_Cartridge_matching, HexRuler, i),
          'wp_Offset_size': _this.HexFunction(data, HexPointer.wp_Offset_size, HexRuler, i),
          'wp_Seal_Dragon': _this.HexFunction(data, HexPointer.wp_Seal_Dragon, HexRuler, i),
          'wp_Slot_grade_Number': _this.HexFunction(data, HexPointer.wp_Slot_grade_Number, HexRuler, i),
          'wp_Slot_grade_1': _this.HexFunction(data, HexPointer.wp_Slot_grade_1, HexRuler, i),
          'wp_Slot_grade_2': _this.HexFunction(data, HexPointer.wp_Slot_grade_2, HexRuler, i),
          'wp_Slot_grade_3': _this.HexFunction(data, HexPointer.wp_Slot_grade_3, HexRuler, i),
          'wp_Special_attributes': _this.HexFunction(data, HexPointer.wp_Special_attributes, HexRuler, i),
          'wp_Weapon_skills': _this.HexFunction(data, HexPointer.wp_Weapon_skills, HexRuler, i)
        }
        if (this.sourceitems) {
          wplist[i].wp_sourcedata = this.sourceitems[i]
        }
      }
      return wplist
    }
  }
}
</script>

