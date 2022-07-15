<template>
   <tr style="font-size: 10px">
    <td style="font-size:1vw" v-if="!set.isCompleted" @click="isCompleted(set._id, true)" class="text-right"><button class="btn btn-sm btn-outline-danger">Set Inomplete</button> </td>
    <td  style="font-size:1vw" v-if="set.isCompleted"  class="text-right">
        <button @click="isCompleted(set._id, false)" style="font-size: 15px" v-b-modal.modal-delete-exercise class="btn btn-sm btn-outline-success">Set Complete</button>
    </td>

    <!-- Target Reps -->
    <td v-if="set.targetRepAmount" class="text-center">{{set.targetRepAmount}} reps</td>
    <td v-else></td>

    <!-- Actual Reps -->
    <td v-if="!set.isCompleted"><input class="form-control"  v-model="actualRep"
        @submit="setTargetAmount(set._id, actualRepAmount, null, null)"  type="number" value="0"  max="100" min="0"/></td>
    <td v-else-if="set.isCompleted && set.actualRepAmount" style="color: rgb(255, 49, 49)" class="text-center">{{set.actualRepAmount}} reps</td>
    <td v-else></td>

    <!-- Target Weight -->
    <td v-if="set.targetWeight" class="text-center">{{set.targetWeight}} lbs</td>
    <td v-else></td>

    <!-- Actual Weight-->
    <td v-if="!set.isCompleted"><input v-model="actualWeight"
        @submit="setTargetAmount(set._id, null, set.actualWeight, null)" class="form-control" type="number" value="0"  max="100" min="0"/></td>
    <td v-else-if="set.isCompleted && set.actualWeight"  style="color: rgb(255, 49, 49)" class="text-right">{{set.actualWeight}} lbs</td>
    <td v-else></td>

    <!-- Target Time -->
    <td v-if="set.targetTimeinSeconds" class="text-center">{{`${set.targetTimeinSeconds}  sec(s)`|| ''}}</td>
    <td v-else ></td>

    <!-- Actual Time -->
     <td v-if="set.targetTimeinSeconds && !set.isCompleted" ><input v-model="actualTime"
        @submit="setTargetAmount(set._id, null, null, set.actualTimeinSeconds)" 
        class="form-control" type="number" value="0"  max="100" min="0"/></td>
    <td v-else-if="set.isCompleted && set.actualTimeinSeconds"  style="color: rgb(255, 49, 49)" class="text-center">{{set.actualTimeinSeconds + " sec(s)"}}</td>
    <td v-else></td>

    <!-- Target Load -->
    <td v-if="set.targetLoad" class="text-center">{{set.targetLoad}}</td>
    <td v-else></td>

    <!-- Actual Load-->
    <td v-if="!set.isCompleted && set.targetLoad"><input v-model="actualLoad"
        class="form-control" type="number"   max="100" min="0"/></td>
    <td v-else-if="set.isCompleted && set.actualLoad" class="text-center" style="color: rgb(255, 49, 49)">{{set.actualLoad}}</td>
    <td v-else></td>
    
    <!-- RPE -->
    <td v-if="set.rpe" class="text-center">{{set.rpe}}</td>
    <td v-else></td>

    <!-- Rest -->
    <td v-if="set.rest" class="text-center">{{set.rest}} mins</td>
    <td v-else></td>
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
                actualTimeinSeconds: this.actualTime,
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
                        sets[i].actualTimeinSeconds = this.actualTime                     
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
                actualTimeinSeconds: this.actualTime,
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
                        sets[i].actualTimeinSeconds = this.actualTime                     
                    }
                }
            }
        }
    }
}
</script>