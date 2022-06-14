<template>
    <main class="text-center mt-5 pt-5" data-new-gr-c-s-check-loaded="14.1062.0" data-gr-ext-installed=""> 
        <div class="form-signin col-4 w-100 m-auto">
            <h1 class="h3 mb-3 fw-normal">Update Workout</h1>
            <div class="form-floating">
            <input v-model="name" type="text" class="form-control" id="floatingInput" :placeholder="workout.name">
            <label for="floatingInput">Workout Name</label>
            </div>
            <div class="form-floating">
            <textarea v-model="notes" type="text" class="form-control" id="floatingPassword" :placeholder="workout.notes || 'notes'"></textarea>
            <label for="floatingPassword">Notes</label>
            </div>
            <div class="form-floating">
            <input pattern="\d{4}-\d{2}-\d{2}"
             v-model="date" :placeholder="s" class="form-control" id="floatingPassword" :type="type" onfocus="(this.type='date')" >
            <label for="floatingPassword">Workout Date</label>
            </div>

            <button id="createButton" class="w-100 btn btn-lg btn-primary" @click="onWorkoutUpdate" type="button">Update Workout</button>

        </div>
    </main>
</template>

<script>
import moment from 'moment';

export default {

    async asyncData({$axios, params}) {
        try {
            let response =  await $axios.$post(`/api/workout/${params.id}`);

            let workout = response.workout

            workout.dateScheduled = moment(String(workout.dateScheduled))
                .format('MM/DD/YYYY')
            
            let s = new Date(workout.dateScheduled).toLocaleDateString();




            return {
                workout: workout,
                s: s
            }
        } catch (err) {
            console.log(err);
        }
    },
    data(){
        return {
            type:'text',
            name: "",
            notes: "",
            date: null
        }
    },
    methods: {
        async onWorkoutUpdate() {
            try {
                let updatedName = this.name
                if(this.name == "") {
                    updatedName = this.workout.name
                }
                let updatedNotes = this.notes
                if(this.notes == "") {
                    updatedNotes = this.workout.notes
                }
                let updatedDate = this.date
                if(this.date === null) {
                    updatedDate = this.workout.dateScheduled
                }

                let workoutData = {
                    workoutId: this.workout._id,
                    name: updatedName,
                    notes: updatedNotes,
                    dateScheduled: updatedDate                  
                }
                let response = await this.$axios.$put('/api/workout', workoutData)

                this.$router.push(`/workout/${this.workout._id}`);


            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>

<style scoped>
#createButton {
  border: 2px solid rgb(57, 165, 17);
  border-radius: 3px;
  background-color: black;
  color:rgb(57, 165, 17);
}
#createButton:hover {
  border: 2px solid black;
  border-radius: 3px;
  background-color: rgb(57, 165, 17);
  color: black;
}
input[type="text"],input[type="date"], textarea[type="text"] {
  background-color: black;
  color: rgb(57, 165, 17);
}

</style>