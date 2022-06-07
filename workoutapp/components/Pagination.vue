<template>
  <ul class="pagination justify-content-center">
    <li class="page-item">
      <button class="page-link" @click="pageChange('subtract')" tabindex="-1">Previous</button>
    </li>
    <li v-for="index in exerciseLength" class="page-item"><button class="page-link" @click="pageChange('none',index)">{{index}}</button></li>
    <li class="page-item">
      <button class="page-link" @click="pageChange('add')">Next</button>
    </li>
      {{pageNumber}}
  </ul>

</template>



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