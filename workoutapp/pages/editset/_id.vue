<template>
<main class="text-center mt-5 pt-5" data-new-gr-c-s-check-loaded="14.1062.0" data-gr-ext-installed="">
    
<div class="form-signin col-4 w-100 m-auto">
  <form @submit.prevent="updateSet">
 
    <h1 class="h3 mb-3 mt-3 fw-normal">Update Set</h1>
    <div class="form-floating">
      <input 
      v-model="targetRepAmount" :placeholder="set.targetRepAmount || 0" type="number" class="form-control" id="floatingInput"  max="100" min="0">
      <label for="floatingInput">Target Rep Amount</label>
    </div>
    <div class="form-floating">
      <input v-model="targetWeight" :placeholder="set.targetWeight || 0" type="number" class="form-control" id="floatingInput"  max="1000" min="0">
      <label for="floatingInput">Target Weight</label>
    </div>
    <div class="form-floating">
      <input v-model="targetTimeinSeconds" :placeholder="set.targetTimeinSeconds || 0" type="number" class="form-control" id="floatingInput"  max="100" min="0">
      <label for="floatingInput">Target Time In Seconds</label>
    </div>
    <div class="form-floating">
      <input v-model="targetLoad" :placeholder="set.targetLoad || 0" type="number" class="form-control" id="floatingInput" max="100" min="0">
      <label for="floatingInput">Target Load</label>
    </div>
    <div class="form-floating">
      <input v-model="rpe" :placeholder="set.rpe || 0" type="number" class="form-control" id="floatingInput"  max="100" min="0">
      <label for="floatingInput">RPE</label>
    </div>
    <div class="form-floating">
      <input v-model="rest" :placeholder="set.rest || 0" type="number" class="form-control" id="floatingInput"  max="100" min="0">
      <label for="floatingInput">Rest (mins)</label>
    </div>
    <div class="form-floating">
        <input type="checkbox" id="checkbox" v-model="warmupSet">
        <label for="checkbox">warmupSet</label>
    </div>

    <button id="createButton" class="w-100 btn btn-lg btn-primary" type="submit">Update Set</button>
  </form>
</div>


    
  

</main>

</template>


<script>
import moment from 'moment';

export default {
    data() {
        return {
            targetRepAmount: null,
            targetWeight: null,
            targetTimeinSeconds: null,
            targetLoad: null,
            rpe: null,
            rest: null,
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
        let updatedLoad = this.targetLoad
        let updatedRpe = this.rpe
        let updatedRest = this.rest


        if(updatedRep === null) {
            updatedRep = this.set.targetRepAmount
        }
        if(updatedWeight === null) {
            updatedWeight = this.set.tagetWeight
        }
        if(updatedTime === null) {
            updatedTime = this.set.targetTimeinSeconds
        }
        if(updatedLoad === null) {
            updatedLoad = this.set.targetLoad
        }
        if(updatedRest === null) {
          updatedRest = this.set.rest
        }
        if(updatedRpe === null) {
          updatedRpe = this.set.rpe
        }
        


        let setData = {
          targetRepAmount: updatedRep,
          targetWeight: updatedWeight,
          targetTimeInSeconds: updatedTime,
          warmupSet: this.warmupSet,
          targetLoad: updatedLoad,
          rest: updatedRest,
          rpe: updatedRpe,
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

<style>
#createButton {
  border: 2px solid rgb(57, 165, 17);
  border-radius: 3px;
  background-color: black;
  color:rgb(57, 165, 17);
}
#createButton:hover {
  border: 2px solid black;
  border-radius: 3px;
  background-color: rgb(57, 165, 17);
  color: black;
}
input[type="number"], textarea[type="text"] {
  background-color: black;
  color: rgb(57, 165, 17);
}
</style>