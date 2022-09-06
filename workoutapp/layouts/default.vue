
<template>
     <div class="mainclass">
        <head>
            <meta charset="UTF-8">
            <meta name="description" content="Author: M. Reiley,
            This is a mock fully functional e-commerce site that sells various coffee products and items">
            <meta name="keywords" content="HTML, CSS, JavaScript">
            <meta name="author" content="John Doe">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="preload" as="font">
             <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        </head>
        <body style="width: 100vw;">
            <div class="background body">
                <div class="wrap">
                    <div class="top-plane"></div>
                    <div class="bottom-plane"></div>
                </div>
            </div>

            <NavBar/>
            <div class="app" style="width: 100%">
                <nuxt/>                      
            </div>
            <Footer/>
           
        </body>
    
        </div>        
</template>


<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>



<script>
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap-vue/dist/bootstrap-vue.js';
import NavBar from "~/components/NavBar.vue";
import Footer from "~/components/Footer.vue";

export default {
    components: {
        NavBar,
        Footer
    }
}
</script>

<style scoped>
.mainClass {
    background-color: black;
}
.app {
    background-color: black;
    color: rgb(57, 165, 17);
}

</style>

<style lang="scss">

    body {
      margin: 0;
      overflow: hidden;
    }
    
    .background {
      width: 100vw;
      height: 100vh;
      background: #3E1E68;
      position: absolute;
      z-index: 0;
    }


$nodeStreak: #a2cef4;
$computationalFogTop: #6084d7;
$computationalFogBot: #6084d7;
$visualDistortionZapper: 360px;
$nanoVelocity: 2s;

html {
  height: 100%;
  overflow: hidden;
}

body {
  height: 100%;
  background: linear-gradient($computationalFogTop 25%, $nodeStreak 50%, $nodeStreak 50%, $computationalFogBot 100%);  
}

.wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  margin: 0 auto;
  perspective: $visualDistortionZapper;
  perspective-origin: 50% 50%;  
  background-color: black;
}

.top-plane {
  width: 200%;
  height: 130%;
  position: absolute;
  bottom: -30%;
  left: -50%;
  background-image: -webkit-linear-gradient($nodeStreak 2px, transparent 2px), -webkit-linear-gradient(left, $nodeStreak 2px, transparent 2px);
  background-size: 100px 100px,100px 100px;
  background-position: -1px -1px,-1px -1px;
  transform: rotateX(85deg);
  animation: planeMoveTop $nanoVelocity infinite linear;
}

.bottom-plane {
  @extend .top-plane;
  transform: rotateX(-85deg);
  top: -30%;
  animation: planeMoveBot $nanoVelocity infinite linear;
}

@keyframes planeMoveTop {
  from {
    background-position: 0px -100px,0px 0px;
  }
  to {
    background-position: 0px 0px, 100px 0px;
  }
}

@keyframes planeMoveBot {
  from {
    background-position: 0px 0px,0px 0px;
  }
  to {
    background-position: 0px -100px, 100px 0px;
  }
}

@media (max-height: 350px) {
  .wrap {
    perspective: $visualDistortionZapper - 150;
  }
}

    </style>

