<template>
    <v-container>
        <v-alert
        border="top"
        colored-border
        type="warning"
        elevation="2"
        >
        {{$t('Explanatory.InsertDataWarning')}}
        </v-alert>
        <v-card>
            <v-toolbar flat color="primary" dark>
            <v-toolbar-title>{{$t('Interface.Tools_insert')}}</v-toolbar-title>
            </v-toolbar>
            <v-tabs vertical>
            <v-tab>
                <v-icon left>mdi-text-box-plus-outline</v-icon>
                {{$t('Explanatory.InsertToAddress')}}
            </v-tab>
            <v-tab>
                <v-icon left>mdi-file-sign</v-icon>
                {{$t('Explanatory.InsertToFSM')}}
            </v-tab>

            <v-tab-item>
                <v-card flat>
                    <DefaultInsert />
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <FsmInster />
                </v-card>

            </v-tab-item>
            </v-tabs>
        </v-card>
    </v-container>
</template>

<script>
import DefaultInsert from './Project/DefaultInsert'
import FsmInster from './Project/FsmInster'

export default {
    components: {
      DefaultInsert,
      FsmInster
    }
}
</script>