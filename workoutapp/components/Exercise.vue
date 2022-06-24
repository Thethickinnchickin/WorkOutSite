<template>
<body style="background-color: rgba(57, 165, 17,0);">
<section style="background: rgba(204, 204, 204, 0.0);" class="jumbotron text-center">
    <div class="container" >
        <h1 id="exerciseName" style="color: rgb(57, 165, 17);background-color: black;">Exercise: {{exercise.name}}</h1>
     </div>
</section>

<div class="container mb-4">
    <div class="row">
        <div class="col-12">
            <div class="table-responsive search-table-outter" style="overflow:scroll">
                <table class="table table-striped" style="color: rgb(57, 165, 17); background-color: black;">
                    <thead>
                        <tr  style="font-size:10px">
                            <th scope="col" class="text-right">Completed</th>
                            <th scope="col">Target Reps</th>
                            <th scope="col" class="text-center">Actual Reps</th>
                            <th scope="col" class="text-right">Target Weight</th>
                            <th scope="col" class="text-right">Actual Weight</th>
                            <th scope="col" class="text-right">Target Time</th>
                            <th scope="col" class="text-right">Actual Time</th>
                            <th scope="col" class="text-right">target Load</th>
                            <th scope="col" class="text-right">actual Load</th>
                            <th scope="col" class="text-right">RPE</th>
                            <th scope="col" class="text-right">Rest</th>
                                                        
                                                        

                        </tr>
                    </thead>
                    <tbody  style="font-size:1vw" v-for="set in exercise.sets" :key="set._id">
                        <Set :set="set" :exercise="exercise"/>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col mb-2">
            <div class="row">
                <div v-if="!exercise.isCompleted" class="col-12 text-right">
                    <b-button  v-b-modal.completeExercise-1 id="buttonComplete" class="btn btn-lg btn-block btn-outline-danger text-uppercase">Complete Exercise</b-button>
                    <b-modal :hide-footer="true" id="completeExercise-1" title="Hold On">
                        <p class="my-4">Are You sure about completing this exercise? It cannot be undone</p>
                        <b-button class="btn btn-danger" @click="completeExercise(true)">Complete</b-button>
                    </b-modal>
                </div>                
                <div v-else class="col-12 text-right">

                    <button disabled class="btn btn-lg btn-block btn-outline-success text-uppercase">Exercise Completed</button>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</template>

<style>
#buttonComplete:hover {
    border: 1px solid rgb(57, 165, 17);
    color: rgb(57, 165, 17);
    background-color: black;
}
input[type="number"] {
  background-color: black;
  color: rgb(57, 165, 17);
}
#exerciseName {
    border: 1px solid rgb(57, 165, 17);
    border-radius: 50px;
    padding: none;
}
.search-table-outter { overflow-x: scroll; }
</style>

<script>
import Set from '~/components/Set.vue';

export default {
    components: {
        Set
    },
    data() {
        return {
            actualRep: 0,
            actualWeight: 0,
            actualTime: 0
        }
    },
    props: ["exercise"],
    methods: {
        completeExercise(isCompleted) {
            this.$axios.$put('/api/exercise/isCompleted',
             {exerciseId: this.exercise._id, isCompleted: isCompleted })

            this.exercise.isCompleted = isCompleted;
        }
    }
}
</script>
