<template>
  <main>
  <div class="py-5">
            <div class="container px-lg-5">
                <div class="p-4 p-lg-5 bg-light rounded-3 text-center">
                    <div class="m-4 m-lg-5">
                        <h1 class="display-5 fw-bold">A warm welcome!</h1>
                        <p class="fs-4">Bootstrap utility classes are used to create this jumbotron since the old component has been removed from the framework. Why create custom CSS when you can use utilities?</p>
                        <a class="btn btn-primary btn-lg" href="#!">Call to action</a>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="$auth.$state.loggedIn" class="pt-4">
            <div class="container px-lg-5">
                <!-- Page Features-->
                <div class="row gx-lg-5">
                    <div class="col-lg-6 col-xxl-4 mb-5">
                        <div class="card bg-light border-0 h-100">
                            <div class="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                                <div class="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4"></div>
                                <img width="100px" src="/images/workout.png" alt="">
                                <h2 class="fs-4 fw-bold">Fresh new layout</h2>
                                <p class="mb-0">With Bootstrap 5, we've created a fresh new layout for this template!</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>  
        <div v-if="workouts">        
            <button @click="addAllWorkouts(workouts)">Go To Workouts</button>
        </div>  

  </main>

</template>

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
