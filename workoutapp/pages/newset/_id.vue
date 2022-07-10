<template>
<main class="text-center mt-5 pt-5" data-new-gr-c-s-check-loaded="14.1062.0" data-gr-ext-installed="">
    
<div class="form-signin col-4 w-100 m-auto">
  <form @submit.prevent="createSet">
 
    <h1 class="h3 mb-3 fw-normal">Create New Set For Exercise: <span style="color: rgb(255, 55, 0);">{{exercise.name}}</span></h1>
    <div class="form-floating">
      <input 
      v-model="targetRepAmount" type="number" class="form-control" id="floatingInput"  max="100" min="0">
      <label for="floatingInput">Target Rep Amount</label>
    </div>
    <div class="form-floating">
      <input v-model="targetWeight" type="number" class="form-control" id="floatingInput"  max="100" min="0">
      <label for="floatingInput">Target Weight</label>
    </div>
    <div class="form-floating">
      <input v-model="targetTimeinSeconds" type="number" class="form-control" id="floatingInput"  max="100" min="0">
      <label for="floatingInput">Target Time In Seconds</label>
    </div>
    <div class="form-floating">
      <input v-model="targetLoad" type="number" class="form-control" id="floatingInput"  max="100" min="0">
      <label for="floatingInput">Target Load</label>
    </div>
    <div class="form-floating">
      <input v-model="rpe" type="number" class="form-control" id="floatingInput"  max="100" min="0">
      <label for="floatingInput">RPE</label>
    </div>
    <div class="form-floating">
      <input v-model="rest" type="number" class="form-control" id="floatingInput"  max="100" min="0">
      <label for="floatingInput">Rest (mins)</label>
    </div>
    <div class="form-floating">
        <input type="checkbox" id="checkbox" v-model="warmupSet">
        <label for="checkbox">warmupSet</label>
    </div>

    <button id="createButton" class="w-100 btn btn-lg btn-primary" type="submit">Create Set</button>
  </form>
</div>


    
  

</main>

</template>


<script>
import moment from 'moment';

export default {
    data() {
        return {
            targetRepAmount: 0,
            targetWeight: 0,
            targetTimeinSeconds: 0,
            warmupSet: false,
            targetLoad: 0,
            rpe: 0,
            rest: 0
        }
    },
    async asyncData({$axios, params}) {
        try {
           
            let response = await $axios.$get(`/api/exercise/${params.id}`)


            return {
                exercise: response.exercise
            }
        } catch (err) {
            return 
        }
    },
      methods: {
    async createSet() {
      try {
        let setData = {
          targetRepAmount: this.targetRepAmount,
          targetWeight: this.targetWeight,
          targetTimeinSeconds: this.targetTimeinSeconds,
          targetLoad: this.targetLoad,
          rpe: this.rpe,
          rest: this.rest,
          warmupSet: this.warmupSet,
          exerciseId: this.exercise._id
        }
        const response = await this.$axios.$post('/api/set/create', setData)

        this.$router.push(`/workout/${this.exercise.workoutId}`)

      } catch (err) {
        return 
      }

    }
  }    
}


</script>
<style scoped>
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