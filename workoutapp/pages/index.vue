<template>
  <main>
    <div class="container pt-5 pb-3 mt-5" id="custom-cards">
        <h2 v-if="$auth.$state.loggedIn" class="pb-2 border-bottom" style="color:rgb(57, 165, 17);">Hello {{$auth.user.username}}</h2>

    </div>
    <div class="container  my-4 pb-3">
        <div class="text-center row">
            <div  class="col-12 d-flex justify-content-center">
                <div id="beginGame" class="px-3"> 
                    Insert Coin to Start Workout
                </div>
                <!-- <img style="border-radius: 30px;" height="300px" width="500px" src="images/betterthanyou.jpg" alt="Keven"/>          -->
            </div>
        </div>        
    </div>



    <div class="mt-3 pt-2">
        <div class="container px-lg-5" >
            <!-- Page Features-->
            <div class="row gx-lg-5">
                <div  class="col-12 mb-5" >
                    <div style="background-color: black; color: white;" class="card border-0 h-100">
                        <div class="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
                            <div class="feature bg-primary bg-gradient text-white rounded-3 mb-4 mt-n4"></div>
                            <img width="100px" src="/images/workout.png" alt="" class="my-3">
                            <h2  class="fs-4 fw-bold">Welcome to Big Man's League Offical Workout App!</h2>
                            <p class="mb-0">Let's get huge</p>
                            <div  v-if="$auth.$state.loggedIn" class="row">
                                <button style="font-size:1vw;" id=createButton @click="$router.push('/workouts')"  class="btn btn-primary mt-3 col-4">Go To Workouts</button>   
                                <div class="col-4"></div>  
                                <button style="font-size:.75vw;" id="createButton" @click="$router.push('/workout/new')" class="btn btn-primary mt-3 col-4">Create New Workout </button>                     
                            </div>
                            <div  v-else class="row">
                                <button style="font-size:1vw;" id=createButton @click="$router.push('/login')"  class="btn btn-primary mt-3 col-4">Sign In</button>   
                                <div class="col-4"></div>  
                                <button style="font-size:1vw;" id="createButton" @click="$router.push('/register')" class="btn btn-primary mt-3 col-4">New User</button>                     
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
#beginGame {
    animation: blinking 1.5s infinite;
    color: rgb(255,215,0);
    border: 2px solid rgb(255,215,0);
}
@keyframes blinking{
    60% {
    opacity: 0.2;
    }
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
