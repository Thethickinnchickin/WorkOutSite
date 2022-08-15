<template>
<div v-if="pageNotFound">
    <ErrorPage/>
</div>
<div v-else>
    <main class="py-5 text-center container mt-5 pt-5" style="width: 100%">
    <div v-if="!loading" class="loading">
            <div class="container">
                <div v-if="!loading" class="row py-lg-5 mt-5">
                    <div class="col-lg-6 col-md-8 mx-auto" style="width: 50%">
                        <h1 class="text-center">{{workout.name}}<br/></h1>
                        <p class="text-light">Notes:</p><p class="text-center text-light">{{workout.notes}}<br></p>
                        <button style="background-color: blue" v-if="!workout.isCompleted" @click=editWorkout(workout._id) 
                        class="glow-on-hover mt-2">Edit</button>
                        <button style="background-color:  #FF0800" class="glow-on-hover mt-2" v-b-modal.modal-1>Delete</button>
                        <b-modal :hide-footer="true" id="modal-1" title="Hold On">
                            <p class="my-4">Are You sure about deleting this workout? It cannot be undone</p>
                            <b-button class="btn btn-danger" :disabled="!canDelete"  @click="onWorkoutDelete">Delete</b-button>
                        </b-modal>
                        <button  class="glow-on-hover mt-2" v-b-modal.duplicate>Duplicate</button>
                        <b-modal :hide-footer="true" id="duplicate" title="Hold On">
                            <p class="my-4">Select Date You Want Duplicated Workout to be On</p>
                            <div class="form-floating">
                                <input required type="date" pattern="\d{4}-\d{2}-\d{2}" v-model="date" class="form-control" id="floatingPassword">
                                <label for="floatingPassword">Workout Date</label>
                            </div>
                            <b-button class="btn btn-warning" @click="onWorkoutDuplicate" :disabled="!canDelete">Duplicate</b-button>
                        </b-modal>

                    </div>
                </div>        
            </div>


            
            <div v-if="!loading"  class="row">
                <div class="col-12 rounded my-2"
                style="color: rgb(57, 165, 17); height: 65px;">
                <h1 class="text-center mt-2">{{workout.dateScheduled}}</h1></div>

            </div>

            <div v-if="!loading"  class="row my-3" style="border: none">
                <div class="col-md-6">
                    <div class="row g-0 rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div class="col p-4 d-flex flex-column position-static">
                        <a  v-if="!workout.isCompleted && warmupList.length > 0"  :href="'/warmupExercises/' + workout._id"
                        class="stretched-link text-light" id="beginWorkout">Begin WarmUp</a>
                        <a  v-else-if="!workout.isCompleted" 
                        :href="'/newexercise/' + workout._id" class="stretched-link text-light"
                        style="font-size: 25px">Add Exercise To Warm up</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                <div  class="row g-0 rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div class="col p-4 d-flex flex-column position-static">
                    <a  v-if="!workout.isCompleted  && workoutList.length > 0"  :href="'/workoutExercises/' + workout._id"
                    class="stretched-link" id="beginWorkout" style="color: rgb(255,215,0)">Begin Workout</a>
                    <a  v-else-if="!workout.isCompleted" 
                    :href="'/newexercise/' + workout._id" class="stretched-link"
                    style="font-size: 25px">Add Exercise To Workout</a>
                    </div>
                </div>
                </div>
            </div>
            <button  v-if="!workout.isCompleted"  @click="onRouteChange(`/newexercise/${workout._id}`)"
            class="text-center btn btn-sm btn-success mb-5" id="addExercise">Add Exercise +</button>
            <!-- Warm up exercises -->
            <div v-if="warmupList.length > 0" class="col-md-12">
                <h1 class="text-light mb-4">Warm up Exercises: </h1>
            <div class="container">
                <div class="row text-center">
                    <div v-for="exercise of warmupList" class="col-lg-4">
                        <div class="card card-margin" style="background-color: black; border: 2px solid rgb(57, 165, 17)">
                            <div class="card-body p-3">
                                <div class="widget-49 mt-3 pr-3" style="height: 300px; width: auto">

                                    <div class="widget-49-meeting-info float-center">
                                        
                                    </div>
                                    <ul style="list-style: none" class="widget-49-meeting-info mb-5">
                                        <li class="widget-49-meeting-item text-light">
                                            <span style="color: rgb(255,215,0)" class="widget-49-pro-title text-center mb-3">{{exercise.name}}</span></li>
                                        <li><span>Total Sets: <span style="color: #7FFFD4">{{exercise.sets.length}}</span></span></li>
                                        <li class="widget-49-meeting-item text-light"><span>Notes:</span></li>
                                        <li class="widget-49-meeting-item text-light mt-1"><p style="font-size: 8px">{{exercise.notes}}</p></li>
                                        <li>
                                        <button 
                                            id="addExercise"
                                                class="btn btn-sm btn-flash-border-primary2 mt-2"
                                                @click="showModal(exercise._id)">
                                                View Exercise</button>
                                        
                                        </li>
                                        <li class="mt-3" v-if="exercise.isCompleted">
                                            <h1 style="color: rgb(255,215,0)">&#9745;</h1><p style="border: 2px solid rgb(255,215,0);color: rgb(57, 165, 17); width: auto">Completed</p>
                                            <p style="'color: rgb(57, 165, 17)'">Good Job!</p>
                                        </li>       
                                        <li class="mt-3" v-if="!exercise.isCompleted">
                                            <h1 style="color: red">&#9634;</h1><p 
                                            style="border: 2px solid red;color: red; width: auto">Incomplete</p>
                                            <p style="color: red">Keep Going!</p>
                                        </li>
                                        <WorkoutModal
                                            :id="exercise._id"
                                            :workout="workout"
                                            :exercise="exercise"
                                            :canDuplicate="canDuplicate"
                                            v-show="openedModal === exercise._id"
                                            @close="closeModal"
                                            @duplicateExercise="onExerciseDuplication(exercise)"
                                        />         
                                    </ul>
                                    <div class="widget-49-meeting-info mt-5">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <!-- Exercises -->
            <div class="col-md-12">
                <h1 v-if="workoutList.length > 0" class="text-light mb-3">Exercises</h1>
                <div class="container">
                    <div class="row">
                        <div v-for="exercise of workoutList" class="col-lg-4">
                            <div class="card card-margin" style="background-color: black; border: 2px solid rgb(57, 165, 17)">
                                <div class="card-body p-3">
                                    <div class="widget-49 mt-3 pr-3" style="height: 300px; width: auto">

                                        <div class="widget-49-meeting-info float-center">
                                            
                                        </div>
                                        <ul style="list-style: none" class="widget-49-meeting-info mb-5">
                                            <li class="widget-49-meeting-item text-light">
                                                <span style="color: rgb(255,215,0)" class="widget-49-pro-title text-center mb-3">{{exercise.name}}</span></li>
                                            <li><span>Total Sets: <span style="color: #7FFFD4">{{exercise.sets.length}}</span></span></li>
                                            <li class="widget-49-meeting-item text-light"><span>Notes:</span></li>
                                            <li class="widget-49-meeting-item text-light"><p style="font-size: 8px;">{{exercise.notes}}</p></li>
                                            <li>
                                            <button 
                                            id="addExercise"
                                                class="btn btn-sm btn-flash-border-primary2 mt-2"
                                                @click="showModal(exercise._id)">
                                                View Exercise</button>
                                            </li>
                                            <li class="mt-3" v-if="exercise.isCompleted">
                                                <h1 style="color: rgb(255,215,0)">&#9745;</h1>
                                                <p style="border: 2px solid rgb(255,215,0);color: rgb(57, 165, 17); width: auto">Completed</p>
                                                <p style="'color: rgb(57, 165, 17)'">Good Job!</p>
                                            </li>       
                                            <li class="mt-3" v-if="!exercise.isCompleted">
                                                <h1 style="color: red">&#9634;</h1>
                                                <p style="border: 2px solid red;color: red; width: auto">Incomplete</p>
                                                <p style="color: red">Keep Going!</p>
                                            </li>
                                            <li>
                                                <WorkoutModal
                                                    :id="exercise._id"
                                                    :workout="workout"
                                                    :exercise="exercise"
                                                    :canDuplicate="canDuplicate"
                                                    v-show="openedModal === exercise._id"
                                                    @close="closeModal"
                                                    @duplicateExercise="onExerciseDuplication(exercise)"
                                                />                                       
                                            </li>
                                        </ul>
                                        <div class="widget-49-meeting-info mt-5">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>




            <div v-if="!workout.isCompleted && !loading" class="row">
                <div class="col-12">          
                    <CompleteButton :workoutId="workout._id" />  
                </div>
            </div>

        </div> 
    </main>

    <div v-if="loading">Loading</div>
     
