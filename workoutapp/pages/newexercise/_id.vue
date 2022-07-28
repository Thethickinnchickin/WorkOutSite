<template>
<main class="text-center mt-5 pt-5" data-new-gr-c-s-check-loaded="14.1062.0" data-gr-ext-installed="">
    
<div class="form-signin col-4 w-100 m-auto">
  <form @submit.prevent="createExercise">
 
    <h1 class="h3 mb-3 fw-normal">Create New Exercise For <span style="color: rgb(255, 55, 0);">{{workout.name}}</span></h1>
    <p class="mb-3">{{workoutDate}}</p>
    <div class="form-floating">
      <input maxlength="20" required v-model="name" type="text" class="form-control" id="floatingInput" placeholder="name">
      <label for="floatingInput">Exercise Name</label>
    </div>
    <div class="form-floating">
      <textarea maxlength="120" v-model="notes" type="text" class="form-control" id="floatingPassword" placeholder="notes"></textarea>
      <label for="floatingPassword">Exercise Notes</label>
    </div>
    <div class="form-floating">
        <input type="checkbox" id="checkbox" v-model="warmupExercise">
        <label for="checkbox">warmup Exercise</label>
    </div>
    <button id="createButton" class="w-100 btn btn-lg btn-primary" type="submit">Create Exercise</button>
  </form>
</div>
</main>

</template>



<script>
import moment from 'moment';

export default {
    layout: 'default',
    data() {
        return {
            name: '',
            notes: '',
            warmupExercise: false
        }
    },
    async asyncData({$axios, params}) {
        try {
           
            let response = await $axios.$post(`/api/workout/${params.id}`)

            let formattedDate = moment(String(response.workout.dateScheduled))
                .format('MM/DD/YYYY');


            return {
                workout: response.workout,
                workoutDate: formattedDate
            }
        } catch (err) {
            return 
        }
    },
      methods: {
    async createExercise() {
      try {
        let exerciseData = {
          name: this.name,
          notes: this.notes,
          warmUpExercise: this.warmupExercise,
          workoutId: this.workout._id
        }
        const response = await this.$axios.$post('/api/exercise/create', exerciseData)


        this.$router.push(`/newset/${response.exercise._id}`)

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
  font-size: 1.5vw;
}
#createButton:hover {
  border: 2px solid black;
  border-radius: 3px;
  background-color: rgb(57, 165, 17);
  color: black;
}
input[type="text"],input[type="date"], textarea[type="text"] {
  background-color: black;
  color: rgb(57, 165, 17);
}
</style>

