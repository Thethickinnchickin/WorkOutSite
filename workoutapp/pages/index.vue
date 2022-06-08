<template>
  <main>
    <div class="container px-4 pt-5 pb-3 my-5" id="custom-cards">
        <h2 v-if="$auth.$state.loggedIn" class="pb-2 border-bottom" style="color: black;">Hello {{$auth.user.username}}</h2>

    </div>
    <div class="container my-3 py-3">
        <div class="text-center row">
            <div class="col-12">
                <img style="border-radius: 30px;" height="300px" width="500px" src="images/betterthanyou.jpg" alt="Keven"/>         
            </div>
        </div>        
    </div>



    <div v-if="$auth.$state.loggedIn" class="mt-5 pt-5">
        <div class="container px-lg-5">
            <!-- Page Features-->
            <div class="row gx-lg-5">
                <div  class="col-12 mb-5">
                    <div style="background-color: #B33F40; color: white;" class="card border-0 h-100">
                        <div class="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                            <div class="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4"></div>
                            <img width="100px" src="/images/workout.png" alt="">
                            <h2  class="fs-4 fw-bold">Welcome to Big Man's League Offical Workout App!</h2>
                            <p class="mb-0">Let's get huge</p>
                            <div class="row">
                                <button @click="$router.push('/workouts')"  class="btn btn-primary mt-3 col-4">Go To Workouts</button>   
                                <div class="col-4"></div>  
                                <button @click="$router.push('/workout/new')" class="btn btn-primary mt-3 col-4">Create New Workout </button>                     
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>  

  </main>

</template>

<style scoped>
    button:hover {
        background-color: white;
        color: navy
    }
</style>

<script>
import { mapActions } from "vuex";

export default {
  name: 'IndexPage',


  async asyncData({$axios}) {
      try {
          let response = await $axios.$get('/api/workout');
          let workouts = JSON.parse(JSON.stringify(response.workouts))

          return {
            workouts: workouts
          }
      } catch (err) {
          return
      }
  },
  methods: {
      ...mapActions(["addAllWorkouts"])
  }
}
</script>
