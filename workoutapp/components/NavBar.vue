<template>
  <div>
      <div class="isMain">
        <nav style="border-bottom: 2px solid rgb(57, 165, 17);" class="navbar navbar-expand-lg navbar-scroll fixed-top shadow-0">
        <div class="container">
        <a class="navbar-brand" @click="goToRoute('/')"><img height="50px"  src="/images/workout.png" class="fab fa-mdb fa-4x"></a>
        <button  id="createNavButton" class="navbar-toggler" type="button" data-mdb-toggle="collapse"
        data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul v-if="!$auth.$state.loggedIn" class="navbar-nav ms-auto">
            <li class="nav-item">
            <a class="nav-link" href="/login">Sign In</a>
            </li>
            <button id="createNavButton" type="button" @click="goToRoute('/register')" class="btn btn-dark ms-3">Register</button>
        </ul>
        <ul v-if="$auth.$state.loggedIn" class="navbar-nav ms-auto">
            <li class="nav-item">
            <button class="nav-link" style="border: none; background-color: black" @click="goToRoute('/workouts')">Go To Workouts</button>
            </li>
            <button style="background-color: black;" id="createNavButton" type="button" @click="goToRoute('/workout/new')" class="btn btn-dark ms-3">Create Workout</button>
            
        </ul>
        </div>
        </div>
        <a v-if="$auth.$state.loggedIn" @click="onLogOut" href="" class="nav-link float-right">Logout</a>
        </nav>          
      </div>
      <div class="isMobile">
      
        <nav style="border-bottom: 2px solid rgb(57, 165, 17);" class="navbar navbar-expand-lg navbar-scroll fixed-top shadow-0">
        <div class="container">
        <a class="navbar-brand" @click="goToRoute('/')"><img height="50px"  src="/images/workout.png" class="fab fa-mdb fa-4x"></a>
        <div v-if="$auth.$state.loggedIn">
          <button id="mobileButtons" @click="$router.push('/workouts')" class="btn m-0" style="font-size: 8px; border: 2px solid rgb(57, 165, 17); color: white">Workouts</button>
          <button id="mobileButtons" @click="$router.push('/workout/new')" class=" btn" style="font-size: 8px;  border: 2px solid rgb(57, 165, 17); color: white">Create</button>
          <button v-if="$auth.$state.loggedIn"  class="btn" @click="onLogOut" style="font-size: 8px; color: red; padding: auto" id="mobileButtons">Logout</button>
        </div>

        </div>

        </nav> 
      </div>

  </div>
</template>

<style>

/* Color of the links BEFORE scroll */
.navbar-scroll .nav-link,
.navbar-scroll .navbar-toggler-icon,
.navbar-scroll .navbar-brand {
color: rgb(57, 165, 17);
}

/* Color of the navbar BEFORE scroll */
.navbar-scroll {
background-color: black;
}

/* Color of the links AFTER scroll */
.navbar-scrolled .nav-link,
.navbar-scrolled .navbar-toggler-icon,
.navbar-scroll .navbar-brand {
color: #262626;
}

/* Color of the navbar AFTER scroll */
.navbar-scrolled {
background-color: #fff;
}

/* An optional height of the navbar AFTER scroll */
.navbar.navbar-scroll.navbar-scrolled {
padding-top: auto;
padding-bottom: auto;
}
.navbar-brand {
font-size: unset;
height: 3.5rem;
}

#createNavButton {
  border: 2px solid rgb(57, 165, 17);
  border-radius: 3px;
  background-color: black;
  color:rgb(57, 165, 17);
}
#createNavButton:hover {
  border: 2px solid green;
  border-radius: 3px;
  background-color: rgb(57, 165, 17);
  color: rgb(57, 165, 17, .5);
}
@media  screen and (max-width: 992px) {
#createNavButton {
  border: none;
  background-color: black;
  color:rgb(57, 165, 17);
}

}

@media  screen and (max-width: 500px) {
.isMain {
  display: none
}
.isMobile {
  position: absolute;
}
#mobileButtons {
  border: 2px solid rgb(57, 165, 17);
  background-color: black;
}
#mobileButtons:hover {
  border: 2px solid white;
  background-color: rgb(57, 165, 17);
}
}

@media screen and (min-width: 500px) {
.isMobile {
  display: none;
}

#mobileButtons {
  display: none;

}
}
</style>

<script>
import { mapActions } from "vuex";

export default  {
  methods: {
      goToRoute(route) {
        this.newPageNumber(1)
          this.$router.push(route);
      },
      async onLogOut() {
          await this.$auth.logout();
          this.newPageNumber(1)

          await this.$router.push('/')
      },
      ...mapActions(['newPageNumber']),
  }
}
</script>
