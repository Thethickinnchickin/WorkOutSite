<template>
    <main>
        Test
        <div v-for="workout in workouts" :key="workout._id">
        {{workout.name}}
        </div>        
    </main>

</template>

<script>
import {mapGetters} from "vuex";


export default {
    async asyncData({$axios}) {
        let response = await $axios.$get('/api/workout');

        return {
            workouts: response.workouts
        }
    },
    


    // computed: {
    //     ...mapGetters(['getWorkouts'])
    // },

}
  
</script>
