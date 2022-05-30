<template>
<body class="text-center" data-new-gr-c-s-check-loaded="14.1062.0" data-gr-ext-installed="">
    
<main class="form-signin col-4 w-100 m-auto">
  <form @submit.prevent="createWorkout">
 
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
    <button  class="w-100 btn btn-lg btn-primary" type="submit">Create Exercise</button>
  </form>
</main>


    
  

</body>

</template>



<script>
import moment from 'moment';

export default {
    data() {
        return {
            name: '',
            notes: ''
        }
    },
    async asyncData({$axios, params}) {
        try {
            console.log(params)
            let response = await $axios.$get(`/api/workout/${params.id}`)

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
    async createSet() {
      try {
        let workoutData = {
          name: this.name,
          notes: this.notes,
          dateScheduled: this.date
        }
        const response = await this.$axios.$post('/api/workout/create', workoutData)
        

        this.$router.push(`/newexercise/${response.workout._id}`)

      } catch (err) {
        return 
      }

    }
  }    
}


</script>