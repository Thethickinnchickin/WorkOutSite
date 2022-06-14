<template>
<main class="py-5 text-center container mt-5 pt-5" style="width: 100%">
    <div class="row py-lg-5 mt-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 style="color: rgb(57, 165, 17);">{{workout.dateScheduled}}</h1>
        <p class="lead text-muted">Notes: {{workout.notes}}</p>
        <h1>{{workout.name}}</h1>
        <p >
            <a v-if="!workout.isCompleted" :href="'/editworkout/' + workout._id" class="btn btn-outline-primary my-2">Edit Workout</a>
            <b-button  class="btn-outline-danger" v-b-modal.modal-1>Delete Workout</b-button>
            <b-modal :hide-footer="true" id="modal-1" title="Hold On">
                <p class="my-4">Are You sure about deleting this workout? It cannot be undone</p>
                <b-button class="btn"  @click="onWorkoutDelete">Delete</b-button>
            </b-modal>


  
        </p>

      </div>
    </div>

    <div class="row">
        <div class="col-12 rounded my-2" style="color: rgb(57, 165, 17); height: 65px; border:2px solid rgb(12, 247, 255);"><h1 class="text-center mt-2">Workout: {{workout.dateScheduled}}</h1></div>

    </div>

    <div class="row my-3">
        <div class="col-md-6">
            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                <h3 class="mb-0">Warmup</h3>
                <p class="card-text mb-auto">Quote will go here</p>
                <a  v-if="!workout.isCompleted"  :href="'/warmupExercises/' + workout._id" class="stretched-link">Begin WarmUp</a>
                </div>
            </div>

        </div>
        <div class="col-md-6">
        <div  class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
            <h3 class="mb-0">Workout</h3>
            <p class="mb-auto">Quote</p>
            <a  v-if="!workout.isCompleted"  :href="'/workoutExercises/' + workout._id" class="stretched-link">Begin Workout</a>
            </div>
        </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <div v-for="exercise in workout.exercises" :key="exercise._id">
                <div   v-if="exercise.warmUpExercise">
                <b-dropdown 
                    :text="`${exercise.name}`"
                    block
                    variant="black"
                    class="m-2 mt-4"
                    menu-class="w-100"
                    id="createButton"
                >
                <b-dropdown-item  href="#">
                <h3  v-if="!workout.isCompleted"  class="text-center" style="font-size: 20px;">Exercise: {{exercise.name}} <p>Notes: {{exercise.notes}}</p><button style="font-size: 15px"
                 class="btn btn-outline-primary mb-3 ml-3" @click="onRouteChange(`/editexercise/${exercise._id}`)">Edit Exercise</button>
                    <DeleteExercise :workout="workout" :exercise="exercise"/></h3>
                <h3 v-if="exercise.sets.length > 0">Warm up sets:</h3>
                <div v-for="set in exercise.sets" :key="set._id">
                    <ul class="mb-3" v-if="set.warmupSet === true">
                
                        <li>Set: <strong>{{exercise.sets.indexOf(set) + 1}}</strong></li>
                        <li v-if="set.targetRepAmount">Target Reps: <strong>{{set.targetRepAmount}}</strong></li>
                        <li v-if="set.targetRepAmount && exercise.isCompleted">Actual Reps: <strong>{{set.actualRepAmount}}</strong></li>
                        <li v-if="set.targetWeight">Target Weight: <strong>{{set.targetWeight}}</strong></li>
                        <li v-if="set.targetRepAmount && exercise.isCompleted">Actual Weight: <strong>{{set.actualRepAmount}}</strong></li>
                        <li v-if="set.targetTimeinSeconds">Target Time: <strong>{{set.targetTimeinSeconds}} secs</strong></li>
                        <li v-if="set.targetRepAmount && exercise.isCompleted">Actual Time: <strong>{{set.actualRepAmount}}</strong></li>
 <button v-if="!workout.isCompleted"  @click="onSetDelete(exercise._id, exercise.workoutId, set._id)"  class="btn btn-sm btn-outline-danger mt-2">Delete Set -</button>
                        <button v-if="!workout.isCompleted" @click="onRouteChange(`/editset/${set._id}`)" class="btn btn-sm btn-outline-primary mt-2">Edit Set</button>
                    </ul>
               
                </div>
                <h3 v-if="exercise.sets.length > 0">Training Sets:</h3>
                <div v-for="set in exercise.sets" :key="set._id">
                    <ul class="mb-3" v-if="set.warmupSet === false">
                
                        <li>Set: <strong>{{exercise.sets.indexOf(set) + 1}}</strong></li>
                        <li v-if="set.targetRepAmount">Target Reps: <strong>{{set.targetRepAmount}}</strong></li>
                        <li v-if="set.targetRepAmount && exercise.isCompleted">Actual Reps: <strong>{{set.actualRepAmount}}</strong></li>
                        <li v-if="set.targetWeight">Target Weight: <strong>{{set.targetWeight}}</strong></li>
                        <li v-if="set.targetRepAmount && exercise.isCompleted">Actual Weight: <strong>{{set.actualRepAmount}}</strong></li>
                        <li v-if="set.targetTimeinSeconds">Target Time: <strong>{{set.targetTimeinSeconds}} secs</strong></li>
                        <li v-if="set.targetRepAmount && exercise.isCompleted">Actual Time: <strong>{{set.actualRepAmount}}</strong></li>
 <button v-if="!workout.isCompleted"  @click="onSetDelete(exercise._id, exercise.workoutId, set._id)"  class="btn btn-sm btn-outline-danger mt-2">Delete Set -</button>
                        <button v-if="!workout.isCompleted" @click="onRouteChange(`/editset/${set._id}`)" class="btn btn-sm btn-outline-primary mt-2">Edit Set</button>
                    </ul>
                </div>


                </b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item  v-if="!workout.isCompleted"  >
                    <button  @click="onRouteChange(`/newset/${exercise._id}`)" class="text-center btn btn-outline-success" style="font-size: 15px;">Add Set +</button>
                </b-dropdown-item>                
                </b-dropdown>
                </div>
                
            </div>
            <button  v-if="!workout.isCompleted"  @click="onRouteChange(`/newexercise/${workout._id}`)" class="text-center btn btn-sm mt-5"  id="createButton" style="font-size: 15px;">Add Exercise +</button>

        </div>
        <div class="col-md-6">
            <div v-for="exercise in workout.exercises" :key="exercise._id">
                <div v-if="!exercise.warmUpExercise">
                <b-dropdown 
                    :text="`${exercise.name}`"
                    block
                    variant="none"
                    class="m-2 mt-4"
                    menu-class="w-100"
                    id="createButton"
                >
                <b-dropdown-item  href="#">
                <h3  v-if="!workout.isCompleted"  class="text-center" style="font-size: 20px;">Exercise: {{exercise.name}} <p>Notes: {{exercise.notes}}</p><button style="font-size: 15px"
                 class="btn btn-outline-primary ml-3" @click="onRouteChange(`/editexercise/${exercise._id}`)">Edit Exercise</button>
                 
                    <DeleteExercise :workout="workout" :exercise="exercise"/></h3>
                <h3 v-if="exercise.sets.length > 0">Warm up sets:</h3>
                <div v-for="set in exercise.sets" :key="set._id">
                    <ul class="mb-3" v-if="set.warmupSet === true">
                
                        <li>Set: <strong>{{exercise.sets.indexOf(set) + 1}}</strong></li>
                        <li v-if="set.targetRepAmount">Target Reps: <strong>{{set.targetRepAmount}}</strong></li>
                        <li v-if="set.targetRepAmount && exercise.isCompleted">Actual Reps: <strong>{{set.actualRepAmount}}</strong></li>
                        <li v-if="set.targetWeight">Target Weight: <strong>{{set.targetWeight}}</strong></li>
                        <li v-if="set.targetRepAmount && exercise.isCompleted">Actual Weight: <strong>{{set.actualRepAmount}}</strong></li>
                        <li v-if="set.targetTimeinSeconds">Target Time: <strong>{{set.targetTimeinSeconds}} secs</strong></li>
                        <li v-if="set.targetRepAmount && exercise.isCompleted">Actual Time: <strong>{{set.actualRepAmount}}</strong></li>
                        <button v-if="!workout.isCompleted"  @click="onSetDelete(exercise._id, exercise.workoutId, set._id)"  class="btn btn-sm btn-outline-danger mt-2">Delete Set -</button>
                        <button v-if="!workout.isCompleted" @click="onRouteChange(`/editset/${set._id}`)" class="btn btn-sm btn-outline-primary mt-2">Edit Set</button>
                    </ul>
               
                </div>
                <h3 v-if="exercise.sets.length > 0">Training Sets:</h3>
                <div v-for="set in exercise.sets" :key="set._id">
                    <ul class="mb-3" v-if="set.warmupSet === false">
                
                        <li>Set: <strong>{{exercise.sets.indexOf(set) + 1}}</strong></li>
                        <li v-if="set.targetRepAmount">Target Reps: <strong>{{set.targetRepAmount}}</strong></li>
                        <li v-if="set.targetRepAmount && exercise.isCompleted">Actual Reps: <strong>{{set.actualRepAmount}}</strong></li>
                        <li v-if="set.targetWeight">Target Weight: <strong>{{set.targetWeight}}</strong></li>
                        <li v-if="set.targetRepAmount && exercise.isCompleted">Actual Weight: <strong>{{set.actualRepAmount}}</strong></li>
                        <li v-if="set.targetTimeinSeconds">Target Time: <strong>{{set.targetTimeinSeconds}} secs</strong></li>
                        <li v-if="set.targetRepAmount && exercise.isCompleted">Actual Time: <strong>{{set.actualRepAmount}}</strong></li>
                        <button v-if="!workout.isCompleted"  @click="onSetDelete(exercise._id, exercise.workoutId, set._id)"  class="btn btn-sm btn-outline-danger mt-2">Delete Set -</button>
                        <button v-if="!workout.isCompleted" @click="onRouteChange(`/editset/${set._id}`)" class="btn btn-sm btn-outline-primary mt-2">Edit Set</button>
                    </ul>
                </div>


                </b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item  v-if="!workout.isCompleted"  >
                    <button  @click="onRouteChange(`/newset/${exercise._id}`)" class="text-center btn btn-outline-success" style="font-size: 15px;">Add Set +</button>
                </b-dropdown-item>                
                </b-dropdown>
                </div> 
            </div>
            <button  v-if="!workout.isCompleted"  @click="onRouteChange(`/newexercise/${workout._id}`)" class="text-center btn btn-sm btn-success mt-5" id="createButton" >Add Exercise +</button>

        </div>
    </div>
    <div v-if="!workout.isCompleted" class="row">
        <div class="col-12">          
            <CompleteButton :workoutId="workout._id" />  
        </div>
    </div>