</div>



</template>


<script>
import moment from 'moment'
import CompleteButton from '~/components/Buttons/WorkoutCompleted.vue'
import DeleteExercise from '~/components/modals/DeleteExercise.vue'
import WorkoutModal from '~/components/modals/WorkoutModal.vue'
import ErrorPage from '~/components/ErrorPage.vue'

export default {
    components: {
        CompleteButton,
        DeleteExercise,
        WorkoutModal,
        ErrorPage
    },
    data() {
        return {
            date: null,
            openedModal: null
        }
    },
    async asyncData({$axios, params, $router}) {
        try {
            let loading = true;

            let response =  await $axios.$post(`/api/workout/${params.id}`);

            let workout = response.workout

            workout.dateScheduled = moment(String(workout.dateScheduled))
                .format('MMMM D');

            let warmupList = [];
            let workoutList = [];

            for(let exercise of workout.exercises) {
                if(exercise.warmUpExercise === true) {
                    warmupList.push(exercise);
                } else {
                    workoutList.push(exercise);
                }
            }
        
            loading = false

            return {
                workout: workout,
                warmupList: warmupList,
                workoutList: workoutList,
                loading: loading,
                canDelete: true,
                canDuplicate: true
            }
        } catch (err) {
            console.log(err)
           return {
            pageNotFound: true
           }
        }
    },
    methods: {
        onRouteChange(route) {
            this.$router.push(route);
        },
        editWorkout(route) {
            this.$router.push("/editWorkout/" + route);
        },

        async onWorkoutDelete() {
            this.canDelete = false;
            await this.$axios.$delete('/api/workout', {data: {workoutId: this.workout._id}});

            await this.$router.push('/workouts')
            this.canDelete = true;
        },
        async onWorkoutDuplicate() {
            this.canDelete = false;
            await this.$axios.$post('/api/workout/create/new', {
                duplicate: true,
                workout: {...this.workout},
                dateScheduled: this.date
            });

            
            await this.$router.push('/workouts');
            this.canDelete = true;
        },
        async onExerciseDuplication(exercise) {
            this.canDuplicate = false
            let exerciseData = {
                name: exercise.name,
                notes: exercise.notes,
                workoutId: this.workout._id,
                warmUpExercise: exercise.warmUpExercise,
                exerciseId: exercise._id,
                duplicate: true
            }

            const response = await this.$axios.$post('/api/exercise/create', exerciseData);
            let newExercise = response.exercise;
            newExercise.sets = [];
            for(let set of response.sets) {
                await newExercise.sets.push(set);
            }

            if(exercise.warmUpExercise) {
                await this.warmupList.push(newExercise);                
            } else {
                await this.workoutList.push(newExercise)
            }


            window.location.reload()


        },

        showModal(exerciseId) {
            this.openedModal = exerciseId
        },
        closeModal() {
            this.openedModal = null;
        }
   
    },


}
</script>

