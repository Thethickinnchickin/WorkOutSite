<template>
   <tr >
    <td v-if="!set.isCompleted" @click="isCompleted(set._id, true)" class="text-right"><button class="btn btn-sm btn-danger">Set Inomplete</button> </td>
    <td v-if="set.isCompleted"  class="text-right">
        <button @click="isCompleted(set._id, false)" style="font-size: 15px" v-b-modal.modal-delete-exercise class="btn btn-sm btn-success">Set Complete</button>
    </td>                        
    <td>{{set.targetRepAmount}}</td>

    <td v-if="!set.isCompleted"><input class="form-control"  v-model="actualRep"
    @submit="setTargetAmount(set._id, actualRepAmount, null, null)"  type="number" value="0" /></td>
    <td v-else class="text-right">{{set.actualRepAmount}}</td>
    <td class="text-right">{{set.targetWeight}}</td>

    <td v-if="!set.isCompleted"><input v-model="actualWeight"
    @submit="setTargetAmount(set._id, null, set.actualWeight, null)" class="form-control" type="number" value="0" /></td>
    <td v-else class="text-right">{{set.actualWeight}}</td>

    <td class="text-right">{{set.targetTimeinSeconds|| 'none'}}</td>



    <td v-if="set.targetTimeInSeconds" class="text-right">{{set.actualTimeInSeconds || "0" + " sec(s)"}}</td>
    <td v-if="!set.isCompleted && set.targetTimeinSeconds"><input v-model="actualTime"
    @submit="setTargetAmount(set._id, null, null, set.actualTimeInSeconds)" 
    class="form-control" type="number" value="0" /></td>
    <td v-else-if="set.targetTimeinSeconds" class="text-right">{{set.actualTimeInSeconds || "0" + " sec(s)"}}</td>
    <td v-else-if="!set.targetTimeinSeconds"></td>
    <td v-else-if="!set.targetTimeinSeconds"></td>
    <td></td>
   </tr>
</template>

<script>
export default {
    data() {
        return {
            actualRep: 0,
            actualWeight: 0,
            actualTime: 0
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
                }
            }
        },
        async sendTargetAmounts(setId) {
            let response = await this.$axios.$put('/api/set', {updateType: "actual",
                actualRepAmount: this.actualRep,
                actualWeight: this.actualWeight,
                actualTimeInSeconds: this.actualTime,
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
                    consol.log()
                    if(this.actualTime) {
                        sets[i].actualTimeInSeconds = this.actualTime                     
                    }
                }
            }
        }
    }
}
</script>