<template>
  <div class="modal-backdrop" style="width: auto;">
    <div class="thing" style="background-color: black; opacity: 1;max-height: 70%;max-width: 80%; overflow-y:auto; overflow-x: none;">
        <span id="b-item">
        <div class="row">
            <div class="col">

            </div>
            <div class="col text-center mt-3">
                <h4 style="color: rgb(255,215,0)">{{exercise.name}}</h4>
            </div>      
            <div class="col text-right mt-3">
                <button
                    type="button"
                    class="btn btn-sm text-light"
                    @click="close"
                >
                    X <span >close</span>
                </button>
            </div>
        </div>

        <h1 class="text-center"  style="color: rgb(57, 165, 17);" v-if="exercise.isCompleted">Completed!</h1>
        <h1 class="text-center"  style="color: rgb(255, 49, 49)" v-else>Incomplete</h1>
        <h3  style="font-size: 12px;">Warm up sets:</h3>
        <div class="row">

            <div style="font-size: 8px;"
             v-for="set in exercise.sets" :key="set._id">
                    <ul class="mb-3 pr-3" style="list-style: none" v-if="set.warmupSet === true">                                                            
                        <li>
                            Set: <strong>{{findSetNumber(set, "warmUp", exercise)}}</strong>
                        </li>
                        <li v-if="set.targetRepAmount">
                            Target Reps: <strong>{{set.targetRepAmount}}</strong>
                        </li>
                        <li v-if="set.targetRepAmount && exercise.isCompleted">
                            Actual Reps: <strong   style="color: rgb(255, 49, 49)">{{set.actualRepAmount}}</strong>
                        </li>
                        <li v-if="set.targetWeight">
                            Target Weight: <strong>{{set.targetWeight}} </strong>lbs
                        </li>
                        <li v-if="set.targetRepAmount && exercise.isCompleted">
                            Actual Weight: <strong  style="color: rgb(255, 49, 49)">{{set.actualRepAmount}} </strong>lbs
                        </li>
                        <li v-if="set.targetTimeinSeconds">
                            Target Time: <strong>{{set.targetTimeinSeconds}} sec(s)</strong>
                        </li>
                        <li v-if="set.actualTimeinSeconds && exercise.isCompleted">
                            Actual Time: <strong style="color: rgb(255, 49, 49)">{{set.actualTimeinSeconds}} </strong>sec(s)
                        </li>
                        <li v-if="set.targetLoad">
                            Target Load: <strong>{{set.targetLoad}}</strong>
                        </li>
                        <li v-if="set.targetLoad && exercise.isCompleted">
                            Actual Load: <strong style="color: rgb(255, 49, 49)">{{set.actualLoad}}</strong>
                        </li>
                        <li v-if="set.rpe">
                            RPE: <strong>{{set.rpe}}</strong>
                        </li>
                        <li v-if="set.rest">
                            Rest: <strong>{{set.rest}}</strong> min(s)
                        </li>
                        <li  style="list-style: none">
                            <button v-if="!workout.isCompleted"  style="font-size: 6px;"
                            @click="onSetDelete(exercise._id, exercise.workoutId, set._id)"
                                class="btn btn-sm btn-outline-danger mt-2">
                                Delete Set -
                            </button>
                            
                        </li>
                        <li style="list-style: none">
                            <button v-if="!workout.isCompleted"  style="font-size: 6px;"
                            @click="onRouteChange(`/editset/${set._id}`)"
                            class="btn btn-sm btn-outline-primary mt-2">
                                Edit Set
                            </button>
                        </li>
                        <li style="list-style: none">
                            <button v-if="!workout.isCompleted"  style="font-size: 6px;"
                            @click="onSetDuplication(set, exercise, workout._id)"
                            class="btn btn-sm btn-outline-warning mt-2">
                                Duplicate Set
                            </button>
                        </li>
                    </ul>
            
                </div>                    
        </div>

        <h3 style="font-size: 12px;">Training Sets:</h3>
        <div class="row">

            <div style="font-size: 8px; overflow-x: auto; display: inline-flex;" v-for="set in exercise.sets" :key="set._id">
                    <ul class="mb-3 text-left pl-5 pr-5" v-if="set.warmupSet === false"  style="list-style: none; display: inline-table;">                                                            
                        <li>
                            Set: <strong>{{findSetNumber(set, "training", exercise)}}</strong>
                        </li>
                        <li v-if="set.targetRepAmount">
                            Target Reps: <strong>{{set.targetRepAmount}}</strong>
                        </li>
                        <li v-if="set.targetRepAmount && exercise.isCompleted">
                            Actual Reps: <strong  style="color: rgb(255, 49, 49)">{{set.actualRepAmount}}</strong>
                        </li>
                        <li v-if="set.targetWeight">
                            Target Weight: <strong>{{set.targetWeight}} </strong>lbs
                        </li>
                        <li v-if="set.targetRepAmount && exercise.isCompleted">
                            Actual Weight: <strong  style="color: rgb(255, 49, 49)">{{set.actualRepAmount}} </strong>lbs
                        </li>
                        <li v-if="set.targetTimeinSeconds">
                            Target Time: <strong>{{set.targetTimeinSeconds}} sec(s)</strong>
                        </li>
                        <li v-if="set.actualTimeinSeconds && exercise.isCompleted">
                            Actual Time: <strong  style="color: rgb(255, 49, 49)">{{set.actualTimeinSeconds}} </strong>sec(s)
                        </li>
                        <li v-if="set.targetLoad">
                            Target Load: <strong>{{set.targetLoad}}</strong>
                        </li>
                        <li v-if="set.targetLoad && exercise.isCompleted">
                            Actual Load: <strong style="color: rgb(255, 49, 49)"> {{set.actualLoad}}</strong>   
                        </li>
                        <li v-if="set.rpe">
                            RPE: <strong>{{set.rpe}}</strong>
                        </li>
                        <li v-if="set.rest">
                            Rest: <strong>{{set.rest}}</strong> min(s)
                        </li>
                        <li style="list-style: none">
                            <button v-if="!workout.isCompleted"  style="font-size: 6px;"
                            @click="onSetDelete(exercise._id, exercise.workoutId, set._id)"  
                            class="btn btn-sm btn-outline-danger mt-2">
                                Delete Set -
                            </button>
                        </li>
                        <li style="list-style: none">
                            <button v-if="!workout.isCompleted"  style="font-size: 6px;"
                            @click="onRouteChange(`/editset/${set._id}`)"
                            class="btn btn-sm btn-outline-primary mt-2">
                                Edit Set
                            </button>
                        </li>
                        <li style="list-style: none">
                            <button v-if="!workout.isCompleted"  style="font-size: 6px;"
                            @click="onSetDuplication(set, exercise, workout._id)"
                            class="btn btn-sm btn-outline-warning mt-2">
                                Duplicate Set
                            </button>
                        </li>
                        
                    </ul>
            
                </div>                    
        </div>
    <hr>


    </span>

    <span  v-if="!workout.isCompleted"   class="pb-3">
        <div class="row mb-1">
            <div class="col">               
                <p  style="font-size: 8px" class="text-light">Notes: {{exercise.notes}}</p>
            </div>
            <div class="col mt-2 float-right">
                <button  @click="onRouteChange(`/newset/${exercise._id}`)"
                style="font-size: 10px;" class="btn btn-sm btn-outline-success">Add Set +</button>
            </div>
        </div>
        <hr>
        <div class="row mb-1">
            <div class="col mt-2 ml-2">
                <button style="font-size: 10px"
                class="btn btn-sm btn-outline-primary" @click="onRouteChange(`/editexercise/${exercise._id}`)">
                Edit Exercise</button>
            </div>
            <div class="col mt-2">
                <button v-if="!workout.isCompleted"  style="font-size: 10px;"
                @click="duplicateExercise" :disabled="!canDuplicate"  class="btn btn-sm btn-outline-warning">
                Duplicate Exercise ></button>
            </div>    
            <div class="col mt-2 mr-2">
                <DeleteExercise :workout="workout" :exercise="exercise" :canDelete="canDelete"/>
            </div> 
            <div class="col mt-2 mr-2">
                <button
                    type="button"
                    
                    class="btn btn-sm text-light"
                    @click="close"
                >
                    X <span >close</span>
                </button>
            </div> 
        </div>
    </span>   
    </div>

  </div>
  
