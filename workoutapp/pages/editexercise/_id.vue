<template>
<main class="text-center mt-5 pt-5" data-new-gr-c-s-check-loaded="14.1062.0" data-gr-ext-installed="">
    
<div class="form-signin col-4 w-100 m-auto">
  <form @submit.prevent="updateExercise">
 
    <!-- <h1 class="h3 mb-3 fw-normal">Create New Exercise For {{workout.name}}</h1>
    <p class="mb-3">{{workoutDate}}</p> -->
    <h1>Edit Exercise: <strong>{{exercise.name}}</strong></h1>
    <div class="form-floating">
      <input v-model="name" type="text" class="form-control" id="floatingInput" :placeholder="exercise.name">
      <label for="floatingInput">Exercise Name</label>
    </div>
    <div class="form-floating">
      <textarea v-model="notes" type="text" class="form-control" id="floatingPassword" :placeholder="exercise.notes"></textarea>
      <label for="floatingPassword">Exercise Notes</label>
    </div>
    <div class="form-floating">
        <input  type="checkbox" id="checkbox"  v-model="warmupExercise">
        <label for="checkbox">warmup Exercise</label>
    </div>
    <button id="createButton" class="w-100 btn btn-lg btn-primary" type="submit">Update Exercise</button>
  </form>
</div>
</main>
</template>

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
input[type="text"], textarea[type="text"] {
  background-color: black;
  color: rgb(57, 165, 17);
}

</style>

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
           
            let response = await $axios.$get(`/api/exercise/${params.id}`, {data: {something: "Hey"}})


            return {
                exercise: response.exercise,
            }
        } catch (err) {
            return 
        }
    },
    methods: {
    async updateExercise() {
      try {
        console.log(this.warmupExercise)
        let updatedName = this.name
        let updatedNotes = this.notes
        if(this.name === "") {
          updatedName = this.exercise.name
        }

        if(this.notes === "") {
          updatedNotes = this.exercise.notes
        }

        let exerciseData = {
          name: updatedName,
          notes: updatedNotes,
          warmUpExercise: this.warmupExercise,
          exerciseId: this.exercise._id
        }
        const response = await this.$axios.$put('/api/exercise', exerciseData)

        this.$router.back();

      } catch (err) {
        return 
      }

    }
  }    
}


</script>