<template>
    <section>
        <b-button  v-if="!workout.isCompleted"  style="font-size: 10px" v-b-modal="`${workout.exercises.indexOf(exercise)}`" class="btn btn-outline-danger ml-3" >Delete Exercise</b-button>

        <b-modal  v-if="!workout.isCompleted"  :hide-footer="true" :id="`${workout.exercises.indexOf(exercise)}`" title="Wait a seconds...">
            <p class="my-4">Are You sure about deleting this exercise? It cannot be undone</p>
            <b-button class="btn-danger" @click="onExerciseDelete(exercise._id, workout._id)">Delete</b-button>
        </b-modal>       
    </section>
</template>

<script>
export default {
    props: ["exercise", "workout"],
    methods: {
        async onExerciseDelete(exerciseId, workoutId) {
            await this.$axios.$delete('/api/exercise', {data: {workoutId: this.workout._id, exerciseId: exerciseId}});

            var filtered = this.workout.exercises.filter(function(value, index, arr){ 
                return value._id != exerciseId;
            });

            this.workout.exercises = filtered

            this.$router.push(`/workout/${workoutId}`)

        },
    }
}
</script>