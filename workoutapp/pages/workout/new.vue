<template>
  <main class="text-center mt-5 pt-5" data-new-gr-c-s-check-loaded="14.1062.0" data-gr-ext-installed=""  style="height: auto">
      
  <div class="form-signin col w-60">
    <form @submit.prevent="createWorkout" style="width: 70vw">
   
      <h1 class="h3 mb-3 fw-normal">Create New Workout</h1>
  
      <div class="form-floating">
        <input maxlength="20" required v-model="name" type="text" class="form-control" id="floatingInput" placeholder="name">
        <label for="floatingInput">Workout Name</label>
      </div>
      <div class="form-floating">
        <textarea maxlength="140" v-model="notes" type="text" class="form-control" id="floatingPassword" placeholder="notes"></textarea>
        <label for="floatingPassword">Notes</label>
      </div>
      <div class="form-floating">
        <input required type="date" pattern="\d{4}-\d{2}-\d{2}" v-model="date" class="form-control" id="floatingPassword">
        <label for="floatingPassword">Workout Date</label>
      </div>
  
      <button  class="w-100 btn btn-lg" id="createButton" type="submit">Create Workout</button>
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
  input[type="text"],input[type="date"], textarea[type="text"] {
    background-color: black;
    color: rgb(57, 165, 17);
  }
  .form-signin {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  
  
  @media only screen and (max-width: 380px) {
      form {
          width: 90vw;
          margin: auto;
          text-align: start;
          color: white;
      }
      #createButton {
          font-size: 10px
      }
  
  }
  
  </style>
  
  
  <script>
  export default {
    layout: 'default',
    data() {
      return {
        name: '',
        notes: '',
        date: null
      }
    },
    methods: {
      async createWorkout() {
        try {
          let workoutData = {
            name: this.name,
            notes: this.notes,
            dateScheduled: this.date
          }
  
          const response = await this.$axios.$post('/api/workout/create/new', workoutData)
          
  
          this.$router.push(`/newexercise/${response.workout._id}`)
  
        } catch (err) {
          console.log(err)
          return 
        }
  
      }
    }
  }
  </script>