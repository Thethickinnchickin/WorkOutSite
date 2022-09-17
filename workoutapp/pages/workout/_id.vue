<template>
    <main class="py-5 text-center container" style="width: 100%">

    <div class="isMain">
        <div v-if="!loading" class="loading">
        <div v-if="!loading" class="row py-lg-5 mt-5">
            <div class="col-lg-6 col-md-8 mx-auto">
                <h1>{{workout.name}}</h1>
                <p class="lead text-muted">Notes: {{workout.notes}}</p>
                <p >
                    <a v-if="!workout.isCompleted" :href="'/editworkout/' + workout._id" class="btn btn-outline-primary my-2">Edit</a>
                    <b-button  class="btn btn-outline-danger" v-b-modal.modal-1>Delete</b-button>
                    <b-modal :hide-footer="true" id="modal-1" title="Hold On">
                        <p class="my-4">Are You sure about deleting this workout? It cannot be undone</p>
                        <b-button class="btn btn-danger" :disabled="!canDelete"  @click="onWorkoutDelete">Delete</b-button>
                    </b-modal>
                    <b-button  class="btn btn-outline-success" v-b-modal.duplicate>Duplicate</b-button>
                    <b-modal :hide-footer="true" id="duplicate" title="Hold On">
                        <p class="my-4">Select Date You Want Duplicated Workout to be On</p>
                        <div class="form-floating">
                            <input required type="date" pattern="\d{4}-\d{2}-\d{2}" v-model="date" class="form-control" id="floatingPassword">
                            <label for="floatingPassword">Workout Date</label>
                        </div>
                        <b-button class="btn btn-warning" @click="onWorkoutDuplicate" :disabled="!canDelete">Duplicate</b-button>
                    </b-modal>
                </p>
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
                        <h3 v-if="!workout.isCompleted"  class="mb-0">Warmup</h3>
                        <a  v-if="!workout.isCompleted && warmupCount > 0" style="color: rgb(4,217,255)" :href="'/warmupExercises/' + workout._id" class="stretched-link" id="beginWorkout">Begin WarmUp</a>
                        <a  v-else-if="!workout.isCompleted"  :href="'/newexercise/' + workout._id" style="color: rgb(4,217,255)" class="stretched-link">Add Warm up Exercise</a>
                        
                        </div>
                    </div>
        
                </div>
                <div class="col-md-6">
                <div  class="row g-0 rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div class="col p-4 d-flex flex-column position-static">
                    <h3 v-if="!workout.isCompleted" class="mb-0">Workout</h3>
                    <a  v-if="!workout.isCompleted  && workoutCount > 0" style="color: rgb(4,217,255)" :href="'/workoutExercises/' + workout._id" class="stretched-link" id="beginWorkout">Begin Workout</a>
                    <a  v-else-if="!workout.isCompleted" style="color: rgb(4,217,255)" :href="'/newexercise/' + workout._id" class="stretched-link">Add Exercise</a>
                    </div>
                </div>
                </div>
            </div>
            <button  v-if="!workout.isCompleted"  @click="onRouteChange(`/newexercise/${workout._id}`)"
            class="text-center btn btn-sm btn-success mb-5" id="addExercise">Add Exercise +</button>
                <!-- Warm up exercises -->
                <div class="col-md-12">
                    <p>Warm up Exercises</p>
                    <div  v-for="exercise in workout.exercises" :key="exercise._id" >
                        <div style="font-size: 1.5vw;" v-if="exercise.warmUpExercise">
                        <b-dropdown 
                            :text="`${exercise.name}`"
                            block
                            variant="warning"
                            class="m-2 mt-4 text-light"
                            menu-class="w-100"
                            :id="!exercise.isCompleted ? 'createButton' : 'exerciseComplete'"
                        >
                        <b-dropdown-item id="b-item" style="overflow-x: auto;">
                            <h4 class="text-center">{{exercise.name}}</h4>
                            <h1 class="pt-5 mt-5 text-center"  style="color: rgb(57, 165, 17); border: 2px soid rgb(57, 165, 17)" v-if="exercise.isCompleted">Completed!</h1>
                            <h1 class="pt-5 mt-5 text-center"  style="color: rgb(255, 49, 49);  border: 2px soid red" v-else>Incomplete</h1>
                            <h3  style="font-size: 12px;" v-if="exercise.sets.length > 0">Warm up sets:</h3>
                            <div class="row">
                                <div  style="font-size: 8px; display: inline-block; overflow-x: scroll;" v-for="set in exercise.sets" :key="set._id">
                                    <ul class="mb-3" v-if="set.warmupSet === true">
                                                        
                                        <li>Set: <strong>{{findSetNumber(set, "warmUp", exercise)}}</strong></li>
                                        <li v-if="set.targetRepAmount">Target Reps: <strong>{{set.targetRepAmount}}</strong></li>
                                        <li v-if="set.targetRepAmount && exercise.isCompleted">Actual Reps: <strong style="color: rgb(255, 49, 49)">{{set.actualRepAmount}}</strong></li>
                                        <li v-if="set.targetWeight">Target Weight: <strong>{{set.targetWeight}}</strong></li>
                                        <li v-if="set.targetRepAmount && exercise.isCompleted">Actual Weight: <strong style="color: rgb(255, 49, 49)">{{set.actualRepAmount}}</strong></li>
                                        <li v-if="set.targetTimeinSeconds">Target Time: <strong>{{set.targetTimeinSeconds}} secs</strong></li>
                                        <li v-if="set.actualTimeinSeconds && exercise.isCompleted">Actual Time: <strong style="color: rgb(255, 49, 49)">{{set.actualRepAmount}}</strong></li>
                                        <li v-if="set.targetLoad">Target Load: <strong>{{set.targetLoad}}</strong></li>
                                        <li v-if="set.targetLoad && exercise.isCompleted">Actual Load: <strong style="color:rgb(255, 49, 49)">{{set.actualLoad}}</strong></li>
                                        <li v-if="set.rpe">RPE: <strong>{{set.rpe}}</strong></li>
                                        <li v-if="set.rest">Rest: <strong>{{set.rest}}</strong> min(s)</li>
                                        <li style="list-style: none"><button v-if="!workout.isCompleted"  style="font-size: 6px;" @click="onSetDelete(exercise._id, exercise.workoutId, set._id)"  class="btn btn-sm btn-outline-danger mt-2">Delete Set -</button></li>
                                        <li style="list-style: none"><button v-if="!workout.isCompleted"  style="font-size: 6px;" @click="onRouteChange(`/editset/${set._id}`)" class="btn btn-sm btn-outline-primary mt-2">Edit Set</button></li>
                                        <li style="list-style: none"><button v-if="!workout.isCompleted"  style="font-size: 6px;"
                                        @click="onSetDuplication(set, exercise, workout._id)"
                                        class="btn btn-sm btn-outline-warning mt-2">Duplicate Set</button></li>
                                    </ul>
                            
                                </div>                        
                            </div>
        
                            <h3  style="font-size: 12px;" v-if="exercise.sets.length > 0">Training Sets:</h3>
                            <div class="row">
                                <div style="font-size: 8px; display: inline-block;" v-for="set in exercise.sets" :key="set._id">
                                    <ul  class="mb-3" v-if="set.warmupSet === false">
                                
                                                        
                                        <li>Set: <strong>{{findSetNumber(set, "training", exercise)}}</strong></li>
                                        <li v-if="set.targetRepAmount">Target Reps: <strong>{{set.targetRepAmount}}</strong></li>
                                        <li v-if="set.targetRepAmount && exercise.isCompleted">Actual Reps: <strong  style="color: rgb(255, 49, 49)">{{set.actualRepAmount}}</strong></li>
                                        <li v-if="set.targetWeight">Target Weight: <strong>{{set.targetWeight}}</strong></li>
                                        <li v-if="set.targetRepAmount && exercise.isCompleted">Actual Weight: <strong style="color: rgb(255, 49, 49)">{{set.actualRepAmount}}</strong></li>
                                        <li v-if="set.targetTimeinSeconds">Target Time: <strong>{{set.targetTimeinSeconds}} secs</strong></li>
                                        <li v-if="set.actualTimeinSeconds && exercise.isCompleted">Actual Time: <strong style="color:rgb(255, 49, 49)">{{set.actualTimeinSeconds}} sec(s)</strong></li>
                                        <li v-if="set.targetLoad">Target Load: <strong>{{set.targetLoad}}</strong></li>
                                        <li v-if="set.targetLoad && exercise.isCompleted">Actual Load: <strong style="color:rgb(255, 49, 49)">{{set.actualLoad}}</strong></li>
                                        <li v-if="set.rpe">RPE: <strong>{{set.rpe}}</strong></li>
                                        <li v-if="set.rest">Rest: <strong>{{set.rest}}</strong> min(s)</li>
                                        <li style="list-style: none"><button v-if="!workout.isCompleted && !exercise.isCompleted"  style="font-size: 6px;" @click="onSetDelete(exercise._id, exercise.workoutId, set._id)"  class="btn btn-sm btn-outline-danger mt-2">Delete Set -</button></li>
                                        <li style="list-style: none"><button v-if="!workout.isCompleted && !exercise.isCompleted"  style="font-size: 6px;" @click="onRouteChange(`/editset/${set._id}`)" class="btn btn-sm btn-outline-primary mt-2">Edit Set</button></li>
                                        <li style="list-style: none"><button v-if="!workout.isCompleted && !exercise.isCompleted"  style="font-size: 6px;"
                                        @click="onSetDuplication(set, exercise, workout._id)"
                                        class="btn btn-sm btn-outline-warning mt-2">Duplicate Set</button></li>
                                    </ul>
                                </div>                            
                            </div>
                        
                        
        
        
        
                        </b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item  v-if="!workout.isCompleted"  >
                            <div class="row mb-1">
                                <div class="col">
                                    <h3  v-if="!workout.isCompleted"   style="font-size: 12px;
                                    overflow-wrap: break-word;">
                                        Exercise: {{exercise.name}} 
                                    </h3>                   
                                    <p style="  overflow-wrap: break-word;">Notes: {{exercise.notes}}</p>
                                </div>
                                <div class="col mt-2 float-right">
                                    <button  @click="onRouteChange(`/newset/${exercise._id}`)"
                                    style="font-size: 10px;" class="btn btn-sm btn-outline-success">Add Set +</button>
                                </div>
                            </div>
                            <div class="row mb-1">
                                <div class="col mt-2">
                                    <button style="font-size: 10px"
                                    class="btn btn-outline-primary" @click="onRouteChange(`/editexercise/${exercise._id}`)">
                                    Edit Exercise</button>
                                </div>
                                <div class="col mt-2">
                                    <DeleteExercise :workout="workout" :exercise="exercise" :canDelete="canDelete"/>
                                </div>  
                                <div class="col mt-2">
                                    <button v-if="!workout.isCompleted"  style="font-size: 10px;"
                                    @click="onExerciseDuplication(exercise, workout._id)"  class="btn btn-sm btn-outline-warning">
                                    Duplicate Exercise ></button>
                                </div>          
                            </div>
                        </b-dropdown-item>                
                        </b-dropdown>
                        </div>
                        
                    </div>
                </div>
                <!-- Exercises -->
                <div class="col-md-12">
                    <p>Exercises</p>
                    <div v-for="exercise in workout.exercises" :key="exercise._id">
        
                        <div v-if="!exercise.warmUpExercise">
        
                        <b-dropdown 
                            :text="`${exercise.name}`"
                            block
                            variant="none"
                            class="m-2 mt-4"
                            menu-class="w-100"
                            :id="!exercise.isCompleted ? 'createButton' : 'exerciseComplete'"
                        >
        
                        <b-dropdown-item id="b-item" style="overflow: auto; ">
                        <h4 class="pt-5 text-center">{{exercise.name}}</h4>
                        <h1 class="text-center"  style="color: rgb(57, 165, 17);
                        border: 2px solid rgb(57, 165, 17)" v-if="exercise.isCompleted">Completed!</h1>
                        <h1 class="text-center"  style="color: rgb(255, 49, 49); border: 2px solid red" v-else>Incomplete</h1>
                        <h3  style="font-size: 12px;">Warm up sets:</h3>
                        <div class="row">
        
                            <div style="font-size: 8px;  display: inline-block;" v-for="set in exercise.sets" :key="set._id">
                                    <ul class="mb-3" v-if="set.warmupSet === true">                                                            
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
        
                            <div style="font-size: 8px;  display: inline-block;" v-for="set in exercise.sets" :key="set._id">
                                    <ul class="mb-3" v-if="set.warmupSet === false">                                                            
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
        
        
        
                        </b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item  v-if="!workout.isCompleted"  >
                            <div class="row mb-1">
                                <div class="col">               
                                    <p style="  overflow-wrap: break-word;">Notes: {{exercise.notes}}</p>
                                </div>
                                <div class="col mt-2 float-right">
                                    <button  @click="onRouteChange(`/newset/${exercise._id}`)"
                                    style="font-size: 10px;" class="btn btn-sm btn-outline-success">Add Set +</button>
                                </div>
                            </div>
                            <div class="row mb-1">
                                <div class="col mt-2">
                                    <button style="font-size: 10px"
                                    class="btn btn-outline-primary" @click="onRouteChange(`/editexercise/${exercise._id}`)">
                                    Edit Exercise</button>
                                </div>
                                <div class="col mt-2">
                                    <DeleteExercise :workout="workout" :exercise="exercise"/>
                                </div>  
                                <div class="col mt-2">
                                    <button v-if="!workout.isCompleted"  style="font-size: 10px;"
                                    @click="onExerciseDuplication(exercise, workout._id)"  class="btn btn-sm btn-outline-warning">
                                    Duplicate Exercise ></button>
                                </div>          
                            </div>
                        </b-dropdown-item>                
                        </b-dropdown>
                        </div> 
                    </div>
                
                </div>
            
                <div v-if="!workout.isCompleted && !loading" class="row">
                    <div class="col-12" >          
                        <CompleteButton :workoutId="workout._id" />  
                    </div>
                </div>
        
        </div>
        <div v-if="loading">Loading</div>
        
    </div>

    <div class="isMobile" >
        <div class="backdiv mt-5 pt-4 ml-4" style="height: 60vh; overflow: scroll"  >
            <div v-if="!warmUpModal && !setModal && !workoutModal">
                <div class="row"></div>
                <div class="row-8 pt-3" id="background-title">
                    <h1>{{workout.name}}</h1>
                </div>
                <div class="row-4">
                    <div class="col">
                        <button class="editButton" @click="onRouteChange('/editworkout/' + workout._id)">Edit</button>
                        <button class="deleteButton"  @click="onWorkoutDelete">Delete</button>
                        <button class="duplicateButton" @click="onWorkoutDuplicate" >Duplicate</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col mt-4">
                        <div class="warmupExercises">
                            <div class="warmupCard bookCollapse" @click="onRouteChange('/warmupExercises/' + workout._id)">
                                <h1 class="mt-4">Begin Warm Up</h1>
                            </div>
                            
                            <div class="bookCollapse" @click="toggleWarmUp">
                                <p class="mt-3" style="font-size: 10px; color: white">view more</p>
                            </div>
                        </div>                    
                    </div>

                </div>
                <div class="row">
                    <div class="col mt-4">
                        <div class="warmupExercises">
                            <div class="warmupCard bookCollapse" @click="onRouteChange('/workoutExercises/' + workout._id)">
                                <h1 class="mt-4">Begin Workout</h1>
                            </div>
                            
                            <div class="bookCollapse" style="" @click="toggleWorkoutModal">
                                <p class="mt-3" style="font-size: 10px; color: white">view more</p>
                            </div>
                    
                        </div>                    
                    </div>

                </div>                
            </div>
            <div v-else-if="warmUpModal">
                <div class="row mb-1">
                    <button class="backButton" style="margin: auto;" @click="toggleWarmUp">Back to Workout</button>
                </div>
                <div v-if="!warmUpSetsModal" class="row-8 pt-2" id="background-title">
                    <h1 style="color: white;">{{workout.name}}</h1>
                    <h2>Warm Up Exercises</h2>
                </div>
                
                <div v-if="warmUpSetsModal" class="row-8 pt-2" id="background-title">
                    <h1 style="color: white;">{{selectedExercise.name}}</h1>
                    <h2>Exercise Name</h2>
                </div>

                <div v-if="!warmUpSetsModal" class="">
                    <div v-for="exercise of workout.exercises" >
                        <div v-if="exercise.warmUpExercise" style="margin: auto;" 
                                        class="exerciseCol mt-2 row mt-3 text-center">
                            <p v-if="!warmUpSetsModal" class="pt-1 col" @click="toggleWarmUpSet(exercise)">{{exercise.name}}</p>
                        </div>
                        
                
                    </div>
                </div>
                <div class="row">
                    <div @click="onRouteChange(`/newexercise/${workout._id}`)" class="createExerciseCol mt-3">
                        <p class="pt-1">Create Exercise</p> 
                    </div>
                </div>
                
            </div>
            <div v-else-if="workoutModal">
                <div class="row mb-1">
                    <button class="backButton" style="margin: auto;" @click="toggleWorkout">Back to Workout</button>
                </div>
                <div v-if="!warmUpSetsModal" class="row-8 pt-2" id="background-title">
                    <h1 style="color: white;">{{workout.name}}</h1>
                    <h2>Warm Up Exercises</h2>
                </div>
                <div v-if="warmUpSetsModal" class="row-8 pt-2" id="background-title">
                    <h1 style="color: white;">{{selectedExercise.name}}</h1>
                    <h2>Exercise Name</h2>
                </div>

                <div v-if="!warmUpSetsModal" class="">
                    <div v-for="exercise of workout.exercises" >
                        <div v-if="exercise.warmUpExercise" style="margin: auto;" 
                                        class="exerciseCol mt-2 row mt-3 text-center">
                            <p v-if="!warmUpSetsModal" class="pt-1 col" @click="toggleWarmUpSet(exercise)">{{exercise.name}}</p>
                        </div>
                        
                
                    </div>
                </div>
                <div class="row">
                    <div @click="onRouteChange(`/newexercise/${workout._id}`)" class="createExerciseCol mt-3">
                        <p class="pt-1">Create Exercise</p> 
                    </div>
                </div>
                
            </div>
            <div v-else-if="setModal">
                <div class="row mb-1">
                    <button class="backButton" style="margin: auto;" @click="toggleSet">Back to Exercise</button>
                </div>
                <div v-if="!warmUpSetsModal" class="row-8 pt-2" id="background-title">
                    <h1 style="color: white;">{{selectedExercise.name}}</h1>
                    <h2>Sets</h2>
                </div>
                <div class="row-4">
                    <div class="col">
                        <button class="editButton"  @click="onRouteChange(`/editexercise/${selectedExercise._id}`)">Edit</button>
                        <button class="deleteButton" @click="onExerciseDelete(selectedExercise._id)" >Delete</button>
                        <button class="duplicateButton" @click="onExerciseDuplication(selectedExercise, workout._id)" >Duplicate</button>
                    </div>
                </div>
                <div v-for="set of selectedExercise.sets" style="margin: auto; margin-bottom: 10px;" 
                                        class="setsCol mt-2">
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
                    <div v-if="!set.isCompleted" class="setComplete">
                        <p v-if="set.targetLoad" class="m-0">Target Reps <span>{{set.targetLoad}}</span></p> 
                        <p v-if="set.targetWeight" class="m-0">Target Weight <span>{{set.targetWeight}}</span></p> 
                        <p v-if="set.targetTimeinSeconds" class="m-0">Target Time (secs) <span>{{set.targetTimeinSeconds}}</span></p> 
                        <p v-if="set.targetLoad" class="m-0">Target Load <span>{{set.targetLoad}}</span></p> 
                        <p v-if="set.rpe" class="m-0">RPE <span>{{set.rpe}}</span></p> 
                        <p v-if="set.rest" class="m-0">Rest (mins) <span>{{set.rest}}</span></p>  
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
                    </div>
                    
                </div>
                        
                
                </div>
                <div class="row">
                    <div @click="onRouteChange(`/newset/${selectedExercise._id}`)" class="createExerciseCol mt-3">
                        <p class="pt-1">Create Set</p> 
                    </div>
                </div>
            </div>
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
                modalShow: false,
                date: null,
                canDelete: true,
                warmUpModal: false,
                warmUpSetsModal: false,
                selectedExercise: null,
                setModal: false,
                workoutModal: false
            }
        },
        async asyncData({$axios, params, $router}) {
            try {
                let loading = true;
    
                let response =  await $axios.$post(`/api/workout/${params.id}`);
    
                let workout = response.workout
    
                workout.dateScheduled = moment(String(workout.dateScheduled))
                    .format('MM/DD/YYYY');
    
                let warmupCount = 0;
                let workoutCount = 0;
    
                for(let exercise of workout.exercises) {
                    if(exercise.warmUpExercise) {
                        warmupCount ++;
                    } else {
                        workoutCount ++;
                    }
                }
                
    
    
                loading = false
    
                return {
                    workout: workout,
                    warmupCount: warmupCount,
                    workoutCount: workoutCount,
                    loading: loading
                }
            } catch (err) {
                console.log(err);
            }
        },
        methods: {
            toggleWarmUp() {
                this.warmUpModal = !this.warmUpModal;
                this.setModal = false;
                this.workoutModal = false;
                this.warmUpSetsModal = false;
                this.selectedExercise = null;
            },
            toggleWorkout() {
                this.warmUpModal = false;
                this.setModal = false;
                this.workoutModal = !this.workoutModal;
                this.warmUpSetsModal = false;
                this.selectedExercise = null;
            },
            toggleWarmUpSet(exercise) {
                this.warmUpSetsModal = false;
                this.setModal = true;
                this.warmUpModal = false;
                this.workoutModal = false;
                this.selectedExercise = null;
                this.selectedExercise = exercise;
            },
            toggleSet() {
                this.warmUpModal = true;
                this.warmUpSetsModal = false;
                this.setModal = false;
                this.selectExercise = null;
            },
            toggleWorkoutModal() {
                this.warmUpModal = false;
                this.warmUpSetsModal = false;
                this.setModal = false;
                this.selectExercise = null;
                this.workoutModal = true;
            },
            onRouteChange(route) {
                this.$router.push(route);
            },
            selectExercise(exercise) {
                this.selectExercise = exercise;
            },
            getSelectedExercise() {
                return this.selectExercise;
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
                this.canDelete = false;
                await this.$axios.$delete('/api/workout', {data: {workoutId: this.workout._id}});
    
                await this.$router.push('/workouts')
                this.canDelete = true;
            },
            async onExerciseDelete(exerciseId, workoutId) {
                this.canDelete = false;
                await this.$axios.$delete('/api/exercise', {data: {workoutId: this.workout._id, exerciseId: exerciseId}});
    
                var filtered = this.workout.exercises.filter(function(value, index, arr){ 
                    return value._id != exerciseId;
                });
    
                this.workout.exercises = filtered
    
                await this.$router.push(`/workout/${workoutId}`)
    
                this.canDelete = true;
    
            },
            async onExerciseDelete(exerciseId) {
                this.loading = true;
                let f = 0
                await this.$axios.$delete('/api/exercise', {data: {workoutId: this.workout._id, exerciseId: exerciseId}});

                var filtered = this.workout.exercises.filter(function(value, index, arr){ 
                    return value._id != exerciseId;
                });

                this.workout.exercises = filtered

                window.location.reload()
                this.loading = false;

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
            async onExerciseDuplication(exercise) {
    
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
    
                await this.workout.exercises.push(response.exercise);
    
                await this.$router.push(`/workout/${this.workout._id}`);
    
    
            }
       
        },
    
    
    }
    </script>
    
    <style scoped>
        * {
            font-size: 12px;

        }
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
            border: 2px solid rgb(57, 165, 17);
            border-radius: 3px;
            background-color: 	rgba(255,215,0);
            color:rgb(57, 165, 17);
        }
        #createButton:hover {
            border: 2px solid 	rgb(57, 165, 17);
            border-radius: 3px;
            background-color: 	rgba(255,215,0, .5);
            color: black;
        }    
        #exerciseComplete:hover {
            border: 2px solid rgba(255,215,0);
            border-radius: 3px;
            background-color: rgba(57, 165, 17, .5);;
            color:rgba(57, 165, 17);
        }
        #exerciseComplete {
            border: 2px solid 	rgb(255,215,0);
            border-radius: 3px;
            background-color: rgb(57, 165, 17);
            color: black;
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
    
        #beginWorkout {
            animation: blinking 1.5s infinite;
        }

        @media only screen and (max-width: 500px) {
            .isMain {
                display: none;
            }
            .setCard > p {
                font-size: 8px;
                color: black
            }
            span {
                font-size: 8px;
                color: red
            }
            .backdiv {
                height: 80vh;
                width: 80vw;
                background-color: black;
                border: 2px solid white;
                margin: auto;
                border-radius: 20px;
            }
            #background-title {
                width: 70vw;
                height: 10vh;
                margin: auto;
                background-color: black;
                border: 2px solid white;
                border-radius: 20px;
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
            .warmupExercises {
                height: 15vh;
                width: 90%;
                margin: auto;
                background-color: black;
                border: 2px solid rgb(121, 221, 255);
                border-radius: 20px;
            }
            .bookCollapse {
                height: 12vh;
                 width: 15vw;
                 margin-right: 10px;
                 margin-top: 8px;
                 border-radius: 20px;
                 border: 2px solid rgb(210, 29, 213);
                background-color: rgba(131, 193, 255, 0.3);
                float: right;
            }
            .bookCollapse:hover {
                background-color: rgb(210, 29, 213);
                border: 5px solid black;
            }
            .warmupCard {
                float: left;
                background-color: rgba(255, 140, 39, .3);
                margin-top: 8px;
                margin-left: 10px;
                width: 44vw;
                height: 12vh;
                border-radius: 20px;
                border: 2px solid rgb(255, 140, 39);
            }

            .exerciseCol {
                height: 5vh;
                width: 80%;
                margin: auto;
                background-color: black;
                border: 2px solid rgb(121, 221, 255);
                border-radius: 20px;
            }
            .exerciseCol:hover {
                background-color: black;
                border: 2px solid rgb(57, 165, 17);
            }
            .createExerciseCol {
                background-color: rgb(57, 165, 17);
                border: 2px solid white;
                color: white;
                height: 5vh;
                width: 80%;
                margin: auto;
                border-radius: 20px;

            }
            .createExerciseCol:hover {
                background-color: black;
            }
            .backButton {
                background-color: black;
                border-radius: 20px;
                color: white;
                box-shadow: none;
                border: 2px solid white;
                width: 50%;
                font-size: 8px;
            }
            .backButton:hover {
                background-color: white;
                color: black;
            }
            .setsCol {
                height: auto;
                background-color: white;
                width: 90%;
                border-radius: 20px;
            }

            .setComplete > p {
                font-size: 8px;
                color: black;
            }
            .setIncomplete p > span {
                color: rgb(57, 165, 17)
            }
            .setIncomplete > p {
                font-size: 8px;
                color: black;
            }
            .setCompletedHeader {
                background-color: black;
                border: 2px solid rgb(57, 165, 17);
                border-radius: 20px 20px 0 0;
                width: 100%;
                
            }
            .setIncompleteHeader {
                background-color: black;
                border: 2px solid red;
                border-radius: 20px 20px 0 0;
                width: 100%;

                
            }
            .setIncompleteHeader > h1 {
                color: red;
            }

        }
    
    </style>
