<template>
    <main style="width: 100%; background-repeat: no-repeat;
    background-position: center top;" class="text-center mt-3 pt-5">
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
    
    </main>
    </template>
    
    
    <script>
    import Exercise from '~/components/Exercise.vue';
    import Loading from '~/components/Loading.vue';
    import { mapGetters, mapActions } from "vuex";
    
    export default  {
        components: {
            Exercise,
            Loading
        },
        data() {
            return {
                pageNumber: 1,
                loading: false
            }
        },
        async asyncData({$axios, params}) {
            let response = await $axios.$post(`/api/exercise`,
             {searchParams: {workoutId: params.id, isWarmup: true}});
    
             return {
                 exercises: response.exercises,
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
            }
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
      padding: 30px 0;
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
      width: 40px;
      height: 40px;
      line-height: 40px;
      padding: 0;
      text-align: center;
      color: white;
    }
    
    .p1 a.is-active{
      background-color: #2ecc71;
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
    </style>