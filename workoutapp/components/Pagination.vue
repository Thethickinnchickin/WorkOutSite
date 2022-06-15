<template>
  <ul class="pagination justify-content-center">
    <li class="page-item">
      <button class="page-link" @click="pageChange('subtract')" tabindex="-1">Previous</button>
    </li>
    <li v-for="index in exerciseLength" :key="index" class="page-item"><button class="page-link" @click="pageChange('none',index)">{{index}}</button></li>
    <li class="page-item">
      <button class="page-link" @click="pageChange('add')">Next</button>
    </li>
      {{pageNumber}}
  </ul>

</template>

<style>
.pagination > li > button
{
    background-color: black;
    color: rgb(57, 165, 17);
}

.pagination > li > button:focus,
.pagination > li > button:hover,
.pagination > li > span:focus,
.pagination > li > span:hover
{
    color: #5a5a5a;
    background-color: black;
    border-color: #ddd;
}

.pagination > .active > button
{
    color: white;
    background-color: #5A4181 !Important;
    border: solid 1px #5A4181 !Important;
}

.pagination > .active > button:hover
{
    background-color: #5A4181 !Important;
    border: solid 1px #5A4181;
}
</style>



<script>
export default {
    props: ["pageNumber", "exerciseLength"],
    methods: {
        pageChange(changeType, pageNumber) {
            if(changeType === "add") {
                if(this.pageNumber >= 1 && this.pageNumber < this.exerciseLength) {
                    this.pageNumber++;
                }
            } else if (changeType === "subtract") {
                if(this.pageNumber > 1 && this.pageNumber <= this.exerciseLength) {
                    this.pageNumber--;
                }

            } else {
                this.pageNumber = pageNumber
            }
        }
    }
}
</script>