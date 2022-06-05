<template>
  <main>
    <div class="container px-4 pt-5 pb-3 mt-5" id="custom-cards">
        <h2 v-if="$auth.$state.loggedIn" class="pb-2 border-bottom" style="color: white;">Hello {{$auth.user.username}}</h2>

        <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
        <div class="col mt-3">
            <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-4 shadow-lg" style="background-image: url('images/pattern-3.jpg');">
            <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">"Take everything"</h2>
            </div>
            </div>
        </div>

        <div class="col mt-3">
            <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-4 shadow-lg" style="background-image: url('images/pattern-2.jpg');">
            <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">"There is Power in stillness"</h2>
            </div>
            </div>
        </div>

        <div class="col mt-3">
            <div class="card card-cover h-100 text-white bg-dark rounded-4 shadow-lg" style="background-image: url('images/pattern-1.jpg');">
            <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">"Put the women and kids to bed"</h2>
            </div>
            </div>
        </div>
        </div>
    </div>


        <div v-if="$auth.$state.loggedIn" class="pt-0">
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
