<template>
     <div class="setCard pb-2">
                    <div v-if="set.isCompleted" class="ml-0 row setCompletedHeader">
                        <div class="col">
                            <h1 class="pt-3" style="font-size: 12px">Set {{selectedExercise.sets.indexOf(set) + 1}}</h1>
                        </div>
                        
                    </div>
                    <div v-else class="ml-0 row setIncompleteHeader">
                        <div class="col">
                            <h1 class="pt-3" style="font-size: 12px; color: red">Set {{selectedExercise.sets.indexOf(set) + 1}}</h1>
                        </div>
                        
                    </div>
                    <div class="row">
                        <div class="col">
                            <button style="width: 18vw" class="deleteButton" @click="onSetDelete(selectedExercise._id, selectedExercise.workoutId, set._id)" >delete</button>    
                        </div>
                        <div class="col">
                            <button style="width: 18vw" class="editButton" @click="onRouteChange(`/editset/${set._id}`)">edit</button> 
                        </div>
                        <div class="col">
                            <button style="width: 18vw" class="duplicateButton" @click="onSetDuplication(set, selectedExercise, workout._id)">duplicate</button>
                        </div>
                         
                    </div>
                    <div v-if="setViewModal">
                        <div v-if="!set.isCompleted" class="setComplete mt-2">
                            <button class="btn view-more" @click="toggleSetView">View More</button> 
                        </div>
                        <div v-else class="setIncomplete">
                            <button class="view-more" @click="toggleSetView">View More</button>
                        </div>
                    </div>
                    <div v-else>
                        <div v-if="!set.isCompleted" class="setComplete mt-2">
                            <p v-if="set.targetRepAmount" class="m-0">Target Reps <span>{{set.targetRepAmount}}</span></p> 
                            <p v-if="set.targetWeight" class="m-0">Target Weight <span>{{set.targetWeight}}</span></p> 
                            <p v-if="set.targetTimeinSeconds" class="m-0">Target Time (secs) <span>{{set.targetTimeinSeconds}}</span></p> 
                            <p v-if="set.targetLoad" class="m-0">Target Load <span>{{set.targetLoad}}</span></p> 
                            <p v-if="set.rpe" class="m-0">RPE <span>{{set.rpe}}</span></p> 
                            <p v-if="set.rest" class="m-0">Rest (mins) <span>{{set.rest}}</span></p>  
                            <button class="view-more pb-2"  @click="toggleSetView">Close</button>
                        </div>
                        <div v-else class="setIncomplete">
                            <p v-if="set.targetReps" class="m-0">Target Reps <span>{{set.targetLoad}}</span></p> 
                            <p v-if="set.targetReps" class="m-0">Actual Reps <span>{{set.targetLoad}}</span></p> 
                            <p v-if="set.targetWeight" class="m-0">Target Weight <span>{{set.targetWeight}}</span></p> 
                            <p v-if="set.targetWeight" class="m-0">Actual Weight <span>{{set.targetLoad}}</span></p> 
                            <p v-if="set.targetTime" class="m-0">Target Time (secs) <span>{{set.targetTimeinSeconds}}</span></p> 
                            <p v-if="set.targetTime" class="m-0">Actual Time <span>{{set.targetLoad}}</span></p> 
                            <p v-if="set.targetLoad" class="m-0">Target Load <span>{{set.targetLoad}}</span></p> 
                            <p v-if="set.targetLoad" class="m-0">Actual Load <span>{{set.targetLoad}}</span></p> 
                            <p v-if="set.rpe" class="m-0">RPE <span>{{set.rpe}}</span></p> 
                            <p v-if="set.rest" class="m-0">Rest (mins) <span>{{set.rest}}</span></p>  
                            <button class="view-more pb-2" @click="toggleSetView">Close</button>
                        </div>
                    </div>

                        
                    
                </div>
</template>

<script>
    export default {
        data() {
            return {
                setViewModal: false,
            }
        },
        props:['set', 'selectedExercise', 'workout'],
        methods: {
            toggleSetView() {
                this.setViewModal = !this.setViewModal
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
        }
    }
</script>
<style scoped>
                .view-more {
                border: 2px solid rgb(57, 165, 17);
                color: white;
                background-color: black;
                border-radius: 20px;
            }
            .view-more:hover {
                background-color: rgb(57, 165, 17);
                color: black;
            }
                .editButton {
                background-color: black;
                box-shadow: none;
                color: white;
                border: 2px solid white;
                border-radius: 20px;
                width: 20vw;
                height: 4vh;
                margin-top: 10px;
                color: rgb(255,215,0)
            }
            .deleteButton {
                background-color: black;
                box-shadow: none;
                color: white;
                border: 2px solid white;
                border-radius: 20px;
                width: 20vw;
                width: 20vw;
                height: 4vh;
                margin-top: 10px;
                color: red;
            }
            .duplicateButton {
                background-color: black;
                box-shadow: none;
                color: white;
                border: 2px solid white;
                border-radius: 20px;
                width: 20vw;
                width: 20vw;
                height: 4vh;
                margin-top: 10px;
                color: royalblue;
            }
            .editButton:hover {
                background-color: rgb(255,215,0);
                color: black;
            }
            .deleteButton:hover {
                background-color: red;
                color: black;
            }
            .duplicateButton:hover {
                background-color: royalblue;
                color: black;
            }
            .setCard > p {
                font-size: 8px;
                color: black;
                
            }
            span {
                font-size: 8px;
                color: red
            }
            .setsCol {
                height: auto;
                background-color: black;
                width: 90%;
                border-radius: 20px;
            }

            .setComplete > p {
                font-size: 8px;
                color: white;
            }
            .setIncomplete p > span {
                color: rgb(57, 165, 17);
                
            }
            .setComplete {
                border: 2px solid rgb(121, 221, 255);
                border-top: none;
                border-left: none;
                border-right: none;
                border-radius: 10px;
            }
            .setIncomplete {
                border: 2px solid rgb(121, 221, 255);
                border-top: none;
                border-left: none;
                border-right: none;
                border-radius: 10px;
            }
            .setIncomplete > p {
                font-size: 8px;
                color: white;
            }
            .setCompletedHeader {
                background-color: black;
                border: 2px solid rgb(57, 165, 17);
                border-bottom: none;
                border-left: none;
                border-right: none;
                border-radius: 20px 20px 0 0;
                width: 100%;
                
            }
            .setIncompleteHeader {
                background-color: black;
                border: 2px solid red;
                border-bottom: none;
                border-left: none;
                border-right: none;
                border-radius: 20px 20px 0 0;
                width: 100%;

                
            }
            .setIncompleteHeader > h1 {
                color: red;
            }
            button {
                pointer-events: initial;
                font-size: 6px;
            }
</style>