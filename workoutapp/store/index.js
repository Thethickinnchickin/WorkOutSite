import VuexPersistence from 'vuex-persist'


const store = {

    state : {
        //State
        workoutData: []
    },

    actions : {
        addAllWorkouts({state, commit}, workouts) {
            if(state.workoutData.length > 0) {
                return
            } else {
                console.log("hey")
                let thing = JSON.parse(JSON.stringify(workouts))
                commit("pushToWorkouts", thing)
                console.log(state.workoutData)
                window.localStorage.setItem('state', JSON.stringify(state.workoutData))
            }
            
        },
        // addWorkout({state, commit}, workout) {
        //     const workoutFound = state.workouts.find(w => w._id === workout._id);

        //     if(!workoutFound) {
        //         commit("pushWorkoutToWorkouts");
        //     } 
        // }
    },

    mutations : {
        pushToWorkouts(state, workouts) {
            for(let workout of workouts) {
                state.workoutData.push(workout);
            }
        }
    },
    getters : {
        getWorkouts(state) {
            console.log(JSON.stringify(state))
            return state.workouts;
        },
        getWorkout(state, workoutId) {
            const workout = state.workouts.find(w => w._id === workoutId);

            return workout;
        },
        getExercisesForWorkout(state, workoutId) {
            const workout = state.workouts.find(w => w._id === workoutId);

            return workout.exercises;
        },

    },
}


