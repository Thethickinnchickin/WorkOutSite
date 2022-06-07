<template>
<body class="text-center">
    <h1 class="mt-5">
        {{workoutName}}
    </h1>
    <div v-for="exercise in exercises" :key="exercise._id">
        <div v-if="exercises.indexOf(exercise) + 1 === pageNumber">
                <Exercise :exercise='exercise'/>        
        </div>
    </div>
    <div class="row">
        <div class="col">
            <ul class="pagination justify-content-center">
                <li class="page-item">
                    <button class="page-link" @click="pageChange('subtract')" tabindex="-1">Previous</button>
                </li>
                <li v-for="index in exercises.length" class="page-item">
                    <button v-if="index === pageNumber" class="page-link">{{index}}</button>
                    <button v-else class="page-link" @click="pageChange('none',index)">{{index}}</button>
                </li>

            

                <li class="page-item">
                    <button class="page-link" @click="pageChange('add')">Next</button>
                </li>
            </ul>
        </div>
    </div>
</body>
</template>


<script>
import Exercise from '~/components/Exercise.vue';

export default  {
    components: {
        Exercise,
    },
    data() {
        return {
            pageNumber: 1
        }
    },
    async asyncData({$axios, params}) {
        let response = await $axios.$post(`/api/exercise`,
         {searchParams: {workoutId: params.id, isWarmup: true}});

         return {
             exercises: response.exercises,
             workoutName: response.workoutName
         }

    },
    methods: {
        pageChange(changeType, pageNumber) {
            if(changeType === "add") {
                if(this.pageNumber >= 1 && this.pageNumber < this.exercises.length) {
                    this.pageNumber++;
                }
            } else if (changeType === "subtract") {
                if(this.pageNumber > 1 && this.pageNumber <= this.exercises.length) {
                    this.pageNumber--;
                }

            } else {
                this.pageNumber = pageNumber
            }
        }
    }
} 
</script>

