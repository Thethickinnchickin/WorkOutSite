<template>
   <tr style="font-size: 10px">
    <td style="font-size:1vw" v-if="!set.isCompleted"
      class="text-right">
        <div v-if="set.rest">
            <b-button  @click="stopCountdown()" type="button"
             class="btn btn-sm btn-outline-danger" v-b-modal="`${set._id}`">
                Set Incomplete
            </b-button>
            <b-modal :hide-footer="true" :id="`${set._id}`" title="Hold On">
                <p class="my-4 text-center">Rest Timer</p>
                <h3 v-if="countdownActive !== 'active'" class="text-center" :id="`${set._id}:countdownTimer`">{{set.rest}} mins</h3>
                <h3 v-else-if="restTimeInSeconds > 0 && countdown !== 'active'" 
                class="text-center">{{restTimeInSeconds}} secs</h3>
                <b-button  
                    class="btn btn-warning text-center" :id="`${set._id}:startTimer`" 
                    @click="startCountdown(set.rest, set._id)">
                        Start Timer
                </b-button>
                <b-button  @click="isCompleted(set._id, true)" 
                class="btn btn-danger text-center">Complete Set</b-button>
            </b-modal>            
        </div>
        <button @click="isCompleted(set._id, true)"  v-else class="btn btn-sm btn-outline-danger">
            Set Inomplete
        </button> 
    </td>
    <td  style="font-size:1vw" v-if="set.isCompleted"  class="text-right">
        <button @click="isCompleted(set._id, false)"
         style="font-size: 15px" v-b-modal.modal-delete-exercise
          class="btn btn-sm btn-outline-success">
          Set Complete
        </button>
    </td>

    <!-- Target Reps -->
    <td v-if="set.targetRepAmount" class="text-center">{{set.targetRepAmount}} reps</td>
    <td v-else></td>

    <!-- Actual Reps -->
    <td v-if="!set.isCompleted">
        <input class="form-control"  v-model="actualRep"
        @submit="setTargetAmount(set._id, actualRepAmount, null, null)"
          type="number" value="0"  max="100" min="0"/>
    </td>
    <td v-else-if="set.isCompleted && set.actualRepAmount"
     style="color: rgb(255, 49, 49)" class="text-center">
        {{set.actualRepAmount}} reps
    </td>
    <td v-else></td>

    <!-- Target Weight -->
    <td v-if="set.targetWeight" class="text-center">
        {{set.targetWeight}} lbs
    </td>
    <td v-else></td>

    <!-- Actual Weight-->
    <td v-if="!set.isCompleted"><input v-model="actualWeight"
        @submit="setTargetAmount(set._id, null, set.actualWeight, null)"
         class="form-control" type="number" value="0"  max="100" min="0"/>
    </td>
    <td v-else-if="set.isCompleted && set.actualWeight"  style="color: rgb(255, 49, 49)"
     class="text-right">
        {{set.actualWeight}} lbs
    </td>
    <td v-else></td>

    <!-- Target Time -->
    <td v-if="set.targetTimeinSeconds" class="text-center">
        {{`${set.targetTimeinSeconds}  sec(s)`|| ''}}</td>
    <td v-else ></td>

    <!-- Actual Time -->
     <td v-if="set.targetTimeinSeconds && !set.isCompleted" ><input v-model="actualTime"
        @submit="setTargetAmount(set._id, null, null, set.actualTimeinSeconds)" 
        class="form-control" type="number" value="0"  max="100" min="0"/></td>
    <td v-else-if="set.isCompleted && set.actualTimeinSeconds"
      style="color: rgb(255, 49, 49)" class="text-center">
      {{set.actualTimeinSeconds + " sec(s)"}}
    </td>
    <td v-else></td>

    <!-- Target Load -->
    <td v-if="set.targetLoad" class="text-center">{{set.targetLoad}}</td>
    <td v-else></td>

    <!-- Actual Load-->
    <td v-if="!set.isCompleted && set.targetLoad">
        <input v-model="actualLoad"
        class="form-control" type="number"   max="100" min="0"/>
    </td>
    <td v-else-if="set.isCompleted && set.actualLoad" class="text-center"
     style="color: rgb(255, 49, 49)">
        {{set.actualLoad}}
    </td>
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
    font-size: 10px;
    color: red
}
</style>

<script>
var timer;

export default {
    data() {
        return {
            actualRep: 0,
            actualWeight: 0,
            actualTime: 0,
            actualLoad: 0
        }
    },
    asyncData() {
        return {
            countdownActive: 'inactive',
            restTimeInSeconds: 0,
            timer: null
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
        },
        startCountdown(rest, setId) {

            if(this.countdownActive === 'active') {
                console.log("GOT YA")
            } else {
                let totalRest = Math.floor(rest * 60);
                this.restTimeInSeconds = totalRest;
                this.countdownActive = 'active';     
                document.getElementById(`${setId}:startTimer`).setAttribute('disabled', true)

                let countType = this.countdownActive
     
                timer = setInterval(function() {
                    if(countType === "active") {
                        totalRest --;
                        this.restTimeInSeconds = totalRest;   
                        document.getElementById(`${setId}:countdownTimer`).innerHTML = this.restTimeInSeconds + " secs"
        
                        if(this.restTimeInSeconds <= 0) {
                            document.getElementById(`${setId}:countdownTimer`).innerHTML = 'All Done';
                            document.getElementById(`${setId}:startTimer`).innerHTML = 'Start Again'
                            document.getElementById(`${setId}:startTimer`).removeAttribute('disabled')
                            clearInterval(timer);
                            this.countdownActive = 'inactive'
                        }

                }
            } , 1000) 

            this.countdownActive = 'inactive'
            this.restTimeInSeconds = 0;

        }  
        },
        stopCountdown() {
            clearInterval(timer)
            this.countdownActive = 'inactive'
            this.restTimeInSeconds = 0
        }
    }
}
</script>