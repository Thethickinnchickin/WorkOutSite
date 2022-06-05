<template>
<body class="text-center mt-5 pt-5" data-new-gr-c-s-check-loaded="14.1062.0" data-gr-ext-installed="">
    
<main class="form-signin col-4 w-100 m-auto">
  <form @submit.prevent="createExercise">
 
    <h1 class="h3 mb-3 fw-normal">Create New Exercise For {{workout.name}}</h1>
    <p class="mb-3">{{workoutDate}}</p>
    <div class="form-floating">
      <input required v-model="name" type="text" class="form-control" id="floatingInput" placeholder="name">
      <label for="floatingInput">Exercise Name</label>
    </div>
    <div class="form-floating">
      <textarea v-model="notes" type="text" class="form-control" id="floatingPassword" placeholder="notes"></textarea>
      <label for="floatingPassword">Exercise Notes</label>
    </div>
    <div class="form-floating">
        <input type="checkbox" id="checkbox" v-model="warmupExercise">
        <label for="checkbox">warmup Exercise</label>
    </div>
    <button  class="w-100 btn btn-lg btn-primary" type="submit">Create Exercise</button>
  </form>
</main>


    
  

</body>

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

            console.log(response)

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
        console.log(response)

        this.$router.push(`/newset/${response.exercise._id}`)

      } catch (err) {
        return 
      }

    }
  }    
}


</script>