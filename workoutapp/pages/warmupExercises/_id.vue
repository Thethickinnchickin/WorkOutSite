<template>
<body>
    <h1 v-for="exercise of exercises" :key="exercise._id">{{exercise.name}}</h1>
</body>
</template>


<script>
export default  {
    async asyncData({$axios, params}) {
        let response = await $axios.$post(`/api/exercise`,
         {searchParams: {workoutId: params.id, isWarmup: true}});

         return {
             exercises: response.exercises
         }

    }
} 
</script>