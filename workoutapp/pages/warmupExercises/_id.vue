<template>
<main style="background-image: url('/images/wrestler.png'); 
width: 100%; background-repeat: no-repeat;
background-position: center top;" class="text-center mt-3 pt-5">
    <div class="row">
        <div class="col-2">
         <button class="mt-5"
          @click="onRouteReturn" id="backButton">Back To Workout</button>               
        </div>
        <div class="col-8">
        <h1 class="mt-5 float-middle">
            {{workoutName}}
        </h1>
        </div>



    </div>
    <div  v-for="exercise in exercises" :key="exercise._id">
        <div  v-if="exercises.indexOf(exercise) + 1 === pageNumber">
                <Exercise :exercise='exercise'/>        
        </div>
    </div>
    <div class="row">
        <div class="col">
            <ul class="pagination justify-content-center">
                <li class="page-item">
                    <button class="page-link" @click="pageChange('subtract')" tabindex="-1">Previous</button>
                </li>
                <li v-for="index in exercises.length" :key="index" class="page-item">
                    <button v-if="index === pageNumber" class="page-link">{{index}}</button>
                    <button v-else class="page-link" @click="pageChange('none',index)">{{index}}</button>
                </li>

            

                <li class="page-item">
                    <button class="page-link" @click="pageChange('add')">Next</button>
                </li>
            </ul>
        </div>
    </div>
</main>
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
             workoutName: response.workoutName,
             workoutId: response.workoutId
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
        },
        onRouteReturn() {
            this.$router.push(`/workout/${this.workoutId}`);
        }
    },

} 
</script>

<style scoped>
#backButton {
    background-color: rgba(0,0,0,.5);
    border: 2px soid ;
    color: rgb(57, 165, 17);
    border-radius: 5px;
}
#backButton:hover {
    background-color: black;
    border: 2px soid rgb(57, 165, 17);
    color: rgb(57, 165, 17);
    border-radius: 5px;
}
</style>