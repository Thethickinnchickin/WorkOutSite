<template>
  <div id="footer">
    <footer >
      <ul class="nav justify-content-center border-bottom pb-3 mb-3">
        <li class="nav-item"><button @click="goToRoute('/')" style="background-color: black; border: none" class="nav-link px-2 text-muted">Home</button></li>
        <li class="nav-item"><button @click="goToRoute('/workouts')" style="background-color: black; border: none" class="nav-link px-2 text-muted">Workouts</button></li>
        <li class="nav-item"><button @click="goToRoute('/')" style="background-color: black; border: none" class="nav-link px-2 text-muted">About</button></li>
        <li class="nav-item"><button @click="goToRoute('/')" style="background-color: black; border: none" class="nav-link px-2 text-muted">FAQs</button></li>
        <li class="nav-item"><button @click="goToRoute('/')" style="background-color: black; border: none" class="nav-link px-2 text-muted"></button></li>
      </ul>
      <p class="text-center text-muted">© 2022 Ice Narc, Inc</p>
    </footer>
  </div>
  
  </template>
  
  <script>
  import { mapActions } from "vuex";
  
  export default  {
      methods: {
          goToRoute(route) {
              this.newPageNumber(1)
              this.$router.push(route);
          },
          ...mapActions(['newPageNumber']),
      }
  }
  </script>
  
  <style>
  #footer {
    background-color: black;
    padding-bottom: 10px;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: auto;      
          /* Footer height */
  }
  @media screen and (max-width: 400px) {
    #footer {
      font-size: 8px
    }
  }
  </style>
  
  