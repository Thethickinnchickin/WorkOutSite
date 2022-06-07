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
                            <th scope="col">Sets</th>
                            <th scope="col">Target Reps</th>
                            <th scope="col" class="text-center">Actual Reps</th>
                            <th scope="col" class="text-right">Target Weight</th>
                            <th scope="col" class="text-right">Actual Weight</th>
                            <th scope="col" class="text-right">Target Time</th>
                            <th scope="col" class="text-right">Actual Time</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="set in exercise.sets">
                            <td v-if="!set.isCompleted" @click="isCompleted(set._id, true)" class="text-right"><button class="btn btn-sm btn-danger">Set Inomplete</button> </td>
                            <td v-if="set.isCompleted"  class="text-right">
                            <b-button style="font-size: 15px" v-b-modal.modal-delete-exercise class="btn btn-sm btn-success">Set Complete</b-button>


                            <b-modal :hide-footer="true" id="modal-delete-exercise" title="Wait a seconds...">
                                <p class="my-4">Are you sure you want to mark this exercise as incomplete?</p>
                                <b-button class="btn-danger" @click="isCompleted(set._id, false)" >Make Incomplete</b-button>
                            </b-modal>

                             </td>                        
                            <td>Set: {{exercise.sets.indexOf(set) + 1}}</td>
                            <td>{{set.targetRepAmount}}</td>

                            <td v-if="!set.isCompleted"><input class="form-control"  v-model="actualRep"
                            @submit="setTargetAmount(set._id, actualRepAmount, null, null)"  type="number" value="0" /></td>
                            <td v-else class="text-right">{{set.actualRepAmount}}</td>
                            <td class="text-right">{{set.targetWeight}}</td>

                            <td v-if="!set.isCompleted"><input v-model="actualWeight"
                            @submit="setTargetAmount(set._id, null, set.actualWeight, null)" class="form-control" type="number" value="0" /></td>
                            <td v-else class="text-right">{{set.actualWeight}}</td>

                            <td class="text-right">{{set.targetTimeinSeconds|| 'none'}}</td>

                            <td v-if="!set.isCompleted && set.targetTimeInSeconds"><input v-model="actualTime"
                            @submit="setTargetAmount(set._id, null, null, set.actualTimeInSeconds)" 
                            class="form-control" type="text" value="0" /></td>

                            <td v-else-if="set.targetTimeInSeconds" class="text-right">{{set.actualTimeInSeconds || "0" + " sec(s)"}}</td>
                            <td v-else class="text-right">{{set.actualTimeInSeconds || "0" + " sec(s)"}}</td>
                            <td></td>
            
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col mb-2">
            <div class="row">
                <div class="col-sm-12  col-md-6">
                    <button class="btn btn-block btn-light">Continue Shopping</button>
                </div>
                <div class="col-sm-12 col-md-6 text-right">
                    <button class="btn btn-lg btn-block btn-success text-uppercase">Checkout</button>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
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
    props: ["exercise"],
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