<style>
    button {
        pointer-events: initial;
        font-size: 6px;
    }
    h1 {
        color: rgb(57, 165, 17);
    }
    strong {
       color: rgb(57, 165, 17)
    }
    #createButton {
        border: 2px solid rgb(0, 0, 0);
        border-radius: 3px;
        background-color: 	#D21F3C;
        color:rgb(57, 165, 17);
        display: flex;
        justify-content: center;
        width: 50%
    }
    #createButton:hover {
        border: 2px solid 	#D21F3C;
        border-radius: 3px;
        background-color: 	rgba(255,215,0, 0);
        color: white;
    }    
    #exerciseComplete:hover {
        border: 2px solid rgb(57, 165, 17);
        border-radius: 3px;
        background-color: black;
        color:rgba(57, 165, 17);
    }
    #exerciseComplete {
        border: 2px solid 	black;
        border-radius: 3px;
        background-color: rgb(57, 165, 17);
        color: black;
        display: flex;
        justify-content: center;
        width: 50%
    }    
    #addExercise {
        border: 2px solid rgb(57, 165, 17);
        border-radius: 3px;
        background-color: black;
        color:rgb(57, 165, 17);
    }
    #addExercise:hover {
        border: 2px solid rgb(57, 165, 17);
        border-radius: 3px;
        background-color: rgb(57, 165, 17);
        color: black;
    }

    #b-item {
        pointer-events: none;
    }

    #b-item::-webkit-scrollbar {
    -webkit-appearance: none;
    }

    #b-item::-webkit-scrollbar-thumb {
    border-radius: 8px;
    border: 2px solid white; /* should match background, can't be transparent */
    background-color: rgba(0, 0, 0, .5);
    }

    @keyframes blinking{
        60% {
            opacity: 0.2;
        }
    }

    @keyframes cardBlinking{
        60% {
            opacity: .2;
        }
    }


    #beginWorkout {
        animation: blinking 1.5s infinite;
        font-size: 25px;
    }

    .glow-on-hover {
    width: auto;
    height: 50px;
    border: none;
    outline: none;
    color: #fff;
    background: #111;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
}

