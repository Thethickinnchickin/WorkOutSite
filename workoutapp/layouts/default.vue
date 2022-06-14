
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
        <body style="background-color: black">
            <NavBar/>
            <div class="app">
                <nuxt/>                      
            </div>
           
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

export default {
    components: {
        NavBar
    }
}
</script>
<style scoped>
.mainClass {
    height: 100%;
    width: 100%;
    background-color: black;
}
.app {
    background-color: black;
    color: rgb(57, 165, 17);
}

</style>

