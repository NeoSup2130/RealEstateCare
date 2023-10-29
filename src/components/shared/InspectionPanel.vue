<template>
    <v-expansion-panels variant="accordion">
        <v-expansion-panel v-for="(category, index) in Object.keys(inspection)" :key="index">
            <v-expansion-panel-title expand-icon="mdi-menu-down">
                {{ category }}
            </v-expansion-panel-title>
            <v-expansion-panel-text class="pa-4">
                <table>
                    <tbody>
                        <tr v-for="[key, value, index] of Object.entries(inspection[category])" :key="index">
                            <th>{{key}}:</th>
                            <td>{{value}}</td>
                        </tr>
                    </tbody>
                </table>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
    export default {
        name: "InspectionPanel",
        props : {
            inspection : Object
        }
    }
</script>

<style scoped>
table {
    width: 100%;
}
th, td {
    width: 50%;
    text-align: left;
}
th {
    vertical-align: text-top;
}
</style>