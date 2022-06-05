
<template>
    <html style="background-color: #28282B">
        <main style="height: 100vh;">
            <head>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">


            </head>
                <NavBar/>
                <nuxt/>     
        </main>        
    </html>

</template>

<style>
html, body {
    height: 100%;
    background-color: #28282B
}
</style>

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

