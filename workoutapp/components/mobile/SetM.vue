<template>
    <main>
        <div v-if="set.isCompleted" class="ml-0 row setCompletedHeader">
            <div class="col">
                <h1 class="pt-3" style="font-size: 12px">Set {{exercise.sets.indexOf(set) + 1}}</h1>
            </div>     
        </div>   
        <div v-else class="ml-0 row setIncompleteHeader">
            <div class="col">
                <h1 class="pt-3" style="font-size: 12px; color: red">Set {{exercise.sets.indexOf(set) + 1}}</h1>
            </div>
                
        </div>
        <div v-if="!set.isCompleted"  class="setIncomplete">
            <div v-if="setCollapse">
                <p v-if="set.targetRepAmount" class="m-0 border">Target Reps <span>{{set.targetRepAmount}}</span></p>
                <p v-if="set.targetRepAmount" class="m-0 border">Actual Reps <input class="text-center" v-model="actualRep" :placeholder="set.targetReps" type="number"></p> 
                <p v-if="set.targetWeight" class="m-0 border">Target Weight <span>{{set.targetWeight}}</span></p> 
                <p v-if="set.targetWeight" class="m-0 border">Actual Weight <input class="text-center" v-model="actualWeight" :placeholder="set.targetWeight" type="number"></p> 
                <p v-if="set.targetTimeinSeconds" class="m-0 border">Target Time <span>{{set.targetTimeinSeconds}}</span>(secs) </p> 
                <p v-if="set.targetTimeinSeconds" class="m-0 border">Actual Time <input class="text-center" v-model="actualTime" type="number"></p> 
                <p v-if="set.targetLoad" class="m-0 border">Target Load <span>{{set.targetLoad}}</span></p> 
                <p v-if="set.targetLoad" class="m-0 border">Actual Load <input class="text-center" v-model="actualLoad" type="number"></p> 
                <p v-if="set.rpe" class="m-0 border">RPE <span>{{set.rpe}}</span></p> 
                <p v-if="set.rest" class="m-0 border">Rest (mins) <span>{{set.rest}}</span></p>  
                <div class="row">
                    <div class="col">
                        <button class="btn btn-outline-success mb-1" @click="isCompleted(set._id, true)">Complete</button>  
                    </div>
                    <div class="col">
                      <button class="btn btn-outline-danger mb-1" @click="toggleSet">x Close</button>  
                    </div>
                    
                    
                </div>
                
            </div>
            <div v-else>
                <button @click="toggleSet" class="btn btn-outline-warning">View</button>
            </div>
            
        </div> 
        <div v-else class="setIncomplete">
            <div v-if="setCollapse">
                <p v-if="set.targetRepAmount" class="m-0 border">Target Reps <span>{{set.targetRepAmount}}</span></p> 
                <p v-if="set.targetRepAmount" class="m-0 border">Actual Reps <span>{{set.actualRepAmount}}</span></p> 
                <p v-if="set.targetWeight" class="m-0 border">Target Weight <span>{{set.targetWeight}}</span></p> 
                <p v-if="set.targetWeight" class="m-0 border">Actual Weight <span>{{set.actualWeight}}</span></p> 
                <p v-if="set.targetTimeinSeconds" class="m-0 border">Target Time (secs) <span>{{set.targetTimeinSeconds}}</span></p> 
                <p v-if="set.targetTimeinSeconds" class="m-0 border">Actual Time <span>{{set.actualTimeinSeconds}}</span></p> 
                <p v-if="set.targetLoad" class="m-0 border">Target Load <span>{{set.targetLoad}}</span></p> 
                <p v-if="set.targetLoad" class="m-0 border">Actual Load <span>{{set.actualLoad}}</span></p> 
                <p v-if="set.rpe" class="m-0 border">RPE <span>{{set.rpe}}</span></p> 
                <p v-if="set.rest" class="m-0 border">Rest (mins) <span>{{set.rest}}</span></p>  
                <div class="row">
                    <div class="col">
                        <button class="btn btn-outline-warning mb-1" @click="isCompleted(set._id, false)">Incomplete</button>  
                    </div>
                    <div class="col">
                      <button class="btn btn-outline-danger mb-1" @click="toggleSet">x Close</button>  
                    </div>
                    
                    
                </div>
            </div>
            <div v-else>
                <button @click="toggleSet" class="btn btn-warning">View</button>
            </div>
        </div>
    </main>
    

</template>

<script>
    
