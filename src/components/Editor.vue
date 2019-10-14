<template>
  <v-container fluid>
    <v-data-iterator
      :items="filteritem"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          class="mb-1"
        >
          <v-autocomplete
            v-model="search"
            :items="filteritem"
            :item-text="searchitemtext(filteritem[0])"
            persistent-hint
            clearable
            flat
            solo-inverted
            hide-details
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
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.wp_Number"
            cols="12"
            sm="6"
          >
            <v-card>
              <v-card-title class="subtitle-1">
                <h4 v-if="existence(item.wp_Number)">{{ item.wp_Name }}</h4>
                <h4 v-if="existence(item.eq_Number)">{{ item.wp_Name }}</h4>
                <h4 v-else-if="existence(item.k_Number)">{{ $t('Weaponsmiscellaneous.Sharpness') + item.k_Number.vul }}</h4>
                <h4 v-else-if="existence(item.ws_Number)">{{ $t('Weaponsmiscellaneous.Wswordattribute') + item.ws_Number.vul }}</h4>
                <h4 v-else-if="existence(item.bt_Number)">{{ $t('Weaponsmiscellaneous.Bottle') + item.bt_Number.vul }}</h4>
                <h4 v-else-if="existence(item.sa_Number)">{{ $t('Weaponsmiscellaneous.Saxebottle') + item.sa_Number.vul }}</h4>
                <h4 v-else-if="existence(item.ww_Number)">{{ $t('Weaponsmiscellaneous.Syllable') + item.ww_Number.vul }}</h4>
                <h4 v-else-if="existence(item.gl_Number)">{{ $t('Weaponsmiscellaneous.Bombardment') + item.gl_Number.vul }}</h4>
                <v-spacer></v-spacer>
                <v-card-subtitle>
                  {{ $t('WeaponExplain.Address') }}：<span class="red--text">{{ str_pad(item.wp_Hex) }}</span>
                </v-card-subtitle>
              </v-card-title>

              <v-divider></v-divider>

              <v-layout>
              <v-flex xs12 sm6>
                <v-list two-line>
                <v-list-item v-if="existence(item.wp_Number)">
                  <v-text-field
                    :label="$t('WeaponExplain.Sequence_number')"
                    v-model="item.wp_Number.vul"
                    
                    filled
                    disabled
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.k_Number)">
                  <v-text-field
                    :label="$t('Sharpness.Number')"
                    v-model="item.k_Number.vul"
                    
                    filled
                    disabled
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.ws_Number)">
                  <v-text-field
                    :label="$t('Wswordattribute.Number')"
                    v-model="item.ws_Number.vul"
                    
                    filled
                    disabled
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.bt_Number)">
                  <v-text-field
                    :label="$t('Huntingbottle.Number')"
                    v-model="item.bt_Number.vul"
                    
                    filled
                    disabled
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.sa_Number)">
                  <v-text-field
                    :label="$t('Saxebottle.Number')"
                    v-model="item.sa_Number.vul"
                    
                    filled
                    disabled
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.gl_Number)">
                  <v-text-field
                    :label="$t('Bombardment.Number')"
                    v-model="item.gl_Number.vul"
                    
                    filled
                    disabled
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.ww_Number)">
                  <v-text-field
                    :label="$t('Syllable.Number')"
                    v-model="item.ww_Number.vul"
                    
                    filled
                    disabled
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.eq_Number)">
                  <v-text-field
                    :label="$t('Equipment.Number')"
                    v-model="item.eq_Number.vul"
                    
                    filled
                    disabled
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.eq_Type)">
                  <v-text-field
                    :label="$t('Equipment.Type')"
                    :value="equipmenttype(item.eq_Type.vul)"
                    
                    filled
                    disabled
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.eq_Variant)">
                  <v-text-field
                    :label="$t('Equipment.Variant')"
                    :value="equipmentvariant(item.eq_Variant.vul)"
                    
                    filled
                    disabled
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.eq_Defense)">
                  <v-text-field
                    :label="$t('WeaponExplain.Defense')"
                    @change="input_interchangeable(item.eq_Defense)"
                    v-model="item.eq_Defense.vul"
                    
                    filled
                    readonly
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.eq_Defense.vul !== item.wp_sourcedata.eq_Defense.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Defense')"
                    v-model="item.wp_sourcedata.eq_Defense.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.eq_Rarity)">
                  <v-select
                    v-model="item.eq_Rarity.vul"
                    :items="rankitem"
                    @change="Select_interchangeable(item.eq_Rarity)"
                    filled
                    :label="$t('WeaponExplain.Production_expenses')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.eq_Rarity.vul !== item.wp_sourcedata.eq_Rarity.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Production_expenses')"
                    :value="'Rank' + Number(item.wp_sourcedata.eq_Rarity.vul + 1)"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.eq_Money)">
                  <v-text-field
                    :label="$t('WeaponExplain.Manufacturing_costs')"
                    @change="input_interchangeable(item.eq_Money)"
                    v-model="item.eq_Money.vul"
                    
                    filled
                    readonly
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.eq_Money.vul !== item.wp_sourcedata.eq_Money.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Manufacturing_costs')"
                    v-model="item.wp_sourcedata.eq_Money.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>  
                <v-list-item v-if="existence(item.eq_Patience1)">
                  <v-text-field
                    :label="$t('Equipment.Patience1')"
                    @change="Attribute_treatment(item.eq_Patience1)"
                    v-model="item.eq_Patience1.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.eq_Patience1.vul !== item.wp_sourcedata.eq_Patience1.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Equipment.Patience1')"
                    v-model="item.wp_sourcedata.eq_Patience1.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.eq_Patience2)">
                  <v-text-field
                    :label="$t('Equipment.Patience2')"
                    @change="Attribute_treatment(item.eq_Patience2)"
                    v-model="item.eq_Patience2.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.eq_Patience2.vul !== item.wp_sourcedata.eq_Patience2.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Equipment.Patience2')"
                    v-model="item.wp_sourcedata.eq_Patience2.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.eq_Patience3)">
                  <v-text-field
                    :label="$t('Equipment.Patience3')"
                    @change="Attribute_treatment(item.eq_Patience3)"
                    v-model="item.eq_Patience3.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.eq_Patience3.vul !== item.wp_sourcedata.eq_Patience3.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Equipment.Patience3')"
                    v-model="item.wp_sourcedata.eq_Patience3.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.eq_Patience4)">
                  <v-text-field
                    :label="$t('Equipment.Patience4')"
                    @change="Attribute_treatment(item.eq_Patience4)"
                    v-model="item.eq_Patience4.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.eq_Patience4.vul !== item.wp_sourcedata.eq_Patience4.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Equipment.Patience4')"
                    v-model="item.wp_sourcedata.eq_Patience4.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.eq_Patience5)">
                  <v-text-field
                    :label="$t('Equipment.Patience5')"
                    @change="Attribute_treatment(item.eq_Patience5)"
                    v-model="item.eq_Patience5.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.eq_Patience5.vul !== item.wp_sourcedata.eq_Patience5.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Equipment.Patience1')"
                    v-model="item.wp_sourcedata.eq_Patience5.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>  
                <v-list-item v-if="existence(item.eq_Slot_grade_Number)">
                  <v-select
                    v-model="item.eq_Slot_grade_Number.vul"
                    :items="grooveitem"
                    @change="Select_interchangeable(item.eq_Slot_grade_Number)"
                    filled
                    :label="$t('WeaponExplain.Slot_grade_Number')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.eq_Slot_grade_Number.vul !== item.wp_sourcedata.eq_Slot_grade_Number.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Slot_grade_Number')"
                    :value="groove(item.wp_sourcedata.eq_Slot_grade_Number.vul)"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.eq_Slot_grade_1)">
                  <v-select
                    v-model="item.eq_Slot_grade_1.vul"
                    :items="gradeitem"
                    @change="Select_interchangeable(item.eq_Slot_grade_1)"
                    filled
                    :label="$t('WeaponExplain.Slot_grade_Number1')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.eq_Slot_grade_1.vul !== item.wp_sourcedata.eq_Slot_grade_1.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Slot_grade_Number1')"
                    :value="grade(item.wp_sourcedata.eq_Slot_grade_1.vul)"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.eq_Slot_grade_2)">
                  <v-select
                    v-model="item.eq_Slot_grade_2.vul"
                    :items="gradeitem"
                    @change="Select_interchangeable(item.eq_Slot_grade_2)"
                    filled
                    :label="$t('WeaponExplain.Slot_grade_Number2')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.eq_Slot_grade_2.vul !== item.wp_sourcedata.eq_Slot_grade_2.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Slot_grade_Number2')"
                    :value="grade(item.wp_sourcedata.eq_Slot_grade_2.vul)"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.eq_Slot_grade_3)">
                  <v-select
                    v-model="item.eq_Slot_grade_3.vul"
                    :items="gradeitem"
                    @change="Select_interchangeable(item.eq_Slot_grade_3)"
                    filled
                    :label="$t('WeaponExplain.Slot_grade_Number3')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.eq_Slot_grade_3.vul !== item.wp_sourcedata.eq_Slot_grade_3.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Slot_grade_Number3')"
                    :value="grade(item.wp_sourcedata.eq_Slot_grade_3.vul)"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.qe_Weapon_skills1)">
                  <v-autocomplete
                    :label="$t('Equipment.skill1')"
                    v-model="item.qe_Weapon_skills1.vul"
                    :items="skillitem"
                    @change="input_interchangeable(item.qe_Weapon_skills1)"
                    item-text="text"
                    persistent-hint
                    filled
                    :no-data-text="$t('Interface.No_data')"
                  >
                  </v-autocomplete>
                  <v-text-field
                    v-if="sourceitems && (item.qe_Weapon_skills1.vul !== item.wp_sourcedata.qe_Weapon_skills1.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Equipment.skill1')"
                    v-model="item.wp_sourcedata.qe_Weapon_skills1.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.wp_Money)">
                  <v-text-field
                    :label="$t('WeaponExplain.Manufacturing_costs')"
                    @change="input_interchangeable(item.wp_Money)"
                    v-model="item.wp_Money.vul"
                    
                    filled
                    readonly
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.wp_Money.vul !== item.wp_sourcedata.wp_Money.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Manufacturing_costs')"
                    v-model="item.wp_sourcedata.wp_Money.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.k_Sharpness_red)">
                  <v-text-field
                    :label="$t('Sharpness.Red')"
                    @change="input_interchangeable(item.k_Sharpness_red)"
                    v-model="item.k_Sharpness_red.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.k_Sharpness_red.vul !== item.wp_sourcedata.k_Sharpness_red.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Sharpness.Red')"
                    v-model="item.wp_sourcedata.k_Sharpness_red.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.k_Sharpness_orange)">
                  <v-text-field
                    :label="$t('Sharpness.Orange')"
                    @change="input_interchangeable(item.k_Sharpness_orange)"
                    v-model="item.k_Sharpness_orange.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.k_Sharpness_orange.vul !== item.wp_sourcedata.k_Sharpness_orange.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Sharpness.Orange')"
                    v-model="item.wp_sourcedata.k_Sharpness_orange.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.k_Sharpness_yellow)">
                  <v-text-field
                    :label="$t('Sharpness.Yellow')"
                    @change="input_interchangeable(item.k_Sharpness_yellow)"
                    v-model="item.k_Sharpness_yellow.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.k_Sharpness_yellow.vul !== item.wp_sourcedata.k_Sharpness_yellow.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Sharpness.Yellow')"
                    v-model="item.wp_sourcedata.k_Sharpness_yellow.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.k_Sharpness_green)">
                  <v-text-field
                    :label="$t('Sharpness.green')"
                    @change="input_interchangeable(item.k_Sharpness_green)"
                    v-model="item.k_Sharpness_green.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.k_Sharpness_green.vul !== item.wp_sourcedata.k_Sharpness_green.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Sharpness.green')"
                    v-model="item.wp_sourcedata.k_Sharpness_green.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.k_Sharpness_blue)">
                  <v-text-field
                    :label="$t('Sharpness.blue')"
                    @change="input_interchangeable(item.k_Sharpness_blue)"
                    v-model="item.k_Sharpness_blue.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.k_Sharpness_blue.vul !== item.wp_sourcedata.k_Sharpness_blue.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Sharpness.blue')"
                    v-model="item.wp_sourcedata.k_Sharpness_blue.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.k_Sharpness_white)">
                  <v-text-field
                    :label="$t('Sharpness.white')"
                    @change="input_interchangeable(item.k_Sharpness_white)"
                    v-model="item.k_Sharpness_white.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.k_Sharpness_white.vul !== item.wp_sourcedata.k_Sharpness_white.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Sharpness.white')"
                    v-model="item.wp_sourcedata.k_Sharpness_white.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.k_Sharpness_purple)">
                  <v-text-field
                    :label="$t('Sharpness.purple')"
                    @change="input_interchangeable(item.k_Sharpness_purple)"
                    v-model="item.k_Sharpness_purple.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.k_Sharpness_purple.vul !== item.wp_sourcedata.k_Sharpness_purple.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Sharpness.purple')"
                    v-model="item.wp_sourcedata.k_Sharpness_purple.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.wp_Rarity)">
                  <v-select
                    v-model="item.wp_Rarity.vul"
                    :items="rankitem"
                    @change="Select_interchangeable(item.wp_Rarity)"
                    filled
                    :label="$t('WeaponExplain.Production_expenses')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.wp_Rarity.vul !== item.wp_sourcedata.wp_Rarity.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Production_expenses')"
                    :value="'Rank' + Number(item.wp_sourcedata.wp_Rarity.vul + 1)"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.gl_bombard_type)">
                  <v-select
                    v-model="item.gl_bombard_type.vul"
                    :items="bombardtypeitem"
                    @change="Select_interchangeable(item.gl_bombard_type)"
                    filled
                    :label="$t('Bombardment.Bombard_type')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.gl_bombard_type.vul !== item.wp_sourcedata.gl_bombard_type.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Bombardment.Bombard_type')"
                    :value="bombardattributes(item.wp_sourcedata.gl_bombard_type.vul)"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.gl_bombard_level)">
                  <v-select
                    v-model="item.gl_bombard_level.vul"
                    :items="bombardlevelitem"
                    @change="Select_interchangeable(item.gl_bombard_level)"
                    filled
                    :label="$t('Bombardment.Bombard_level')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.gl_bombard_level.vul !== item.wp_sourcedata.gl_bombard_level.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Bombardment.Bombard_level')"
                    :value="'LV' + Number(item.wp_sourcedata.gl_bombard_level.vul + 1)"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.ww_Timbre1)">
                  <v-select
                    v-model="item.ww_Timbre1.vul"
                    :items="timbreitem"
                    @change="Select_interchangeable(item.ww_Timbre1)"
                    filled
                    :label="$t('Syllable.Syllable1')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.ww_Timbre1.vul !== item.wp_sourcedata.ww_Timbre1.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Syllable.Syllable1')"
                    :value="timbrebutes(item.wp_sourcedata.ww_Timbre1.vul)"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.ww_Timbre2)">
                  <v-select
                    v-model="item.ww_Timbre2.vul"
                    :items="timbreitem"
                    @change="Select_interchangeable(item.ww_Timbre2)"
                    filled
                    :label="$t('Syllable.Syllable2')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.ww_Timbre2.vul !== item.wp_sourcedata.ww_Timbre2.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Syllable.Syllable2')"
                    :value="timbrebutes(item.wp_sourcedata.ww_Timbre2.vul)"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.ww_Timbre3)">
                  <v-select
                    v-model="item.ww_Timbre3.vul"
                    :items="timbreitem"
                    @change="Select_interchangeable(item.ww_Timbre3)"
                    filled
                    :label="$t('Syllable.Syllable3')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.ww_Timbre3.vul !== item.wp_sourcedata.ww_Timbre3.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Syllable.Syllable3')"
                    :value="timbrebutes(item.wp_sourcedata.ww_Timbre3.vul)"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.wp_Chopping_value)">
                  <v-menu
                    v-model="props.menu"
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
                        <v-list-item avatar justify-space-around>
                          <v-layout justify-space-around>
                          <v-list-item-avatar>
                              <v-btn small @click="item.wp_Chopping_value.vul = 33,
                                item.wp_Chopping_grade.vul = 8,
                                input_interchangeable(item.wp_Chopping_value),
                                input_interchangeable(item.wp_Chopping_grade)">
                                {{$t('WeaponExplain.Chopping_grade_quick1')}}
                              </v-btn>
                          </v-list-item-avatar>
                          <v-list-item-avatar>
                              <v-btn small @click="item.wp_Chopping_value.vul = 38,
                                item.wp_Chopping_grade.vul = 8,
                                input_interchangeable(item.wp_Chopping_value),
                                input_interchangeable(item.wp_Chopping_grade)">
                                {{$t('WeaponExplain.Chopping_grade_quick2')}}</v-btn>
                          </v-list-item-avatar>
                          <v-list-item-avatar>
                              <v-btn small @click="item.wp_Chopping_value.vul = 39,
                                item.wp_Chopping_grade.vul = 8,
                                input_interchangeable(item.wp_Chopping_value),
                                input_interchangeable(item.wp_Chopping_grade)">
                                {{$t('WeaponExplain.Chopping_grade_quick3')}}</v-btn>
                          </v-list-item-avatar>
                          <v-list-item-avatar>
                              <v-btn small @click="item.wp_Chopping_value.vul = item.wp_sourcedata.wp_Chopping_value.vul,
                                item.wp_Chopping_grade.vul = item.wp_sourcedata.wp_Chopping_grade.vul,
                                input_interchangeable(item.wp_Chopping_value),
                                input_interchangeable(item.wp_Chopping_grade)">
                                {{$t('WeaponExplain.Reset')}}</v-btn>
                          </v-list-item-avatar>
                          </v-layout>
                        </v-list-item>
                      </v-list>
                      <v-divider></v-divider>
                      <v-list>
                        <v-subheader>{{$t('WeaponExplain.Chopping_value') + '(' + item.wp_Chopping_value.vul + ')'}}</v-subheader>
                        <v-list-item>
                          <v-list-item-content>
                            <v-slider
                              
                              @change="input_interchangeable(item.wp_Chopping_value)"
                              v-model="item.wp_Chopping_value.vul"
                              max=118
                            ></v-slider>
                          </v-list-item-content>
                        </v-list-item>
                        <v-subheader>{{$t('WeaponExplain.Chopping_grade')}}</v-subheader>
                        <v-list-item>
                          <v-list-item-content>
                            <v-slider
                              
                              @change="input_interchangeable(item.wp_Chopping_grade)"
                              v-model="item.wp_Chopping_grade.vul"
                              max=8
                              ticks="always"
                              tick-size="2"
                            ></v-slider>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-menu>
                </v-list-item>
                <v-list-item v-if="existence(item.wp_Damage_value)">
                  <v-text-field
                    :label="$t('WeaponExplain.Damage')"
                    @change="Damage_treatment(item.wp_Damage_value)"
                    v-model="item.wp_Damage_value.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.wp_Damage_value.vul !== item.wp_sourcedata.wp_Damage_value.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Damage')"
                    v-model="item.wp_sourcedata.wp_Damage_value.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.wp_Defense_value)">
                  <v-text-field
                    :label="$t('WeaponExplain.Defense')"
                    @change="Defense_treatment(item.wp_Defense_value)"
                    v-model="item.wp_Defense_value.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.wp_Defense_value.vul !== item.wp_sourcedata.wp_Defense_value.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Defense')"
                    v-model="item.wp_sourcedata.wp_Defense_value.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.wp_Heart_value)">
                  <v-text-field
                    :label="$t('WeaponExplain.Heart')"
                    suffix="%"
                    @change="Heart_treatment(item.wp_Heart_value)"
                    v-model="item.wp_Heart_value.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.wp_Heart_value.vul !== item.wp_sourcedata.wp_Heart_value.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Heart')"
                    suffix="%"
                    v-model="item.wp_sourcedata.wp_Heart_value.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.wp_Visible_attributes)">
                  <v-select
                    v-model="item.wp_Visible_attributes.vul"
                    :items="attributeitem"
                    @change="Select_interchangeable(item.wp_Visible_attributes)"
                    filled
                    :label="$t('WeaponExplain.Visible_attributes')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.wp_Visible_attributes.vul !== item.wp_sourcedata.wp_Visible_attributes.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Visible_attributes')"
                    :value="attribute(item.wp_sourcedata.wp_Visible_attributes.vul)"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.wp_Visible_attribute_values)">
                  <v-text-field
                    :label="$t('WeaponExplain.Visible_attribute_values')"
                    @change="Attribute_treatment(item.wp_Visible_attribute_values)"
                    v-model="item.wp_Visible_attribute_values.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.wp_Visible_attribute_values.vul !== item.wp_sourcedata.wp_Visible_attribute_values.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Visible_attribute_values')"
                    v-model="item.wp_sourcedata.wp_Visible_attribute_values.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.ws_First_attribute)">
                  <v-select
                    v-model="item.ws_First_attribute.vul"
                    :items="attributeitem"
                    @change="Select_interchangeable(item.ws_First_attribute)"
                    filled
                    :label="$t('Wswordattribute.First_attribute')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.ws_First_attribute.vul !== item.wp_sourcedata.ws_First_attribute.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Wswordattribute.First_attribute')"
                    :value="attribute(item.wp_sourcedata.ws_First_attribute.vul)"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.ws_First_attribute_values)">
                  <v-text-field
                    :label="$t('Wswordattribute.First_attribute_values')"
                    @change="Attribute_treatment(item.ws_First_attribute_values)"
                    v-model="item.ws_First_attribute_values.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.ws_First_attribute_values.vul !== item.wp_sourcedata.ws_First_attribute_values.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Wswordattribute.First_attribute_values')"
                    v-model="item.wp_sourcedata.ws_First_attribute_values.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.ws_Second_attribute)">
                  <v-select
                    v-model="item.ws_Second_attribute.vul"
                    :items="attributeitem"
                    @change="Select_interchangeable(item.ws_Second_attribute)"
                    filled
                    :label="$t('Wswordattribute.Second_attribute')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.ws_Second_attribute.vul !== item.wp_sourcedata.ws_Second_attribute.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Wswordattribute.Second_attribute')"
                    :value="attribute(item.wp_sourcedata.ws_Second_attribute.vul)"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.ws_Second_attribute_values)">
                  <v-text-field
                    :label="$t('Wswordattribute.Second_attribute_values')"
                    @change="Attribute_treatment(item.ws_Second_attribute_values)"
                    v-model="item.ws_Second_attribute_values.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.ws_Second_attribute_values.vul !== item.wp_sourcedata.ws_Second_attribute_values.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Wswordattribute.Second_attribute_values')"
                    v-model="item.wp_sourcedata.ws_Second_attribute_values.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.sa_Attribute)">
                  <v-select
                    v-model="item.sa_Attribute.vul"
                    :items="wepsaxeitem"
                    @change="Select_interchangeable(item.sa_Attribute)"
                    filled
                    :label="$t('Saxebottle.Bottle_type')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.sa_Attribute.vul !== item.wp_sourcedata.sa_Attribute.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Saxebottle.Bottle_type')"
                    :value="specialattributes(item.wp_sourcedata.sa_Attribute.vul)"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.bt_chopping)">
                  <v-select
                    v-model="item.bt_chopping.vul"
                    :items="hbottleitem"
                    @change="Select_interchangeable(item.bt_chopping)"
                    filled
                    :label="$t('Huntingbottle.Bottle_type_1')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.bt_chopping.vul !== item.wp_sourcedata.bt_chopping.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Huntingbottle.Bottle_type_1')"
                    :value="specialattributes(item.wp_sourcedata.bt_chopping.vul)"
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.bt_enhance)">
                  <v-select
                    v-model="item.bt_enhance.vul"
                    :items="hbottleitem"
                    @change="Select_interchangeable(item.bt_enhance)"
                    filled
                    :label="$t('Huntingbottle.Bottle_type_2')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.bt_enhance.vul !== item.wp_sourcedata.bt_enhance.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Huntingbottle.Bottle_type_2')"
                    :value="specialattributes(item.wp_sourcedata.bt_enhance.vul)"
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.bt_paralysis)">
                  <v-select
                    v-model="item.bt_paralysis.vul"
                    :items="hbottleitem"
                    @change="Select_interchangeable(item.bt_paralysis)"
                    filled
                    :label="$t('Huntingbottle.Bottle_type_3')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.bt_paralysis.vul !== item.wp_sourcedata.bt_paralysis.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Huntingbottle.Bottle_type_3')"
                    :value="specialattributes(item.wp_sourcedata.bt_paralysis.vul)"
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.bt_poison)">
                  <v-select
                    v-model="item.bt_poison.vul"
                    :items="hbottleitem"
                    @change="Select_interchangeable(item.bt_poison)"
                    filled
                    :label="$t('Huntingbottle.Bottle_type_4')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.bt_poison.vul !== item.wp_sourcedata.bt_poison.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Huntingbottle.Bottle_type_4')"
                    :value="specialattributes(item.wp_sourcedata.bt_poison.vul)"
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.bt_sleep)">
                  <v-select
                    v-model="item.bt_sleep.vul"
                    :items="hbottleitem"
                    @change="Select_interchangeable(item.bt_sleep)"
                    filled
                    :label="$t('Huntingbottle.Bottle_type_5')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.bt_sleep.vul !== item.wp_sourcedata.bt_sleep.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Huntingbottle.Bottle_type_5')"
                    :value="specialattributes(item.wp_sourcedata.bt_sleep.vul)"
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.bt_bomb)">
                  <v-select
                    v-model="item.bt_bomb.vul"
                    :items="hbottleitem"
                    @change="Select_interchangeable(item.bt_bomb)"
                    filled
                    :label="$t('Huntingbottle.Bottle_type_6')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.bt_bomb.vul !== item.wp_sourcedata.bt_bomb.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Huntingbottle.Bottle_type_6')"
                    :value="specialattributes(item.wp_sourcedata.bt_bomb.vul)"
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.sa_Attribute_value)">
                  <v-text-field
                    :label="$t('Saxebottle.Attribute_values')"
                    @change="Attribute_treatment(item.sa_Attribute_value)"
                    v-model="item.sa_Attribute_value.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.sa_Attribute_value.vul !== item.wp_sourcedata.sa_Attribute_value.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Saxebottle.Attribute_values')"
                    v-model="item.wp_sourcedata.sa_Attribute_value.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.wp_Hidden_attribute)">
                  <v-select
                    v-model="item.wp_Hidden_attribute.vul"
                    :items="attributeitem"
                    @change="Select_interchangeable(item.wp_Hidden_attribute)"
                    filled
                    :label="$t('WeaponExplain.Hidden_attributes')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.wp_Hidden_attribute.vul !== item.wp_sourcedata.wp_Hidden_attribute.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Hidden_attributes')"
                    :value="attribute(item.wp_sourcedata.wp_Hidden_attribute.vul)"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.wp_Hidden_attribute_values)">
                  <v-text-field
                    :label="$t('WeaponExplain.Hidden_attribute_values')"
                    @change="Attribute_treatment(item.wp_Hidden_attribute_values)"
                    v-model="item.wp_Hidden_attribute_values.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.wp_Hidden_attribute_values.vul !== item.wp_sourcedata.wp_Hidden_attribute_values.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Hidden_attribute_values')"
                    v-model="item.wp_sourcedata.wp_Hidden_attribute_values.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                </v-list>
              </v-flex>
              <v-flex xs12 sm6>
                <v-list two-line>
                <v-simple-table v-if="existence(item.k_Number)" height="650px">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">{{$t('Sharpness.Weaponlist')}}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in kwpname(item.k_Number.vul)" :key="item.name">
                        <td>{{ item.name }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>

                <v-simple-table v-if="existence(item.bt_Number)" height="650px">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">{{$t('Sharpness.Weaponlist')}}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in bwpname(item.bt_Number.vul)" :key="item.name">
                        <td>{{ item.name }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>

                <v-list-item v-if="existence(item.wp_Cartridge_matching)">
                  <v-text-field
                    :label="$t('WeaponExplain.Match_projectile')"
                    @change="input_interchangeable(item.wp_Cartridge_matching)"
                    v-model="item.wp_Cartridge_matching.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.wp_Cartridge_matching.vul !== item.wp_sourcedata.wp_Cartridge_matching.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Match_projectile')"
                    v-model="item.wp_sourcedata.wp_Cartridge_matching.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.wp_Offset_size)">
                  <v-select
                    v-model="item.wp_Offset_size.vul"
                    :items="generalsizeitem"
                    @change="Select_interchangeable(item.wp_Offset_size)"
                    filled
                    :label="$t('WeaponExplain.Ballistic_offset')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.wp_Offset_size.vul !== item.wp_sourcedata.wp_Offset_size.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Ballistic_offset')"
                    :value="generalsize(item.wp_sourcedata.wp_Offset_size.vul)"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.wp_Seal_Dragon)">
                  <v-select
                    v-model="item.wp_Seal_Dragon.vul"
                    :items="generalsizeitem"
                    @change="Select_interchangeable(item.wp_Seal_Dragon)"
                    filled
                    :label="$t('WeaponExplain.Seal_Dragon')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.wp_Seal_Dragon.vul !== item.wp_sourcedata.wp_Seal_Dragon.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Seal_Dragon')"
                    :value="generalsize(item.wp_sourcedata.wp_Seal_Dragon.vul)"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.wp_Slot_grade_Number)">
                  <v-select
                    v-model="item.wp_Slot_grade_Number.vul"
                    :items="grooveitem"
                    @change="Select_interchangeable(item.wp_Slot_grade_Number)"
                    filled
                    :label="$t('WeaponExplain.Slot_grade_Number')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.wp_Slot_grade_Number.vul !== item.wp_sourcedata.wp_Slot_grade_Number.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Slot_grade_Number')"
                    :value="groove(item.wp_sourcedata.wp_Slot_grade_Number.vul)"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.wp_Slot_grade_1)">
                  <v-select
                    v-model="item.wp_Slot_grade_1.vul"
                    :items="gradeitem"
                    @change="Select_interchangeable(item.wp_Slot_grade_1)"
                    filled
                    :label="$t('WeaponExplain.Slot_grade_Number1')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.wp_Slot_grade_1.vul !== item.wp_sourcedata.wp_Slot_grade_1.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Slot_grade_Number1')"
                    :value="grade(item.wp_sourcedata.wp_Slot_grade_1.vul)"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.wp_Slot_grade_2)">
                  <v-select
                    v-model="item.wp_Slot_grade_2.vul"
                    :items="gradeitem"
                    @change="Select_interchangeable(item.wp_Slot_grade_2)"
                    filled
                    :label="$t('WeaponExplain.Slot_grade_Number2')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.wp_Slot_grade_2.vul !== item.wp_sourcedata.wp_Slot_grade_2.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Slot_grade_Number2')"
                    :value="grade(item.wp_sourcedata.wp_Slot_grade_2.vul)"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.wp_Slot_grade_3)">
                  <v-select
                    v-model="item.wp_Slot_grade_3.vul"
                    :items="gradeitem"
                    @change="Select_interchangeable(item.wp_Slot_grade_3)"
                    filled
                    :label="$t('WeaponExplain.Slot_grade_Number3')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.wp_Slot_grade_3.vul !== item.wp_sourcedata.wp_Slot_grade_3.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Slot_grade_Number3')"
                    :value="grade(item.wp_sourcedata.wp_Slot_grade_3.vul)"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.wp_Special_projectile) && specialprojectileitem[item.wp_Special_projectile.vul] !== undefined">
                  <v-select
                    v-model="item.wp_Special_projectile.vul"
                    :items="specialprojectileitem"
                    @change="Select_interchangeable(item.wp_Special_projectile)"
                    filled
                    :label="$t('WeaponExplain.Specialprojectile')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.wp_Special_projectile.vul !== item.wp_sourcedata.wp_Special_projectile.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Specialprojectile')"
                    :value="specialprojectile(item.wp_sourcedata.wp_Special_projectile.vul)"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-else-if="existence(item.wp_Special_projectile)">
                  <v-text-field
                    :label="$t('WeaponExplain.Specialprojectile')"
                    @change="input_interchangeable(item.wp_Special_projectile)"
                    v-model="item.wp_Special_projectile.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.wp_Special_projectile.vul !== item.wp_sourcedata.wp_Special_projectile.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Specialprojectile')"
                    v-model="item.wp_sourcedata.wp_Special_projectile.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.wp_Special_attributes) && specialattributesitem[item.wp_Special_attributes.vul] !== undefined">
                  <v-select
                    v-model="item.wp_Special_attributes.vul"
                    :items="specialattributesitem"
                    @change="Select_interchangeable(item.wp_Special_attributes)"
                    filled
                    :label="$t('WeaponExplain.Special_attributes')"
                    item-text="text"
                    item-value="value"
                    return-object
                  ></v-select>
                  <v-text-field
                    v-if="sourceitems && (item.wp_Special_attributes.vul !== item.wp_sourcedata.wp_Special_attributes.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Special_attributes')"
                    :value="specialattributes(item.wp_sourcedata.wp_Special_attributes.vul)"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-else-if="existence(item.wp_Special_attributes)">
                  <v-text-field
                    :label="$t('WeaponExplain.Special_attributes')"
                    @change="input_interchangeable(item.wp_Special_attributes)"
                    v-model="item.wp_Special_attributes.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.wp_Special_attributes.vul !== item.wp_sourcedata.wp_Special_attributes.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Special_attributes')"
                    v-model="item.wp_sourcedata.wp_Special_attributes.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <!-- new model -->
                <v-list-item v-if="existence(item.wp_Model) || existence(item.wp_Unprefixed_Model)">
                  <v-menu
                    v-model="props.menu"
                    :close-on-content-click="false"
                    :nudge-width="300"
                    offset-x
                  >
                    <template v-slot:activator="{ on }">
                      <v-btn class="ma-2" tile outlined color="success" v-on="on">
                        <v-icon left>mdi-axe</v-icon> {{$t('WeaponExplain.Weapon_model')}}
                      </v-btn>
                    </template>
                    <v-card>
                      <v-list two-line>
                        <v-list-item avatar justify-space-around>
                          <v-autocomplete
                            :label="$t('WeaponExplain.Weapon_model')"
                            v-model="item.models"
                            :items="modelitem"
                            @change="
                            item.wp_Model.vul = item.models.model,
                            item.wp_Minor_Model.vul = item.models.minormodel,
                            item.wp_Unprefixed_Model.vul = item.models.unperfixedmodel,
                            input_interchangeable(item.wp_Model),
                            input_interchangeable(item.wp_Minor_Model),
                            input_interchangeable(item.wp_Unprefixed_Model)"
                            item-text="wpname"
                            persistent-hint
                            filled
                            return-object
                            :no-data-text="$t('Interface.No_data')"
                          >
                          </v-autocomplete>
                        </v-list-item>
                      </v-list>
                      <v-divider></v-divider>
                      <v-list two-line>
                        <v-list-item v-if="existence(item.wp_Unprefixed_Model.vul)">
                          <v-tooltip bottom v-if="item.wp_Unprefixed_Model.vul !== 65535">
                            <v-text-field
                              slot="activator"
                              :label="$t('WeaponExplain.Independent_model')"
                              @change="input_interchangeable(item.wp_Unprefixed_Model)"
                              v-model="item.wp_Unprefixed_Model.vul"
                              
                              filled
                            ></v-text-field>
                            <span>{{$t('Explanatory.Have_model')}}</span>
                          </v-tooltip>
                          <v-tooltip bottom v-else>
                            <v-select
                              slot="activator"
                              v-model="item.wp_Unprefixed_Model.vul"
                              :items="[{text:$t('WeaponExplain.Nothing'),value:65535},{text:$t('WeaponExplain.Edit_data'),value:0}]"
                              @change="Select_interchangeable(item.wp_Unprefixed_Model)"
                              filled
                              :label="$t('WeaponExplain.Independent_model')"
                              item-text="text"
                              item-value="value"
                              return-object
                            ></v-select>
                            <span>{{$t('Explanatory.Free_model')}}</span>
                          </v-tooltip>
                          <v-text-field
                            v-if="sourceitems && (item.wp_Unprefixed_Model.vul !== item.wp_sourcedata.wp_Unprefixed_Model.vul)"
                            :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Independent_model')"
                            v-model="item.wp_sourcedata.wp_Unprefixed_Model.vul"
                            
                            filled
                            prepend-icon="mdi-transfer-left"
                            readonly
                          ></v-text-field>
                        </v-list-item>
                        <v-list-item v-if="existence(item.wp_Model.vul)">
                          <v-tooltip bottom v-if="item.wp_Model.vul !== 65535">
                            <v-text-field
                              slot="activator"
                              :label="$t('WeaponExplain.Weapon_model')"
                              @change="input_interchangeable(item.wp_Model)"
                              v-model="item.wp_Model.vul"
                              
                              filled
                            ></v-text-field>
                            <span>{{$t('Explanatory.Have_model')}}</span>
                          </v-tooltip>
                          <v-tooltip bottom v-else>
                            <v-select
                              slot="activator"
                              v-model="item.wp_Model.vul"
                              :items="[{text:$t('WeaponExplain.Nothing'),value:65535},{text:$t('WeaponExplain.Edit_data'),value:0}]"
                              @change="Select_interchangeable(item.wp_Model)"
                              filled
                              :label="$t('WeaponExplain.Weapon_model')"
                              item-text="text"
                              item-value="value"
                              return-object
                            ></v-select>
                            <span>{{$t('Explanatory.Free_model')}}</span>
                          </v-tooltip>
                          <v-text-field
                            v-if="sourceitems && (item.wp_Model.vul !== item.wp_sourcedata.wp_Model.vul)"
                            :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Weapon_model')"
                            v-model="item.wp_sourcedata.wp_Model.vul"
                            
                            filled
                            prepend-icon="mdi-transfer-left"
                            readonly
                          ></v-text-field>
                        </v-list-item>
                        <v-list-item v-if="existence(item.wp_Minor_Model.vul)">
                          <v-tooltip bottom v-if="item.wp_Minor_Model.vul !== 65535">
                            <v-text-field
                              slot="activator"
                              :label="$t('WeaponExplain.Weapon_secondary_model')"
                              @change="input_interchangeable(item.wp_Minor_Model)"
                              v-model="item.wp_Minor_Model.vul"
                              
                              filled
                            ></v-text-field>
                            <span>{{$t('Explanatory.Have_model')}}</span>
                          </v-tooltip>
                          <v-tooltip bottom v-else>
                            <v-select
                              slot="activator"
                              v-model="item.wp_Minor_Model.vul"
                              :items="[{text:$t('WeaponExplain.Nothing'),value:65535},{text:$t('WeaponExplain.Edit_data'),value:0}]"
                              @change="Select_interchangeable(item.wp_Minor_Model)"
                              filled
                              :label="$t('WeaponExplain.Weapon_secondary_model')"
                              item-text="text"
                              item-value="value"
                              return-object
                            ></v-select>
                            <span>{{$t('Explanatory.Free_model')}}</span>
                          </v-tooltip>
                          <v-text-field
                            v-if="sourceitems && (item.wp_Minor_Model.vul !== item.wp_sourcedata.wp_Minor_Model.vul)"
                            :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Weapon_secondary_model')"
                            v-model="item.wp_sourcedata.wp_Minor_Model.vul"
                            
                            filled
                            prepend-icon="mdi-transfer-left"
                            readonly
                          ></v-text-field>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-menu>
                </v-list-item>
                <!-- nwe model end -->
                <v-list-item v-if="existence(item.wp_Weapon_skills)">
                  <v-autocomplete
                    :label="$t('WeaponExplain.Weapon_skills')"
                    v-model="item.wp_Weapon_skills.vul"
                    :items="skillitem"
                    @change="input_interchangeable(item.wp_Weapon_skills)"
                    item-text="text"
                    persistent-hint
                    filled
                    :no-data-text="$t('Interface.No_data')"
                  >
                  </v-autocomplete>
                  <v-text-field
                    v-if="sourceitems && (item.wp_Weapon_skills.vul !== item.wp_sourcedata.wp_Weapon_skills.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('WeaponExplain.Weapon_skills')"
                    v-model="item.wp_sourcedata.wp_Weapon_skills.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.qe_Weapon_skillslv1)">
                  <v-text-field
                    :label="$t('Equipment.skilllv1')"
                    @change="input_interchangeable(item.qe_Weapon_skillslv1)"
                    v-model="item.qe_Weapon_skillslv1.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.qe_Weapon_skillslv1.vul !== item.wp_sourcedata.qe_Weapon_skillslv1.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Equipment.skilllv1')"
                    v-model="item.wp_sourcedata.qe_Weapon_skillslv1.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>  
                <v-list-item v-if="existence(item.qe_Weapon_skills2)">
                  <v-autocomplete
                    :label="$t('Equipment.skill2')"
                    v-model="item.qe_Weapon_skills2.vul"
                    :items="skillitem"
                    @change="input_interchangeable(item.qe_Weapon_skills2)"
                    item-text="text"
                    persistent-hint
                    filled
                    :no-data-text="$t('Interface.No_data')"
                  >
                  </v-autocomplete>
                  <v-text-field
                    v-if="sourceitems && (item.qe_Weapon_skills2.vul !== item.wp_sourcedata.qe_Weapon_skills2.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Equipment.skill2')"
                    v-model="item.wp_sourcedata.qe_Weapon_skills2.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.qe_Weapon_skillslv2)">
                  <v-text-field
                    :label="$t('Equipment.skilllv2')"
                    @change="input_interchangeable(item.qe_Weapon_skillslv2)"
                    v-model="item.qe_Weapon_skillslv2.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.qe_Weapon_skillslv2.vul !== item.wp_sourcedata.qe_Weapon_skillslv2.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Equipment.skilllv2')"
                    v-model="item.wp_sourcedata.qe_Weapon_skillslv2.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>  
                <v-list-item v-if="existence(item.qe_Weapon_skills3)">
                  <v-autocomplete
                    :label="$t('Equipment.skill3')"
                    v-model="item.qe_Weapon_skills3.vul"
                    :items="skillitem"
                    @change="input_interchangeable(item.qe_Weapon_skills3)"
                    item-text="text"
                    persistent-hint
                    filled
                    :no-data-text="$t('Interface.No_data')"
                  >
                  </v-autocomplete>
                  <v-text-field
                    v-if="sourceitems && (item.qe_Weapon_skills3.vul !== item.wp_sourcedata.qe_Weapon_skills3.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Equipment.skill3')"
                    v-model="item.wp_sourcedata.qe_Weapon_skills3.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.qe_Weapon_skillslv3)">
                  <v-text-field
                    :label="$t('Equipment.skilllv3')"
                    @change="input_interchangeable(item.qe_Weapon_skillslv3)"
                    v-model="item.qe_Weapon_skillslv3.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.qe_Weapon_skillslv3.vul !== item.wp_sourcedata.qe_Weapon_skillslv3.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Equipment.skilllv3')"
                    v-model="item.wp_sourcedata.qe_Weapon_skillslv3.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>  
                <v-list-item v-if="existence(item.qe_Weapon_skills4)">
                  <v-autocomplete
                    :label="$t('Equipment.skill4')"
                    v-model="item.qe_Weapon_skills4.vul"
                    :items="skillitem"
                    @change="input_interchangeable(item.qe_Weapon_skills4)"
                    item-text="text"
                    persistent-hint
                    filled
                    :no-data-text="$t('Interface.No_data')"
                  >
                  </v-autocomplete>
                  <v-text-field
                    v-if="sourceitems && (item.qe_Weapon_skills4.vul !== item.wp_sourcedata.qe_Weapon_skills4.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Equipment.skill4')"
                    v-model="item.wp_sourcedata.qe_Weapon_skills4.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.qe_Weapon_skillslv4)">
                  <v-text-field
                    :label="$t('Equipment.skilllv4')"
                    @change="input_interchangeable(item.qe_Weapon_skillslv4)"
                    v-model="item.qe_Weapon_skillslv4.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.qe_Weapon_skillslv4.vul !== item.wp_sourcedata.qe_Weapon_skillslv4.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Equipment.skilllv4')"
                    v-model="item.wp_sourcedata.qe_Weapon_skillslv4.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>  
                <v-list-item v-if="existence(item.qe_Weapon_skills5)">
                  <v-autocomplete
                    :label="$t('Equipment.skill5')"
                    v-model="item.qe_Weapon_skills5.vul"
                    :items="skillitem"
                    @change="input_interchangeable(item.qe_Weapon_skills5)"
                    item-text="text"
                    persistent-hint
                    filled
                    :no-data-text="$t('Interface.No_data')"
                  >
                  </v-autocomplete>
                  <v-text-field
                    v-if="sourceitems && (item.qe_Weapon_skills5.vul !== item.wp_sourcedata.qe_Weapon_skills5.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Equipment.skill5')"
                    v-model="item.wp_sourcedata.qe_Weapon_skills5.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                <v-list-item v-if="existence(item.qe_Weapon_skillslv5)">
                  <v-text-field
                    :label="$t('Equipment.skilllv5')"
                    @change="input_interchangeable(item.qe_Weapon_skillslv5)"
                    v-model="item.qe_Weapon_skillslv5.vul"
                    
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-if="sourceitems && (item.qe_Weapon_skillslv5.vul !== item.wp_sourcedata.qe_Weapon_skillslv5.vul)"
                    :label="$t('Interface.Original') + ' ' + $t('Equipment.skilllv5')"
                    v-model="item.wp_sourcedata.qe_Weapon_skillslv5.vul"
                    
                    filled
                    prepend-icon="mdi-transfer-left"
                    readonly
                  ></v-text-field>
                </v-list-item>
                </v-list>
              </v-flex>
              </v-layout>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <div class="flex-grow-1"></div>

          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="ml-1"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        itemsPerPageArray: [2, 4],
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 2,
        sortBy: 'name',
        items: [
          {
            wp_Name: false,
            wp_Number: false,
            wp_Money: false,
            wp_Rarity: false,
            wp_Chopping_value: false,
            wp_Chopping_grade: false,
            wp_Damage_value: false,
            wp_Defense_value: false,
            wp_Heart_value: false,
            wp_Visible_attributes: false,
            wp_Visible_attribute_values: false,
            wp_Hidden_attribute: false,
            wp_Hidden_attribute_values: false,
            wp_Cartridge_matching: false,
            wp_Offset_size: false,
            wp_Seal_Dragon: false,
            wp_Slot_grade_Number: false,
            wp_Slot_grade_1: false,
            wp_Slot_grade_2: false,
            wp_Slot_grade_3: false,
            wp_Special_projectile: false,
            wp_Special_attributes: false,
            wp_Weapon_skills: false
          }
        ],
        sourceitems: false
      }
    },
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
      numberOfPages () {
          return Math.ceil(this.filteritem.length / this.itemsPerPage)
        },
      filteredKeys () {
        return this.keys.filter(key => key !== `Name`)
      },
      filteritem () {
        let _items = this.items
        if (this.excludeunknown) {
          let itemsarr = []
          for (let i = 0, l = _items.length; i < l; i++) {
            if (this.existence(_items[i].wp_Number) && this.wpname(_items[i].wp_Number.vul) !== this.$t('WeaponExplain.Unknown') && this.wpname(_items[i].wp_Number.vul) !== 'Unknown') {
              itemsarr.push(_items[i])
            } else if (this.existence(_items[i].eq_Number) && this.wpname(_items[i].eq_Number.vul, _items[i].eq_Type.vul) !== this.$t('WeaponExplain.Unknown') && this.wpname(_items[i].eq_Number.vul, _items[i].eq_Type.vul) !== 'Unknown') {
              itemsarr.push(_items[i])
            } else if (this.existence(_items[i].k_Number) && _items[i].k_Number !== false) {
              itemsarr.push(_items[i])
            } else if (this.existence(_items[i].ws_Number) && _items[i].ws_Number !== false) {
              itemsarr.push(_items[i])
            } else if (this.existence(_items[i].bt_Number) && _items[i].bt_Number !== false) {
              itemsarr.push(_items[i])
            } else if (this.existence(_items[i].sa_Number) && _items[i].sa_Number !== false) {
              itemsarr.push(_items[i])
            } else if (this.existence(_items[i].gl_Number) && _items[i].gl_Number !== false) {
              itemsarr.push(_items[i])
            } else if (this.existence(_items[i].ww_Number) && _items[i].ww_Number !== false) {
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
      timbreitem () {
        return [
          {value: 0, text: this.$t('WeaponExplain.Purple_timbre')},
          {value: 1, text: this.$t('WeaponExplain.Red_timbre')},
          {value: 2, text: this.$t('WeaponExplain.Orange_timbre')},
          {value: 3, text: this.$t('WeaponExplain.Yellow_timbre')},
          {value: 4, text: this.$t('WeaponExplain.Green_timbre')},
          {value: 5, text: this.$t('WeaponExplain.Blue_timbre')},
          {value: 6, text: this.$t('WeaponExplain.Indigo_timbre')},
          {value: 7, text: this.$t('WeaponExplain.White_timbre')}
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
      specialprojectileitem () {
        if (this.weapon === 'lbg.wp_dat_g') {
          return [
            {value: 0, text: this.$t('WeaponExplain.Setbomb')}
          ]
        } else if (this.weapon === 'hbg.wp_dat_g') {
          return [
            {value: 1, text: this.$t('WeaponExplain.Gatling')},
            {value: 2, text: this.$t('WeaponExplain.Snipe')}
          ]
        } else {
          return [
            {value: 0, text: this.$t('WeaponExplain.Nothing')}
          ]
        }
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
      wepsaxeitem () {
        return [
          {value: 0, text: this.$t('WeaponExplain.Strong_exocet_bottle')},
          {value: 1, text: this.$t('WeaponExplain.Strong_attribute_bottle')},
          {value: 2, text: this.$t('WeaponExplain.Extinguish_dragon')},
          {value: 3, text: this.$t('WeaponExplain.Reduce_breath')},
          {value: 4, text: this.$t('WeaponExplain.Hemp')},
          {value: 5, text: this.$t('WeaponExplain.Poison')}
        ]
      },
      hbottleitem () {
        return [
          {value: 0, text: this.$t('WeaponExplain.Nothing')},
          {value: 1, text: this.$t('WeaponExplain.Ordinary')},
          {value: 2, text: this.$t('WeaponExplain.Intensify')}
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
      },
      bombardtypeitem () {
        return [
          {value: 0, text: this.$t('WeaponExplain.Normal_type')},
          {value: 1, text: this.$t('WeaponExplain.Radiological_type')},
          {value: 2, text: this.$t('WeaponExplain.Diffusion_type')}
        ]
      },
      bombardlevelitem () {
        return [
          {value: 0, text: 'LV1'},
          {value: 1, text: 'LV2'},
          {value: 2, text: 'LV3'},
          {value: 3, text: 'LV4'},
          {value: 4, text: 'LV5'}
        ]
      },
      modelitem () {
        let _items = this.items
        let itemsarr = []
        for (let i = 0, l = _items.length; i < l; i++) {
          if (this.wpname(_items[i].wp_Number.vul) !== this.$t('WeaponExplain.Unknown') && this.wpname(_items[i].wp_Number.vul) !== 'Unknown') {
            itemsarr.push({
              wpname: _items[i].wp_Name,
              model: _items[i].wp_Model.vul,
              minormodel: _items[i].wp_Minor_Model.vul,
              unperfixedmodel: _items[i].wp_Unprefixed_Model.vul
            })
          }
        }
        return itemsarr
      },
      skillitem () {
        let skill = []
        for (let i = 0; i < 165; i++) {
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
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
      str_pad (hex, digits = 8) {
        var zero = new Array(digits + 1).join('0')
        var tmp = digits - hex.length
        return zero.substr(0, tmp) + hex.toLocaleUpperCase()
      },
      searchitemtext (data) {
        let namelist = [
          'k_Number',
          'ws_Number',
          'bt_Number',
          'ri_Number',
          'sa_Number',
          'ww_Number',
          'gl_Number',
          'sk_Number'
        ]
        for (let i = 0; i < namelist.length; i++) {
          if (namelist[i] in data) {
            return namelist[i] + '.vul'
          }
        }
        if ('wp_Name' in data) {
          return 'wp_Name'
        } else {
          return 'wp_Hex'
        }
      },
      existence (target) {
        return target !== undefined && target !== false
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
      Defense_treatment (val) {
        let valsave
        if (val.vul === '') {
          val.vul = 0
        }
        valsave = val
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
      specialprojectile (specialprojectile) {
        let specialprojectiletext = this.$t('WeaponExplain.Nothing')
        switch (specialprojectile) {
          case 0:
            specialprojectiletext = this.$t('WeaponExplain.Setbomb')
            break
          case 1:
            specialprojectiletext = this.$t('WeaponExplain.Gatling')
            break
          case 2:
            specialprojectiletext = this.$t('WeaponExplain.Snipe')
            break
          default:
            specialprojectiletext = this.$t('WeaponExplain.Error')
        }
        return specialprojectiletext
      },
      specialattributes (specialattributes) {
        let specialattributestext = this.$t('WeaponExplain.Nothing')
        if (this.weapon === 'rod.wp_dat') {
          switch (specialattributes) {
            case 0:
              specialattributestext = this.$t('WeaponExplain.Cut')
              break
            case 1:
              specialattributestext = this.$t('WeaponExplain.Strike')
              break
            case 2:
              specialattributestext = this.$t('WeaponExplain.Attribute')
              break
            case 3:
              specialattributestext = this.$t('WeaponExplain.Speed')
              break
            case 4:
              specialattributestext = this.$t('WeaponExplain.Endurance')
              break
            case 5:
              specialattributestext = this.$t('WeaponExplain.Restores')
              break
            default:
              specialattributestext = this.$t('WeaponExplain.Error')
          }
        } else if (this.weapon === 'c_axe.wp_dat') {
          switch (specialattributes) {
            case 0:
              specialattributestext = this.$t('WeaponExplain.Strong_exocet_bottle')
              break
            case 1:
              specialattributestext = this.$t('WeaponExplain.Strike')
              break
            default:
              specialattributestext = this.$t('WeaponExplain.Strong_attribute_bottle')
          }
        } else if (this.weapon === 's_axe.wp_dat') {
          specialattributestext = this.specialattributesitem.find(function (v) {
            return v.value === specialattributes
          }).text
        } else {
          specialattributestext = this.$t('WeaponExplain.Nothing')
        }
        return specialattributestext
      },
      bombardattributes (bombardattributes) {
        let bombardattributestext = this.$t('WeaponExplain.Nothing')
        switch (bombardattributes) {
          case 0:
            bombardattributestext = this.$t('WeaponExplain.Radiological_type')
            break
          case 1:
            bombardattributestext = this.$t('WeaponExplain.Radiological_type')
            break
          case 2:
            bombardattributestext = this.$t('WeaponExplain.Diffusion_type')
            break
          default:
            bombardattributestext = this.$t('WeaponExplain.Error')
        }
        return bombardattributestext
      },
      timbrebutes (timbrebutes) {
        let timbrebutestext = this.$t('WeaponExplain.Nothing')
        switch (timbrebutes) {
          case 0:
            timbrebutestext = this.$t('WeaponExplain.Purple_timbre')
            break
          case 1:
            timbrebutestext = this.$t('WeaponExplain.Red_timbre')
            break
          case 2:
            timbrebutestext = this.$t('WeaponExplain.Orange_timbre')
            break
          case 3:
            timbrebutestext = this.$t('WeaponExplain.Yellow_timbre')
            break
          case 4:
            timbrebutestext = this.$t('WeaponExplain.Green_timbre')
            break
          case 5:
            timbrebutestext = this.$t('WeaponExplain.Blue_timbre')
            break
          case 6:
            timbrebutestext = this.$t('WeaponExplain.Indigo_timbre')
            break
          case 7:
            timbrebutestext = this.$t('WeaponExplain.White_timbre')
            break
          default:
            timbrebutestext = this.$t('WeaponExplain.Error')
        }
        return timbrebutestext
      },
      equipmenttype (type) {
        let equipmenttypetext = this.$t('WeaponExplain.Nothing')
        switch (type) {
          case 0:
            equipmenttypetext = this.$t('WeaponExplain.Equipment_type_0')
            break
          case 1:
            equipmenttypetext = this.$t('WeaponExplain.Equipment_type_1')
            break
          case 2:
            equipmenttypetext = this.$t('WeaponExplain.Equipment_type_2')
            break
          case 3:
            equipmenttypetext = this.$t('WeaponExplain.Equipment_type_3')
            break
          case 4:
            equipmenttypetext = this.$t('WeaponExplain.Equipment_type_4')
            break
          case 5:
            equipmenttypetext = this.$t('WeaponExplain.Equipment_type_5')
            break
          default:
            equipmenttypetext = this.$t('WeaponExplain.Error')
        }
        return equipmenttypetext
      },
      equipmentvariant (variant) {
        let equipmentvarianttext = this.$t('WeaponExplain.Nothing')
        switch (variant) {
          case 0:
            equipmentvarianttext = this.$t('WeaponExplain.Nothing')
            break
          case 1:
            equipmentvarianttext = this.$t('WeaponExplain.Equipment_variant_1')
            break
          case 2:
            equipmentvarianttext = this.$t('WeaponExplain.Equipment_variant_2')
            break
          default:
            equipmentvarianttext = this.$t('WeaponExplain.Error')
        }
        return equipmentvarianttext
      },
      HexFunction (data, Hexpointer, HexRuler, i) {
        let ret = ''
        if (Hexpointer === undefined) {
          return false
        }
        if (Hexpointer === 'auto') {
          return {vul: i}
        }
        for (let p = 0; p < Hexpointer[1]; p++) {
          let Hex16 = data[(HexRuler * i) + Hexpointer[0] - p]
          if (Hex16 !== undefined) {
            ret += this.str_pad(Hex16.toString(16), 2)
          } else {
            ret = '00'
          }
        }
        return {vul: parseInt(ret, 16), hex: (HexRuler * i) + Hexpointer[0], hexL: Hexpointer[1], resourceprocessing: Hexpointer.length > 2 ? Hexpointer[2] : false}
      },
      wpname (id, type) {
        let wpnamelist
        if (
          this.weapon &&
          (this.weapon.substring(this.weapon.lastIndexOf('.') + 1) === 'wp_dat_g' || this.weapon.substring(this.weapon.lastIndexOf('.') + 1) === 'wp_dat' || this.weapon.substring(this.weapon.lastIndexOf('.') + 1) === 'am_dat')
        ) {
          wpnamelist = require('../components/Weaponinfo/' + this.$i18n.locale + '/' + this.weapon + '.json')
        } else {
          return this.$t('WeaponExplain.Unknown')
        }
        let namedata = wpnamelist.Data
        if (!Number.isInteger(id)) {
          id = id.vul
        }
        if (type != null && !Number.isInteger(type)) {
          type = type.vul
        }
        if (type != null) {
          for (let i = 0; i < namedata.length; i++) {
            if (
              namedata[i].Equipment_Number === id &&
              namedata[i].Equipment_Type === type
            ) {
              return namedata[i].name
            }
          }
        } else {
          for (let i = 0; i < namedata.length; i++) {
            if (namedata[i].Weapon_Number === id) {
              return namedata[i].name
            }
          }
        }
        return this.$t('WeaponExplain.Unknown')
      },
      kwpname (id) {
        let wpnamelist
        wpnamelist = require('../components/Smiscellaneous/' + this.$i18n.locale + '/Sharpness.json')
        let namedata = wpnamelist.Data
        if (namedata[id]) {
          let ret = []
          for (let i = 0; i < namedata[id].length; i++) {
            ret[i] = {name: namedata[id][i]}
          }
          return ret
        } else {
          return []
        }
      },
      bwpname (id) {
        let wpnamelist
        wpnamelist = require('../components/Smiscellaneous/' + this.$i18n.locale + '/bottle.json')
        let namedata = wpnamelist.Data
        if (namedata[id]) {
          let ret = []
          for (let i = 0; i < namedata[id].length; i++) {
            ret[i] = {name: namedata[id][i]}
          }
          return ret
        } else {
          return []
        }
      },
      Resourceprocessing (HexFunction) {
        if (HexFunction !== false) {
          switch (HexFunction.resourceprocessing) {
            case 'wpdamage':
              HexFunction.vul = Math.ceil(HexFunction.vul * this.weapon_damage(this.weapon))
              break
            case 'wpattribute':
              HexFunction.vul = HexFunction.vul <= 100 ? HexFunction.vul : '-' + (256 - HexFunction.vul)
              if (HexFunction.vul !== 0) { HexFunction.vul = HexFunction.vul + '0' }
              break
            case 'wpheart':
              HexFunction.vul = HexFunction.vul <= 100 ? HexFunction.vul : '-' + (256 - HexFunction.vul)
              break
            case 'wpdefense':
              HexFunction.vul = Math.ceil(HexFunction.vul)
              break
          }
        } else {
          HexFunction = false
        }
        return HexFunction
      },
      hexdata (data) {
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
            'wp_Damage_value': [29, 2, 'wpdamage'], // 28~29
            'wp_Defense_value': [31, 2, 'wpdefense'], // 30~31
            'wp_Heart_value': [32, 1, 'wpheart'], // 32
            'wp_Visible_attributes': [33, 1], // 33
            'wp_Visible_attribute_values': [35, 2, 'wpattribute'], // 34~35
            'wp_Hidden_attribute': [36, 1], // 36
            'wp_Hidden_attribute_values': [38, 2, 'wpattribute'], // 37~38
            'wp_Seal_Dragon': [39, 1], // 39
            'wp_Slot_grade_Number': [40, 1], // 40
            'wp_Slot_grade_1': [41, 1], // 41
            'wp_Slot_grade_2': [42, 1], // 42
            'wp_Slot_grade_3': [43, 1], // 43
            'wp_Special_attributes': [44, 1], // 44
            'wp_Weapon_skills': [(HexRuler + 2), 1] // HexRuler(下一行) + 2
          }
        } else if (data[7] === 0 && data[74] === 1 && data[142] === 2) {
          HexRuler = 16 * 4 + 4 // 远程武器
          HexPointer = {
            'wp_Number': [6, 1], // 6
            'wp_Unprefixed_Model': [13, 2], // 12~13
            'wp_Model': [15, 2], // 14~15
            'wp_Minor_Model': [17, 2], // 16~17
            'wp_Money': [28, 4], // 25~28
            'wp_Rarity': [29, 1], // 29
            'wp_Damage_value': [31, 2, 'wpdamage'], // 30~31
            'wp_Defense_value': [33, 2, 'wpdefense'], // 32~33
            'wp_Heart_value': [34, 1, 'wpheart'], // 34
            'wp_Visible_attributes': [35, 1], // 35
            'wp_Visible_attribute_values': [37, 2, 'wpattribute'], // 36~37
            'wp_Hidden_attribute': [38, 1], // 38
            'wp_Hidden_attribute_values': [40, 2, 'wpattribute'], // 39~40
            'wp_Seal_Dragon': [41, 1], // 41
            'wp_Cartridge_matching': [42, 1], // 42
            'wp_Offset_size': [44, 1], // 44
            'wp_Slot_grade_Number': [45, 1], // 45
            'wp_Slot_grade_1': [46, 1], // 46
            'wp_Slot_grade_2': [47, 1], // 47
            'wp_Slot_grade_3': [48, 1], // 48
            'wp_Special_projectile': [62, 1], // 62
            'wp_Weapon_skills': [(HexRuler + 2), 1] // HexRuler(下一行) + 2
          }
        } else if (data[6] === 0 && data[24] === 1 && data[42] === 2) {
          HexRuler = 18 // 斩味
          HexPointer = {
            'k_Number': [9, 4], // 6~9
            'k_Sharpness_red': [11, 2], // 8~9
            'k_Sharpness_orange': [13, 2], // 10~11
            'k_Sharpness_yellow': [15, 2], // 12~13
            'k_Sharpness_green': [17, 2], // 14~15
            'k_Sharpness_blue': [19, 2], // 16~17
            'k_Sharpness_white': [21, 2], // 08~19
            'k_Sharpness_purple': [23, 2] // 20~21
          }
        } else if (data[6] === 0 && data[16] === 1 && data[26] === 2) {
          HexRuler = 10 // 双刀双属性
          HexPointer = {
            'ws_Number': [9, 4], // 6~9
            'ws_First_attribute': [10, 1], // 10
            'ws_First_attribute_values': [12, 2, 'wpattribute'], // 11~12
            'ws_Second_attribute': [13, 1], // 13
            'ws_Second_attribute_values': [15, 2, 'wpattribute'] // 14~15
          }
        } else if (data[6] === 0 && data[16] === 1 && data[26] === 2) {
          HexRuler = 27 // 虫
          HexPointer = {
            'ri_Number': [15, 4] // 11~15
          }
        } else if (data[2] === 42 && data[6] === 0 && data[13] === 1 && data[20] === 2) {
          HexRuler = 7 // 斩瓶
          HexPointer = {
            'sa_Number': [9, 4], // 6~9
            'sa_Attribute': [10, 1], // 10
            'sa_Attribute_value': [12, 2, 'wpattribute'] // 11~12
          }
        } else if (data[2] === 50 && data[6] === 0 && data[13] === 1 && data[20] === 2) {
          HexRuler = 7 // 狩猎笛
          HexPointer = {
            'ww_Number': [9, 4], // 6~9
            'ww_Timbre1': [10, 1], // 10
            'ww_Timbre2': [11, 1], // 11
            'ww_Timbre3': [12, 1] // 12
          }
        } else if (data[6] === 0 && data[14] === 1 && data[22] === 2) {
          HexRuler = 8 // 铳枪
          HexPointer = {
            'gl_Number': [9, 4], // 6~9
            'gl_bombard_type': [11, 2], // 10~11
            'gl_bombard_level': [13, 2] // 12~13
          }
        } else if (data[2] === 120 && data[6] === 0 && data[17] === 1 && data[28] === 1) {
          HexRuler = 10 // 技能
          HexPointer = {
            'sk_Number': [7, 2], // 6~9
            'sk_level': [8, 1], // 8
            'sk_First_effect': [10, 2], // 9~10
            'sk_Second_effect': [12, 2] // 11~12
          }
        } else if (data[0] === 166 && data[1] === 1 && data[2] === 20) {
          HexRuler = 6 // 弓瓶
          HexPointer = {
            'bt_Number': 'auto',
            'bt_chopping': [7, 1], // 6~9
            'bt_enhance': [8, 1], // 10~11
            'bt_paralysis': [9, 1], // 12~13
            'bt_poison': [10, 1], // 12~13
            'bt_sleep': [11, 1], // 12~13
            'bt_bomb': [12, 1] // 12~13
          }
        } else if (data[10] === 1 && data[59] === 2 && data[123] === 3) {
          HexRuler = 60 // 装备
          HexPointer = {
            'eq_Number': [59, 1],
            'eq_Type': [16, 1], // 6~9
            'eq_Variant': [12, 1], // 10~11
            'eq_Defense': [18, 2], // 12~13
            'eq_Rarity': [26, 1], // 12~13
            'eq_Money': [30, 4], // 12~13
            'eq_Patience1': [31, 1, 'wpattribute'], // 12~13
            'eq_Patience2': [32, 1, 'wpattribute'], // 12~13
            'eq_Patience3': [33, 1, 'wpattribute'], // 12~13
            'eq_Patience4': [34, 1, 'wpattribute'], // 12~13
            'eq_Patience5': [35, 1, 'wpattribute'], // 12~13
            'eq_Slot_grade_Number': [36, 1],
            'eq_Slot_grade_1': [37, 1],
            'eq_Slot_grade_2': [38, 1],
            'eq_Slot_grade_3': [39, 1],
            'qe_Weapon_skills1': [41, 2],
            'qe_Weapon_skillslv1': [42, 1],
            'qe_Weapon_skills2': [44, 2],
            'qe_Weapon_skillslv2': [45, 1],
            'qe_Weapon_skills3': [47, 2],
            'qe_Weapon_skillslv3': [48, 1],
            'qe_Weapon_skills4': [50, 2],
            'qe_Weapon_skillslv4': [51, 1],
            'qe_Weapon_skills5': [53, 2],
            'qe_Weapon_skillslv5': [54, 1]

          }
        } else {
          HexRuler = data.length // 未知
          HexPointer = {}
        }
        let wplist = []
        for (let l = data.length / HexRuler, i = 0; i < l; i++) {
          let wpobj = {}
          wpobj.wp_Hex = (HexRuler * i).toString(16) // 目标地址
          if (HexPointer.eq_Type != null) {
            wpobj.wp_Name = _this.wpname(_this.HexFunction(data, HexPointer.eq_Number, HexRuler, i).vul, _this.HexFunction(data, HexPointer.eq_Type, HexRuler, i).vul)
          } else {
            wpobj.wp_Name = _this.wpname(_this.HexFunction(data, HexPointer.wp_Number, HexRuler, i))
          }
          for (let n in HexPointer) { // 遍历所有属性
            wpobj[n] = _this.Resourceprocessing(_this.HexFunction(data, HexPointer[n], HexRuler, i))
          }
          if (this.sourceitems) { // 加入原始数据
            wpobj.wp_sourcedata = this.sourceitems[i]
          }
          wplist[i] = wpobj
        }
        return wplist
      }
    }
  }
</script>