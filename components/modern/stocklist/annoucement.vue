<template>
 
  
     <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col" class="bg-colors">{{$t('msg.titles')}}</th>
            <th scope="col" class="bg-colors">{{$t('msg.date')}}</th>
            <th scope="col" class="bg-colors">{{$t('msg.preview')}}</th>
           </tr>
        </thead>
        <tbody style="text-align:center;">
           <tr  v-for="(item,index) in getAnnoucement" :key="index" class="tabletr">
              <td>{{item.title}}</td>
               <td>{{item.created_at}}</td>
              <td>{{item.messageContent}}</td>
             
          </tr>          
        </tbody>
      </table> 
      


</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      items: ["day", "weeks", "months", "years"]
    };
  },
  mounted() {
    this.asyannoucement();
  },
  methods: {
    ...mapActions(["asyannoucement"])
  },
  computed: {
    ...mapGetters(["getAnnoucement"])
  }
};
</script>

<style scoped>
table{
  border:none;
  /* border:1px solid red; */
  border-radius: 10px;
  background-color: #FFF;
  box-shadow: 5px 10px 18px #888888;
}

.thead-dark{
    border-radius:10px !important;
  color:#FFF;
  background-color:#f5f5f5;
}
.bg-colors{
  font-size:18px;
  color: #333;
  background-color: #f5f5f5 !important;
  border-bottom: 1px solid #ddd;
  padding: 10px;
}
tbody tr td{
 
  padding:20px;
  font-size:16px;
}
</style>