export default {
    data() {
         return {
             actualRep: 0,
             actualWeight: 0,
             actualTime: 0,
             actualLoad: 0,
             countdownActive: 'inactive',
             restTimeInSeconds: 0,
             timersStarted: 0,
             setCollapse: false
         }
     },
    props: ["set", "exercise"],
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
         startCountdown(rest, setId) {
             this.timersStarted ++;
 
             if (this.timersStarted > 1) {
                 let totalRest = rest * 60;
                 this.restTimeInSeconds = totalRest;
                 this.countdownActive = 'active';     
                 document.getElementById('startTimer').setAttribute('disabled', true)
      
                 let timer = setInterval(function() {
 
                     totalRest --;
                     this.restTimeInSeconds = totalRest;  
                     if(document.getElementById('countdownTimer')) {
                         document.getElementById('countdownTimer').innerHTML = this.restTimeInSeconds + " secs"
                     }
                     
                     if(this.restTimeInSeconds = 0) {
                         document.getElementById('countdownTimer').innerHTML = 'All Done';
                         document.getElementById('startTimer').innerHTML = 'Start Again'
                         document.getElementById('startTimer').removeAttribute('disabled')
                         clearInterval(timer);                            
                     } else if(this.restTimeInSeconds < 0) {
                         clearInterval(timer);
                     }                           
                 }, 1000) 
                 
                 if(this.countdownActive !== 'inactive') {
                     this.countdownActive = 'inactive'                    
                 }                
             } else {
                 
                 let totalRest = rest * 60;
                 this.restTimeInSeconds = totalRest;
                 this.countdownActive = 'active';     
                 document.getElementById(setId).remove()
                 document.getElementById('startTimer').setAttribute('disabled', true)
      
                 let timer = setInterval(function() {
   
                         totalRest --;
                         this.restTimeInSeconds = totalRest;  
                         if(document.getElementById('countdownTimer')) {
                             console.log("second: " + this.restTimeInSeconds)
                             document.getElementById('countdownTimer').innerHTML = this.restTimeInSeconds + " secs"
                         }
                        
                         if(this.restTimeInSeconds <= 0) {
                             document.getElementById('countdownTimer').innerHTML = 'All Done';
                             document.getElementById('startTimer').innerHTML = 'Start Again'
                             document.getElementById('startTimer').removeAttribute('disabled')
                             clearInterval(timer);                            
                         }
                 }, 1000) 
                 
                 if(this.countdownActive !== 'inactive') {
                     this.countdownActive = 'inactive'                    
                 }
             }
         },
         toggleSet() {
            this.setCollapse = !this.setCollapse;
         }
     }
}
</script>

<style scoped>
        @media only screen and (max-width: 500px) {
        .isMain{
            display: none;
        }
        button {
            font-size: 7px;
        }
        input[type="number"] {
            width: 10vw;
            font-size: 10px;
            background-color: white;
            border-radius: 5px;
            color: black;
            font-size: 8px;
        }
        .isMobile {
            display: flex;
            margin: auto;
            justify-content: center;
            align-items: center;
        }
        .backdiv {
            height: 80vh;
            width: 80vw;
            background-color: black;
            border: 2px solid white;
            margin: auto;
            border-radius: 20px;
        }
        #background-title {
            width: 70vw;
            height: 10vh;
            margin: auto;
            background-color: black;
            border: 2px solid white;
            border-radius: 20px;
            
        } 
        .editButton {
            background-color: black;
            box-shadow: none;
            color: white;
            border: 2px solid white;
            border-radius: 20px;
            width: 20vw;
            height: 4vh;
            margin-top: 10px;
            color: rgb(255,215,0)
        }
        .deleteButton {
            background-color: black;
            box-shadow: none;
            color: white;
            border: 2px solid white;
            border-radius: 20px;
            width: 20vw;
            width: 20vw;
            height: 4vh;
            margin-top: 10px;
            color: red;
        }
        .duplicateButton {
            background-color: black;
            box-shadow: none;
            color: white;
            border: 2px solid white;
            border-radius: 20px;
            width: 20vw;
            width: 20vw;
            height: 4vh;
            margin-top: 10px;
            color: royalblue;
        }
        .editButton:hover {
            background-color: rgb(255,215,0);
            color: black;
        }
        .deleteButton:hover {
            background-color: red;
            color: black;
        }
        .duplicateButton:hover {
            background-color: royalblue;
            color: black;
        }
        .setsCol {
            height: auto;
            background-color: white;
            width: 0%;
            border-radius: 20px;
        }
        .setComplete > p {
            font-size: 8px;
            color: black;
        }
    
        span {
            color: rgb(57, 165, 17);
        }
        p {
            font-size: 8px;
            color: white;
        }
        .setCompletedHeader {
            background-color: black;
            border: 2px solid rgb(57, 165, 17);
            border-radius: 20px 20px 0 0;
            width: 100%; 
        }
        .setIncompleteHeader {
            background-color: black;
            border: 2px solid red;
            border-radius: 20px 20px 0 0;
            width: 100%;
        }
        .setIncompleteHeader > h1 {
            color: red;
        }
    }
</style>