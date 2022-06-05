<template>
<body class="text-center mt-5 pt-5" data-new-gr-c-s-check-loaded="14.1062.0" data-gr-ext-installed="">
    
<main class="form-signin col-4 w-100 m-auto">
  <form @submit.prevent="updateSet">
 
    <h1 class="h3 mb-3 mt-3 fw-normal">Update Set</h1>
    <div class="form-floating">
      <input 
      v-model="targetRepAmount" :placeholder="set.targetRepAmount || 0" type="number" class="form-control" id="floatingInput">
      <label for="floatingInput">Target Rep Amount</label>
    </div>
    <div class="form-floating">
      <input v-model="targetWeight" :placeholder="set.targetWeight || 0" type="number" class="form-control" id="floatingInput">
      <label for="floatingInput">Target Weight</label>
    </div>
    <div class="form-floating">
      <input v-model="targetTimeinSeconds" :placeholder="set.targetTimeinSeconds || 0" type="number" class="form-control" id="floatingInput">
      <label for="floatingInput">Target Time In Seconds</label>
    </div>
    <div class="form-floating">
        <input type="checkbox" id="checkbox" v-model="warmupSet">
        <label for="checkbox">warmupSet</label>
    </div>

    <button  class="w-100 btn btn-lg btn-primary" type="submit">Create Set</button>
  </form>
</main>


    
  

</body>

</template>


<script>
import moment from 'moment';

export default {
    data() {
        return {
            targetRepAmount: null,
            targetWeight: null,
            targetTimeinSeconds: null,
            warmupSet: false,
        }
    },
    async asyncData({$axios, params}) {
        try {
           
            let response = await $axios.$get(`/api/set/${params.id}`)


            return {
                set: response.set
            }
        } catch (err) {
            return 
        }
    },
      methods: {
    async updateSet() {
      try {

        let updatedRep = this.targetRepAmount
        let updatedWeight = this.targetWeight
        let updatedTime = this.targetTimeinSeconds
        if(updatedRep === null) {
            updatedRep = this.set.targetRepAmount
        }
        if(updatedWeight === null) {
            updatedWeight = this.set.tagetWeight
        }
        if(updatedTime === null) {
            updatedTime = this.set.targetTimeinSeconds
        }


        let setData = {
          targetRepAmount: updatedRep,
          targetWeight: updatedWeight,
          targetTimeInSeconds: updatedTime,
          warmupSet: this.warmupSet,
          setId: this.set._id,
          updateType: "target"
        }
        const response = await this.$axios.$put('/api/set', setData)

        this.$router.back();

      } catch (err) {
        return 
      }

    }
  }    
}


</script>