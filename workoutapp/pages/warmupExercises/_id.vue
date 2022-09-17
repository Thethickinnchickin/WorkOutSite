<template>
    <main style="width: 100%;" class="text-center mt-3 pt-5">
    <div class="isMain">
        <div v-if="!loading">
            <div class="row d-flex">
                <div class="col-2">
                
                </div>
                <div class="col-8">
                <h1 class="mt-5 float-middle" id="workoutName">
                    {{workoutName}}
                </h1>
                </div>
                <div class="col-2">
                    <p class="mt-5 ml-3">Page:{{getPageNumber}}</p>
                </div>
        
        
        
            </div>
            <div class="row">
                <div class="col">
                <button
                @click="onRouteReturn" id="backButton">Back To Workout</button>     
                </div>
            </div>
            <div  v-for="exercise in exercises" :key="exercise._id">
                <div  v-if="exercises.indexOf(exercise) + 1 === pageNumber">
                        <Exercise :exercise='exercise'/>        
                </div>
            </div>
            <div class="row mt-5">
                <div class="col" v-if="exercises !== undefined">
                    <div class="pagination p1 justify-content-center">
                        <ul>
                            <a @click="pageChange('subtract', pageNumber)"><li>&lt;</li></a>
                            <a style="color: white" :class="index === getPageNumber ? 'is-active' :''" 
                            :disabled="index === getPageNumber ? true : false"
                            v-for="index in exercises.length" :key="index" @click="pageChange('none', index)"><li>{{index}}</li></a>
                            <a @click="pageChange('add', pageNumber)"><li>></li></a>
                        </ul>
                    </div>      
                </div>
            </div>
        </div>
        <div v-else  class="my-5 py-5">
            <Loading/>
        </div>        
    </div>
    <div class="isMobile">
        <div class="backdiv mt-5 ml-5" style="height: 60vh; overflow: scroll"  >
            <div class="row mt-2">
                    <button class="backButton" style="margin: 10px auto;" @click="onRouteReturn">Back to Workout</button>
            </div>
            <div class="row">
                <h1 class="col" style="font-size: 12px">{{workoutName}}</h1>
            </div>
            <div class="row">
                <div class="col" v-if="exercises !== undefined">
                    <div class="pagination p1 justify-content-center">
                        <ul>
                            <a @click="pageChange('subtract', pageNumber)"><li>&lt;</li></a>
                            <a style="color: white" :class="index === getPageNumber ? 'is-active' :''" 
                            :disabled="index === getPageNumber ? true : false"
                            v-for="index in exercises.length" :key="index" @click="pageChange('none', index)"><li>{{index}}</li></a>
                            <a @click="pageChange('add', pageNumber)"><li>></li></a>
                        </ul>
                    </div>      
                </div>
            </div>
            <div class="row"></div>
            <div class="row-8 pt-3" id="background-title">
                <h1 style="font-size: 12px;">{{workoutName}}</h1>
                <div v-for="exercise of exercises">
                    <h1 v-if="exercises.indexOf(exercise) + 1 === pageNumber" style="font-size: 10px">{{exercise.name}}</h1>
                </div>
            </div>
            <div v-for="exercise of exercises"  :key="exercise._id">
                <div  v-if="exercises.indexOf(exercise) + 1 === pageNumber">
                    <div>
                        
                        <div v-for="set of exercise.sets"
                         style="margin: auto; margin-bottom: 10px;"  class="setsCol mt-2">
                            <SetM :set="set"  :exercise="exercise" />
                        </div>        
                        <button v-if="exercise.isCompleted" class="setclick"
                        style="margin: auto; margin-bottom: 10px;" @click="completeExercise(false, exercise)">
                        Complete Exercise
                    </button> 
                    <button v-else class="setclick-wrong"
                        style="margin: auto; margin-bottom: 10px;" @click="completeExercise(true, exercise)">
                    Make Incomplete
                    </button>                
                    </div> 
                </div>
            </div>
            
        </div>
    </div>

    
    </main>
