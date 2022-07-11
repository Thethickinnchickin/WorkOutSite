<template>
   <tr style="font-size: 10px">
    <td style="font-size:1vw" v-if="!set.isCompleted" @click="isCompleted(set._id, true)" class="text-right"><button class="btn btn-sm btn-outline-danger">Set Inomplete</button> </td>
    <td  style="font-size:1vw" v-if="set.isCompleted"  class="text-right">
        <button @click="isCompleted(set._id, false)" style="font-size: 15px" v-b-modal.modal-delete-exercise class="btn btn-sm btn-outline-success">Set Complete</button>
    </td>                        
    <td class="text-center">{{set.targetRepAmount}} reps</td>

    <td v-if="!set.isCompleted"><input class="form-control"  v-model="actualRep"
        @submit="setTargetAmount(set._id, actualRepAmount, null, null)"  type="number" value="0"  max="100" min="0"/></td>
    <td v-else style="color: rgb(255, 49, 49)" class="text-right">{{set.actualRepAmount}} reps</td>
    <td class="text-center">{{set.targetWeight}} lbs</td>

    <td v-if="!set.isCompleted"><input v-model="actualWeight"
        @submit="setTargetAmount(set._id, null, set.actualWeight, null)" class="form-control" type="number" value="0"  max="100" min="0"/></td>

    <td v-else  style="color: rgb(255, 49, 49)" class="text-right">{{set.actualWeight}} lbs</td>
    <td class="text-center">{{set.targetTimeinSeconds|| 'none'}} sec(s)</td>
    <td v-if="set.targetTimeInSeconds"  style="color: rgb(255, 49, 49)" class="text-right">{{set.actualTimeInSeconds + " sec(s)" || "0" + " sec(s)"}}</td>
    <td v-if="!set.isCompleted && set.targetTimeinSeconds"><input v-model="actualTime"
        @submit="setTargetAmount(set._id, null, null, set.actualTimeInSeconds)" 
        class="form-control" type="number" value="0"  max="100" min="0"/></td>
    <td v-else-if="set.targetTimeinSeconds" class="text-center" style="color: rgb(255, 49, 49)">{{set.actualTimeInSeconds + " sec(s)" || "0" + " sec(s)"}}</td>
    <td v-else-if="!set.targetTimeinSeconds"></td>
    <td v-if="!set.targetTimeinSeconds"></td>
    <td v-if="set.targetLoad" class="text-right">{{set.targetLoad}}</td>
    <td v-if="!set.isCompleted && set.targetLoad"><input v-model="actualLoad"
        class="form-control" type="number" value="0"  max="100" min="0"/></td>
    <td v-else class="text-right" style="color: rgb(255, 49, 49)">{{set.actualLoad}}</td>
    <td v-if="set.rpe" class="text-right">{{set.rpe}}</td>
    <td v-if="set.rest" class="text-right">{{set.rest}} secs</td>
   </tr>    

</template>

<style scoped>
input {
    font-size: .5vw;
    color: red
}
</style>

<script>
export default {
    data() {
        return {
            actualRep: 0,
            actualWeight: 0,
            actualTime: 0,
            actualLoad: 0
        }
    },
    props: ["set", "setNumber", "exercise"],
    methods: {
        async isCompleted(setId, isCompleted) {
            let response = await this.$axios.$put('/api/set/isCompleted', 
            {setId: setId, isCompleted: isCompleted});

            for(let i=0; i < this.exercise.sets.length; i++) { 
                let sets = this.exercise.sets;
                if(sets[i]._id === setId) {
                    sets[i].isCompleted = isCompleted
                }
            }
            await this.$axios.$put('/api/set', {updateType: "actual",
                actualRepAmount: this.actualRep,
                actualWeight: this.actualWeight,
                actualTimeInSeconds: this.actualTime,
                actualLoad: this.actualLoad,
                setId: setId
            })

            for(let i=0; i < this.exercise.sets.length; i++) { 
                let sets = this.exercise.sets;
                if(sets[i]._id === setId) {
                    if(this.actualRep) {
                        sets[i].actualRepAmount = this.actualRep                  
                    }
                    if(this.actualWeight) {
                        sets[i].actualWeight = this.actualWeight                        
                    }
                    if(this.actualTime) {
                        sets[i].actualTimeInSeconds = this.actualTime                     
                    }
                    if(this.actualLoad) {
                        sets[i].actualLoad = this.actualLoad
                    }
                }
            }
        },
        async sendTargetAmounts(setId) {
            let response = await this.$axios.$put('/api/set', {updateType: "actual",
                actualRepAmount: this.actualRep,
                actualWeight: this.actualWeight,
                actualTimeInSeconds: this.actualTime,
                setId: setId
            });

            for(let i=0; i < this.exercise.sets.length; i++) { 
                let sets = this.exercise.sets;
                if(sets[i]._id === setId) {
                    if(this.actualRep) {
                        sets[i].actualRepAmount = this.actualRep                  
                    }
                    if(this.actualWeight) {
                        sets[i].actualWeight = this.actualWeight                        
                    }
                    if(this.actualTime) {
                        sets[i].actualTimeInSeconds = this.actualTime                     
                    }
                }
            }
        }
    }
}
</script>