</template>

<script>
import DeleteExercise from '~/components/modals/DeleteExercise.vue'

  export default {
    name: 'WorkoutModal',
    props: ["exercise", "workout", "canDuplicate"],
    components: {
        DeleteExercise
    },
    methods: {
      close() {
        this.$emit('close');
      },
      duplicateExercise() {
        this.$emit('duplicateExercise')
      },
      async onSetDuplication(set, exercise, workoutId) {
            const response = await this.$axios.$post('/api/set/create', {
                duplicate: true,
                setId: set._id,
                exerciseId: exercise._id
            });


            for(let ex of this.workout.exercises) {
                if(ex._id === exercise._id) {
                    await ex.sets.push(response.set);
                }
            }
            await this.$router.push(`/workout/${workoutId}`)
        },
        findSetNumber(set, setType, exercise) {
            let trainingSets = []
            let warmUpSets = []
            for(let set of exercise.sets) {
                if(set.warmupSet) {
                    warmUpSets.push(set)
                } else {
                    trainingSets.push(set)
                }
            }


            if(setType === "warmUp") {
                return warmUpSets.indexOf(set) + 1
            }

  
            return trainingSets.indexOf(set) + 1
            

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
        onRouteChange(route) {
            this.$router.push(route);
        },
    },
  };
</script>


<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    opacity: 1;
  }

  .thing {
    background: black;
    box-shadow: 2px 2px 20px 1px;
    display: flex;
    flex-direction: column;
  }



  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  li {
    color: white
  }
  hr {
    background-color: white;
  }
</style>