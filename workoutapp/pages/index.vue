<template>
  <main>
    <div class="isMain" style="height: 90vh">
        <div class="container pt-5 pb-3 mt-5" id="custom-cards">
            <h2 v-if="$auth.$state.loggedIn"
            class="pb-2 border-bottom text-center"
            style="color:rgb(57, 165, 17);">Hello {{$auth.user.username}}</h2>

        </div>
        <div class="container  my-4 pb-3">
            <div class="text-center row">
                <div  class="col-12 d-flex justify-content-center">
                    <div id="beginGame" class="px-3"> 
                        Insert Coin to Start Workout
                    </div>
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
                                <img height="auto" width="100px" src="/images/workout.png" alt="" class="my-3">
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
    </div>
    <div class="isMobile justify-center align-center">



    <div class="row mt-5 pt-5 d-flex">
        <div class="col-1"></div>
        <div v-if="$auth.$state.loggedIn" class="col-10 topCard container">

          <div class="row" style="width: 100%" >
            <div class="todaysDate" style="height:auto">
                  Hello {{$auth.$state.user.username}}
                </div>
              <div class="todaysDate border-bottom" style="height:auto">

                <div class="row-1">
                  <div class="col">
                      <h1 style="font-size: 12px;">
                        {{today}}
                      </h1>                       
                  </div>
                </div>
              </div>
              <div class="todaysWorkout mt-3" @click="$router.push(`/workout/${workout._id}`)">
                    <div class="col" >
                      <div class="row">
                          <h1 style="font-size: 14px; margin:auto;" >Scheduled Workout</h1>
                      </div>
                      <div class="row mt-3">
                        <h1 style="font-size: 10px; color: white; margin: auto;" > {{workout.name}}</h1>
                      </div>                     
                    </div>
              </div> 
              <div class="todaysWorkout" @click="$router.push('/workout/new')">
                    <div class="col" >
                      <div class="row">
                          <h1 style="font-size: 10px; margin: auto;" >Create New Workout</h1>
                      </div>              
                    </div>
              </div> 
              <div class="todaysWorkout" @click="$router.push('/workouts')">
                <div class="col">
                  <div class="row">
                    <h1 style="font-size: 10px; margin: auto;">Browse Your Workouts</h1>
                  </div>
                </div>
              </div>   
              <div style="height: 50px; font-size: 14px;" class="todaysDate border-bottom">
                Go To Your Workouts
              </div>
              <div class="todaysDate"  style="height: 50px;">
                <div class="col bottom-cards-1 mr-1" @click="$router.push('/incompleteWorkouts')">
                  <h1 style="font-size: 8px; margin: auto;">Incomplete</h1>
                </div>
                <div class="col bottom-cards-2 ml-1" @click="$router.push('/completedWorkouts')">
                  <h1 style="font-size: 8px; margin: auto;" >Completed</h1>
                </div>
              </div> 
          </div>


        </div>
        <div v-else class="col-10 topCard container" style="height: 425px">
          <div class="row" style="width: 100%; height: 100px" >
            <div class="todaysDate" style="height:100px">
              Welcome to Big Man's League
            </div>
            <div class="todaysDate border-bottom" style="height:auto">

              <div class="row-1 mb-3">
                <div class="col">
                  <img height="50px"  src="/images/workout.png" class="fab fa-mdb fa-4x">                    
                </div>
              </div>
            </div>
            <div class="todaysWorkout mt-3"  @click="$router.push('/register')">
                <div class="col" >
                  <div class="row">
                      <h1 style="font-size: 15px; margin: auto;" >Register</h1>
                  </div>              
                </div>
              </div> 
              <div class="todaysWorkout mt-3" style=" box-shadow: 0 15px 60px rgb(57, 165, 17);"  @click="$router.push('/login')">
                <div class="col">
                  <div class="row">
                    <h1 class="text-light" style="font-size: 15px; margin: auto;">Sign In</h1>
                  </div>
                </div>
              </div>   
          </div>

        </div>
        <div class="col-1"></div>  
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

/* MOBILE PHONE */
@media only screen and (max-width: 500px)  {
  #workoutCard {
    display: flex;
    width: auto;
    margin: auto;
  }
  #pageNumber {
    float: left;
    font-size: 10px;
    padding-bottom: 100px;
  }
  #pageTitle {
    font-size: 12px;
  }
  #cardSection {
    margin-top: 150px;
  }
  .paginationMobile {
    font-size: 8px;
  }

  .isMain {
    display: none;
  }

  .topCard {
    backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, 0.625);
    height: 70vh;
    width: 100%;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    box-shadow: 0 15px 60px; 
  }

  .todaysDate {
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 75px;
    
  }

  .topCard p {
    display: inline;
    margin: auto;
  }

  .todaysWorkout {
    background-color: rgb(0, 0, 0);
    height: 75px;
    width: 100%;
    border-radius: 49px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 15px 60px blueviolet; 
  }

  .todaysWorkout:hover {
    cursor: pointer;
    background-color: rgba(134, 42, 221, 0.462);
    box-shadow: 0 10px 15px rgb(57, 165, 17);
    color: white;
  }



  .bottom-cards-1 {
    background-color: red;
    height: 100%;
    width: 100%;
    border-radius: 49px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    box-shadow: 0 15px 60px;  
  }

  .bottom-cards-2 {
    background-color: rgb(57, 165, 17);
    height: 100%;
    width: 100%;
    border-radius: 49px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    box-shadow: 0 15px 60px;  
  }



  .bottom-cards-1:hover {
    cursor: pointer;
    background-color: black;
    border: 2px solid red;
    color: red;
    box-shadow: 0 10px 15px red;
  }

  .bottom-cards-2:hover {
    cursor: pointer;
    background-color: black;
    border: 2px solid rgb(57, 165, 17);
    color: rgb(57, 165, 17);
    box-shadow: 0 10px 15px rgb(57, 165, 17);
  }

}
@media only screen and (min-width: 500px)  {
    .isMobile {
      display: none;
    }
  }
</style>

<script>
import moment from 'moment';

export default {
    async asyncData({$axios,$auth}) {
      if($auth.$state.loggedIn) {
        let response = await $axios.$post('/api/workout', {isMainPage: true});


        let workout = response.workouts[0];
        
                  

        return {
          workout: workout,
          today: moment().format('MMM Do YYYY')
        }
      }

    }        
}

</script>




