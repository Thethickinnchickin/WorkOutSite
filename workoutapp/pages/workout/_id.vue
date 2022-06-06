<template>
<section class="py-5 text-center container mt-5 pt-5">
    <div class="row py-lg-5 mt-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 style="color: #82a43a;">{{workout.dateScheduled}}</h1>
        <p class="lead text-muted">Notes: {{workout.notes}}</p>
        <h1 style="color: #82a43a;">{{workout.name}}</h1>
        <p>
            <a :href="'/editworkout/' + workout._id" class="btn btn-primary my-2">Edit Workout</a>
            <b-button  class="btn-danger" v-b-modal.modal-1>Delete Workout</b-button>
            <b-modal :hide-footer="true" id="modal-1" title="Hold On">
                <p class="my-4">Are You sure about deleting this workout? It cannot be undone</p>
                <b-button class="btn-danger" @click="onWorkoutDelete">Delete</b-button>
            </b-modal>
        </p>
      </div>
    </div>

    <div class="row">
        <div class="col-12 border border-danger rounded my-2" style="color: white; height: 65px;"><h1 class="text-center mt-2">Workout: {{workout.dateScheduled}}</h1></div>

    </div>

    <div class="row my-3">
        <div class="col-md-6">
            <div style="background-color: #82a43a;" class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                <h3 class="mb-0">Warmup</h3>
                <div class="mb-1 text-muted">Exercises: {{workout.exercises.length}}</div>
                <p class="card-text mb-auto">Quote will go here</p>
                <a href="#" class="stretched-link">Begin WarmUp</a>
                </div>
            </div>

        </div>
        <div class="col-md-6">
        <div style="background-color: #B33F40;"  class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
            <h3 class="mb-0">Begin Workout</h3>
            <div class="mb-1 text-muted">Nov 11</div>
            <p class="mb-auto">Exercises: {{workout.exercises.length}}</p>
            <a href="#" class="stretched-link">Begin Workout {{workout.notes}}</a>
            </div>
        </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <div v-for="exercise in workout.exercises" :key="exercise._id">
                <div v-if="exercise.warmUpExercise">
                <b-dropdown 
                    :text="`${exercise.name}`"
                    block
                    variant="info"
                    class="m-2 mt-4"
                    menu-class="w-100"
                >
                <b-dropdown-item  href="#">
                <h3 class="text-center" style="font-size: 20px;">Exercise: {{exercise.name}} <p>Notes: {{exercise.notes}}</p><button style="font-size: 15px" class="btn btn-outline-primary ml-3" @click="onRouteChange(`/editexercise/${exercise._id}`)">Edit Exercise</button>
                <b-button style="font-size: 15px" v-b-modal.modal-delete-exercise class="btn btn-outline-danger ml-3" >Delete</b-button></h3>

                <b-modal :hide-footer="true" id="modal-delete-exercise" title="Wait a seconds...">
                    <p class="my-4">Are You sure about deleting this exercise? It cannot be undone</p>
                    <b-button class="btn-danger" @click="onExerciseDelete(exercise._id, workout._id)">Delete</b-button>
                </b-modal>
                <h3 v-if="exercise.sets.length > 0">Warm up sets:</h3>
                <div v-for="set in exercise.sets" :key="set._id">
                    <ul class="mb-3" v-if="set.warmupSet === true">
                
                        <li>Set: <strong>{{exercise.sets.indexOf(set) + 1}}</strong></li>
                        <li v-if="set.targetRepAmount">Target Reps: <strong>{{set.targetRepAmount}}</strong></li>
                        <li v-if="set.targetWeight">Target Weight: <strong>{{set.targetWeight}}</strong></li>
                        <li v-if="set.targetTimeinSeconds">Target Time: <strong>{{set.targetTimeinSeconds}} secs</strong></li>
                        <li><button @click="onSetDelete(exercise._id, exercise.workoutId, set._id)"  class="btn btn-sm btn-danger mt-2">Delete Set -</button></li>
                        <li><button @click="onRouteChange(`/editset/${set._id}`)" class="btn btn-sm btn-primary mt-2">Edit Set</button></li>
                    </ul>
               
                </div>
                <h3 v-if="exercise.sets.length > 0">Training Sets:</h3>
                <div v-for="set in exercise.sets" :key="set._id">
                    <ul class="mb-3" v-if="set.warmupSet === false">

                        <li>Set: <strong>{{exercise.sets.indexOf(set) + 1}}</strong></li>
                        <li v-if="set.targetRepAmount">Target Reps: <strong>{{set.targetRepAmount}}</strong></li>
                        <li v-if="set.targetWeight">Target Weight: <strong>{{set.targetWeight}}</strong></li>
                        <li v-if="set.targetTimeinSeconds">Target Time: <strong>{{set.targetTimeinSeconds}} secs</strong></li>
                        <li><button @click="onSetDelete(exercise._id, exercise.workoutId, set._id)"  class="btn btn-sm btn-danger mt-2">Delete Set -</button></li>
                        <li><button @click="onRouteChange(`/editset/${set._id}`)" class="btn btn-sm btn-primary mt-2">Edit Set</button></li>
                    </ul>
                </div>


                </b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item >
                    <button @click="onRouteChange(`/newset/${exercise._id}`)" class="text-center btn btn-success" style="font-size: 15px;">Add Set +</button>
                </b-dropdown-item>                
                </b-dropdown>
                </div>
                
            </div>
            <button @click="onRouteChange(`/newexercise/${workout._id}`)" class="text-center btn btn-sm btn-success mt-5" style="font-size: 15px;">Add Exercise +</button>

        </div>
        <div class="col-md-6">
            <div v-for="exercise in workout.exercises" :key="exercise._id">
                <div v-if="!exercise.warmUpExercise">
                <b-dropdown 
                    :text="`${exercise.name}`"
                    block
                    variant="warning"
                    class="m-2 mt-4"
                    menu-class="w-100"
                >

                <b-dropdown-item  href="#">
                <h3 class="text-center" style="font-size: 20px;">Exercise: {{exercise.name}} <p>Notes: {{exercise.notes}}</p><a style="font-size: 15px" class="btn btn-outline-primary ml-3" href="/editexercise/">Edit Exercise</a>
                <b-button style="font-size: 15px" v-b-modal.modal-delete-exercise class="btn btn-outline-danger ml-3" >Delete</b-button></h3>

                <b-modal :hide-footer="true" id="modal-delete-exercise" title="Wait a seconds...">
                    <p class="my-4">Are You sure about deleting this exercise? It cannot be undone</p>
                    <b-button class="btn-danger" @click="onExerciseDelete(exercise._id, workout._id)">Delete</b-button>
                </b-modal>
                <h3 v-if="exercise.sets.length > 0">Warm up sets:</h3>
                <div v-for="set in exercise.sets" :key="set._id">
                    <ul class="mb-3" v-if="set.warmupSet === true">
                
                        <li>Set: <strong>{{exercise.sets.indexOf(set) + 1}}</strong></li>
                        <li v-if="set.targetRepAmount">Target Reps: <strong>{{set.targetRepAmount}}</strong></li>
                        <li v-if="set.targetWeight">Target Weight: <strong>{{set.targetWeight}}</strong></li>
                        <li v-if="set.targetTimeinSeconds">Target Time: <strong>{{set.targetTimeinSeconds}}</strong></li>
                        <li><button @click="onSetDelete(exercise._id, exercise.workoutId, set._id)"  class="btn btn-sm btn-danger mt-2">Delete Set -</button></li>
                        <li><button @click="onRouteChange(`/editset/${set._id}`)" class="btn btn-sm btn-primary mt-2">Edit Set</button></li>
                    </ul>
               
                </div>
                <h3 v-if="exercise.sets.length > 0">Training Sets:</h3>
                <div v-for="set in exercise.sets" :key="set._id">
                    <ul class="mb-3" v-if="set.warmupSet === false">

                        <li>Set: <strong>{{exercise.sets.indexOf(set) + 1}}</strong></li>
                        <li v-if="set.targetRepAmount">Target Reps: <strong>{{set.targetRepAmount}}</strong></li>
                        <li v-if="set.targetWeight">Target Weight: <strong>{{set.targetWeight}}</strong></li>
                        <li v-if="set.targetTimeinSeconds">Target Time: <strong>{{set.targetTimeinSeconds}} secs</strong></li>
                        <li><button @click="onSetDelete(exercise._id, exercise.workoutId, set._id)"  class="btn btn-sm btn-danger mt-2">Delete Set -</button></li>
                        <li><button @click="onRouteChange(`/editset/${set._id}`)" class="btn btn-sm btn-primary mt-2">Edit Set</button></li>
                    </ul>
                </div>


                </b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item >
                    <button @click="onRouteChange(`/newset/${exercise._id}`)" class="text-center btn btn-success" style="font-size: 15px;">Add Set +</button>
                </b-dropdown-item>                
                </b-dropdown>
                </div>
                
            </div>
            <button @click="onRouteChange(`/newexercise/${workout._id}`)" class="text-center btn btn-sm btn-success mt-5" style="font-size: 15px;">Add Exercise +</button>

        </div>
    </div>

</section>
</template>


<script>
import moment from 'moment'
import DialogModal from '~/components/modals/DialogModal.vue'

export default {
    components: {
        DialogModal
    },
    data() {
        return {
            modalShow: false,
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
strong {
    color: maroon;
}
</style>
