<template>
  <div class='cont'>
  <b-button v-b-modal.completeWorkout class='button'>
      <div class='blob'>
          <svg
          xmlns:xlink='http://www.w3.org/1999/xlink'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 310 350'
      >
          <path d='M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z' />
  
          </svg>
      </div>
      <div class='line'></div>
      <div class='text' >
          <p>F</p>
          <p>I</p>
          <p>N</p>
          <p>I</p>
          <p>S</p>
          <p>H</p>
          <p class="mx-3"> </p>
          <p>W</p>
          <p>O</p>
          <p>R</p>
          <p>K</p>
          <p>O</p>
          <p>U</p>
          <p>T</p>
          <p>!</p>
      </div>
      </b-button>
      <b-modal :hide-footer="true" id="completeWorkout" title="Hold On">
        <h6 class="my-4" id="workoutWarning">Are You Ready to Finish This Workout?</h6>
        <b-button  @click="completeWorkout" class="btn btn-warning" >Finish</b-button>
      </b-modal>
      
  
      
  </div>
</template>

<script>
export default {
  props:["workoutId"],
  methods: {
      async completeWorkout() {
          let response = await this.$axios.$put('/api/workout/isCompleted', {
              workoutId: this.workoutId,
              isCompleted: true    
          })

          this.$router.push("/workouts")
      }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Montserrat&display=swap');

* {
box-sizing: border-box;
margin: 0;
 

}

p {
font-size: 30px;
}

#workoutWarning {
animation: none;
}

.bg {
width: 100vw;
height: 100vh;
background-image: radial-gradient(#3EC9F8,#5E6A91);
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
font-family: 'Montserrat', sans-serif;


}

.cont {
position: relative;
width: auto;
height: 8vw;
overflow: hidden;
border-radius: 10px;
box-shadow: 0px 0px 15px black;
margin: 3vw 0;

}
.button {
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: flex-start;
background-color: black;
position: realtive;
border: 1px dashed yellow;
border-radius: 10px;
outline: none;
transition: box-shadow 0.3s linear;
box-shadow: inset 0px 0px 5px black, inset 0px 0px 0px #F7EA25;

}

.button:active {
  box-shadow: inset 0px 0px 0px black, inset 0px 0px 105px #F7EA25;
}
.button:active .blob {
animation: none;
}

.blob {
position: relative;
top: 10%;
left: 0%;
width: 10vw;
height: 10vw;
fill: #ac1515df;
transform-origin: 50% 50%;
filter: drop-shadow(4px 4px 0 black);
animation: bump 5.5s ease infinite;



}

@keyframes bump {
  0% {
    transform: scale(1, 1) translateX(0px);
  }
  9% {
    transform: scale(1.1, 0.9) translateY(20px);
  }
  28% {
    transform: scale(0.7, 1.3) translateY(-100px) translateX(55px);
  }
  35% {
    transform: scale(1, 1) translateY(20px);
  }
  50% {
    transform: scale(1, 1.1);
  }
  60% {
    transform: scale(1.1, 0.9) translateY(20px);
  }
  80% {
    transform: scale(0.7, 1.3) translateY(-100px) translateX(-55px);
  }
  88% {
    transform: scale(1, 1) translateY(20px);
  }
  100% {
    transform: scale(1, 1) translateX(0px);
  }
}

.line {
position: absolute;
bottom: 20%;
width: 20vw;
height: 0.5vw;
background: white;
transform: rotate(-8deg);
box-shadow: 2px 2px 0px black;
animation: line 4s ease infinite reverse;
}

@keyframes line {
  0% {
    transform: rotate(-8deg);
  }
  9% {
    transform: rotate(-8deg);
  }
  28% {
    transform: rotate(28deg);
  }
  35% {
    transform: rotate(20deg);
  }
  50% {
    transform: rotate(10deg);
  }
  60% {
    transform: rotate(-8deg);
  }
  80% {
    transform: rotate(-12deg);
  }

  88% {
    transform: rotate(-18deg);
  }

  100% {
    transform: rotate(-8deg);
  }
}

.text {
display: flex;
position: absolute;
top: 20%;
font-size: 3vw;
text-shadow: 2px 2px black;
font-family: 'Anton', sans-serif;




}

p:nth-child(1n) {
transform: rotate(8deg);
animation: shake 1s ease infinite;
color: #56c423

}
p:nth-child(2n) {
transform: rotate(5deg);
animation: shake 1s ease-out infinite reverse;
color: white

}
p:nth-child(3n) {
transform: rotate(-2deg);
animation: shake 1s 0.1s ease infinite;


}

p:nth-child(4n) {
  transform: rotate(-5deg);
  animation: shake 1s ease-in infinite reverse;
}

@keyframes shake {
  0% {
    transform: translateX(0) rotate(8deg);
  }
  50% {
    transform: translateX(4px) rotate(-3deg);
  }

  100% {
    transform: translateX(0) rotate(6deg);
  }
}

i {
color: #2867B2;
margin-top: 1vw
}
</style>