.glow-on-hover:before {
    content: '';
    background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
    position: absolute;
    top: -2px;
    left:-2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity .3s ease-in-out;
    border-radius: 10px;
}

.glow-on-hover:active {
    color: #000
}

.glow-on-hover:active:after {
    background: transparent;
}

.glow-on-hover:hover:before {
    opacity: 1;
}

.glow-on-hover:after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(57, 165, 17, .5);
    left: 0;
    top: 0;
    border-radius: 10px;
}

@keyframes glowing {
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
}


.card-margin {
    margin-bottom: 1.875rem;
}

.card {
    border: 0;
    box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
    -webkit-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
    -moz-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
    -ms-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
}
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: black;
    background-clip: border-box;
    border: 1px solid #e6e4e9;
    border-radius: 8px;
}

.card .card-header.no-border {
    border: 0;
}
.card .card-header {
    background: none;
    padding: 0 0.9375rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    min-height: 50px;
}
.card-header:first-child {
    border-radius: calc(8px - 1px) calc(8px - 1px) 0 0;
}

.widget-49 .widget-49-title-wrapper {
  display: flex;
  align-items: center;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: black;
  width: 4rem;
  height: 4rem;
  border: 2px solid rgb(57, 165, 17);
  border-radius: 50%;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-primary .widget-49-date-day {
  color: #4e73e5;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-primary .widget-49-date-month {
  color: #4e73e5;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fcfcfd;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-secondary .widget-49-date-day {
  color: #dde1e9;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-secondary .widget-49-date-month {
  color: #dde1e9;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-success {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #e8faf8;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-success .widget-49-date-day {
  color: #17d1bd;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-success .widget-49-date-month {
  color: #17d1bd;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-info {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ebf7ff;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-info .widget-49-date-day {
  color: #36afff;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-info .widget-49-date-month {
  color: #36afff;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-warning {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: floralwhite;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-warning .widget-49-date-day {
  color: #FFC868;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-warning .widget-49-date-month {
  color: #FFC868;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-danger {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #feeeef;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-danger .widget-49-date-day {
  color: #F95062;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-danger .widget-49-date-month {
  color: #F95062;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-light {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fefeff;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-light .widget-49-date-day {
  color: #f7f9fa;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-light .widget-49-date-month {
  color: #f7f9fa;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-dark {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ebedee;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-dark .widget-49-date-day {
  color: #394856;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-dark .widget-49-date-month {
  color: #394856;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-base {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f0fafb;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-base .widget-49-date-day {
  color: #68CBD7;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1;
}

.widget-49 .widget-49-title-wrapper .widget-49-date-base .widget-49-date-month {
  color: #68CBD7;
  line-height: 1;
  font-size: 1rem;
  text-transform: uppercase;
}

.widget-49 .widget-49-title-wrapper .widget-49-meeting-info {
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
}

.widget-49 .widget-49-title-wrapper .widget-49-meeting-info .widget-49-pro-title {
  color: #3c4142;
  font-size: 14px;
}

.widget-49 .widget-49-title-wrapper .widget-49-meeting-info .widget-49-meeting-time {
  color: #B1BAC5;
  font-size: 13px;
}

.widget-49 .widget-49-meeting-points {
  font-weight: 400;
  font-size: 13px;
  margin-top: .5rem;
}

.widget-49 .widget-49-meeting-points .widget-49-meeting-item {
  display: list-item;
  color: #727686;
}

.widget-49 .widget-49-meeting-points .widget-49-meeting-item span {
  margin-left: .5rem;
}

.widget-49 .widget-49-meeting-action {
  text-align: right;
}

.widget-49 .widget-49-meeting-action a {
  text-transform: uppercase;
}



</style>
