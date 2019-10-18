<template>
    <v-container>
        <v-row>
            <v-col
            v-for="n in 25"
            :key="n"
            cols="auto"
            >
            <v-card
                elevation="1"
                height="30"
                width="30"
            >
                <v-row
                class="fill-height"
                align="center"
                justify="center"
                v-text="n - 1"
                ></v-row>
            </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>