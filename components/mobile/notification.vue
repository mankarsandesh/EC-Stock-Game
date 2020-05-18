<template>
  <v-layout row class="justify-center">
    <v-flex xs12 md12>
      <v-data-table
        
        
        :items="notificationData"
        :rows-per-page-items="[10]"
        ref="table"
        class="current-bet"
      >
        <template v-slot:headers="head">
          <tr>
            <th scope="col">{{ $t("msg.titles") }}</th>
            <th scope="col">{{ $t("msg.date") }}</th>
            <th scope="col">{{ $t("msg.preview") }}</th>
          </tr>
        </template>
        <template v-slot:items="item">
          <td>{{ item.item.title }}</td>
          <td>{{ item.item.createdAt }}</td>
          <td>{{ item.item.message }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["notificationData"]
};
</script>

<style scoped>
table {
  border: none;
  /* border:1px solid red; */
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 2px 3px 10px rgb(0, 0, 0, 0.3);
}

.thead-dark {
  border-radius: 10px !important;
  color: #fff;
  background-color: #f5f5f5;
}

.bg-colors {
  font-size: 18px;
  color: #333;
  background-color: #f5f5f5 !important;
  border-bottom: 1px solid #ddd;
  padding: 10px;
}

tbody tr td {
  padding: 20px;
  font-size: 16px;
}
</style>