</template>
    
    
<script>
    import Exercise from '~/components/Exercise.vue';
    import Loading from '~/components/Loading.vue';
    import SetM from '~/components/mobile/SetM.vue'
    import { mapGetters, mapActions } from "vuex";
    
    export default  {
        components: {
            Exercise,
            Loading,
            SetM
        },
        data() {
            return {
                pageNumber: 1,
                loading: false,
            }
        },
        async asyncData({$axios, params}) {
            let response = await $axios.$post(`/api/exercise`,
             {searchParams: {workoutId: params.id, isWarmup: true}});
    
    
             return {
                 exercises: response.exercise,
                 workoutName: response.workoutName,
                 workoutId: response.workoutId
             }
    
        },
        beforeCreate() {
            this.loading = true;
        },
        created() {
            this.loading = true;
        },
        mounted() {
            this.loading = false;
        },
        methods: {
            ...mapActions(['newPageNumber']),
            pageChange(changeType, pageNumber) {
                if(changeType === "add") {
                    if(this.pageNumber >= 1 && this.pageNumber < this.exercises.length) {
                        this.pageNumber++;
                        this.newPageNumber(this.pageNumber)
                    }
                } else if (changeType === "subtract") {
                    if(this.pageNumber > 1 && this.pageNumber <= this.exercises.length) {
                        this.pageNumber--;
                        this.newPageNumber(this.pageNumber)
                    }
    
                } else {
    
                    if(this.pageNumber !== pageNumber) {
                        this.pageNumber = pageNumber
                        this.newPageNumber(this.pageNumber)                    
                    }
    
                }
            },
            onRouteReturn() {
                this.newPageNumber(1)
                this.$router.push(`/workout/${this.workoutId}`);
            },
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
            completeExercise(isCompleted, exercise) {
                this.$axios.$put('/api/exercise/isCompleted',
                {exerciseId: exercise._id, isCompleted: isCompleted })

                exercise.isCompleted = isCompleted;
            },
        },
        computed: {
            ...mapGetters(["getPageNumber"])
        },
    
    } 
</script>
    
<style scoped>
    #backButton {
        background-color: rgba(0,0,0,.5);
        border: 2px soid ;
        color: rgb(57, 165, 17);
        border-radius: 5px;
    }
    #backButton:hover {
        background-color: black;
        border: 2px soid rgb(57, 165, 17);
        color: rgb(57, 165, 17);
        border-radius: 5px;
    }
    
    a{
      text-decoration: none;
    }
    
    p, li, a{
      font-size: 14px;
    }
    
    /* GRID */
    
    .twelve { width: 100%; }
    .eleven { width: 91.53%; }
    .ten { width: 83.06%; }
    .nine { width: 74.6%; }
    .eight { width: 66.13%; }
    .seven { width: 57.66%; }
    .six { width: 49.2%; }
    .five { width: 40.73%; }
    .four { width: 32.26%; }
    .three { width: 23.8%; }
    .two { width: 15.33%; }
    .one { width: 6.866%; }
    
    /* COLUMNS */
    
    .col {
        display: block;
        float:left;
        margin: 1% 0 1% 1.6%;
    }
    
    .col:first-of-type {
      margin-left: 0;
    }
    
    .container{
      width: 100%;
      max-width: 940px;
      margin: 0 auto;
      position: relative;
      text-align: center;
    }
    
    /* CLEARFIX */
    
    .cf:before,
    .cf:after {
        content: " ";
        display: table;
    }
    
    .cf:after {
        clear: both;
    }
    
    .cf {
        *zoom: 1;
    }
    
    /* GENERAL STYLES */
    
    .pagination{
      padding: 0px 0;
    }
    .pagination:hover {
       cursor: pointer;
    }
    
    .pagination ul{
      margin: 0;
      padding: 0;
      list-style-type: none;
    }
    
    .pagination a{
      display: inline-block;
      padding: 10px 18px;
      color: white;
    }
    
    /* ONE */
    
    .p1 a{
      width: 30px;
      height: 30px;
      line-height: 29px;
      padding: 0;
      text-align: center;
      color: white;
    }
    
    .p1 a.is-active{
      background-color: black;
      border: 2px solid rgb(57, 165, 17);
      border-radius: 100%;
      color: white;
    }
    
    .is-active {
      color: white
    }
    #workoutName {
        animation: blinking 1.5s infinite;
        color: rgb(255,215,0);
    }
    @keyframes blinking{
        60% {
        opacity: 0.2;
        }
    }

    @media only screen and (max-width: 500px) {
        .isMain{
            display: none;
        }
        button {
            font-size: 7px;
        }
        .setclick {
            background-color: black;
            border: 2px solid rgb(57, 165, 17);
            color: rgb(57, 165, 17);
            font-size: 12px;
            border-radius: 20px;
        }
        .setclick:hover {
            background-color: rgb(57, 165, 17);
            color: black;
            box-shadow: 3px rgb(57, 165, 17);
        }
        .setclick-wrong {
            background-color: black;
            border: 2px solid red;
            color: red;
            font-size: 12px;
            border-radius: 20px;
        }
        .setclick-wrong:hover {
            background-color: red;
            color: black;
            box-shadow: 3px red;
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
            background-color: black;
            border: 2px solid rgb(121, 221, 255);
            border-top: none;
            border-left: none;
            border-right: none;
            width: 89%;
            border-radius: 20px;
        }
        .setComplete > p {
            font-size: 8px;
            color: black;
        }
        .setIncomplete p > span {
            color: rgb(57, 165, 17)
        }
        .setIncomplete > p {
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
        .backButton {
            background-color: black;
            border-radius: 20px;
            color: white;
            box-shadow: none;
            border: 2px solid white;
            width: 50%;
            font-size: 8px;
        }
    }
</style>