<template>
<body>
    <section class="jumbotron text-center">
    <div class="container">
        <h1 class="jumbotron-heading">{{exercise.name}}</h1>
     </div>
</section>

<div class="container mb-4">
    <div class="row">
        <div class="col-12">
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col" class="text-right">Completed</th>
                            <th scope="col">Target Reps</th>
                            <th scope="col" class="text-center">Actual Reps</th>
                            <th scope="col" class="text-right">Target Weight</th>
                            <th scope="col" class="text-right">Actual Weight</th>
                            <th scope="col" class="text-right">Target Time</th>
                            <th scope="col" class="text-right">Actual Time</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody v-for="set in exercise.sets">
                        <Set :set="set" :exercise="exercise"/>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col mb-2">
            <div class="row">
                <div v-if="!exercise.isCompleted" class="col-12 text-right">
                    <button @click="completeExercise(true)" id="buttonComplete" class="btn btn-lg btn-block btn-danger text-uppercase">Complete Exercise</button>
                </div>                
                <div v-else class="col-12 text-right">
                    <button disabled class="btn btn-lg btn-block btn-success text-uppercase">Exercise Completed</button>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</template>

<style>
#buttonComplete:hover {
    background-color: #55AE3A;
}
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