</main>
</template>


<script>
import moment from 'moment'
import CompleteButton from '~/components/Buttons/WorkoutCompleted.vue'
import DeleteExercise from '~/components/modals/DeleteExercise.vue'

export default {
    components: {
        CompleteButton,
        DeleteExercise
    },
    data() {
        return {
            modalShow: false
        }
    },
    async asyncData({$axios, params}) {
        try {
            let response =  await $axios.$post(`/api/workout/${params.id}`);

            let workout = response.workout

            workout.dateScheduled = moment(String(workout.dateScheduled))
                .format('MM/DD/YYYY');
            



            return {
                workout: workout
            }
        } catch (err) {
            console.log(err);
        }
    },
    methods: {
        onRouteChange(route) {
            this.$router.push(route);
        },
        async onSetDelete(exerciseId, workoutId, setId) {
            let response = await this.$axios.$delete('/api/set', {data: {exerciseId: exerciseId, setId: setId}});

            for(let exercise of this.workout.exercises) {
                if(exercise.sets.length > 0) {
                    var filtered = exercise.sets.filter(function(value, index, arr){ 
                        return value._id != setId;
                    });
                    exercise.sets = filtered;
                }

            }

            this.$router.push(`/workout/${workoutId}`)
        },
        async onWorkoutDelete() {
            await this.$axios.$delete('/api/workout', {data: {workoutId: this.workout._id}});

            

            this.$router.push('/workouts')
        },
        async onExerciseDelete(exerciseId, workoutId) {
            await this.$axios.$delete('/api/exercise', {data: {workoutId: this.workout._id, exerciseId: exerciseId}});

            var filtered = this.workout.exercises.filter(function(value, index, arr){ 
                return value._id != exerciseId;
            });

            this.workout.exercises = filtered

            this.$router.push(`/workout/${workoutId}`)

        },
   
    },


}
</script>

<style>
    h1 {
        color: rgb(57, 165, 17);
    }
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


</style>
