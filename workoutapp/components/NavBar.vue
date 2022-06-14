<template>
    <div>
        <nav style="border-bottom: 2px solid rgb(57, 165, 17);" class="navbar navbar-expand-lg navbar-scroll fixed-top shadow-0">
        <div class="container">
        <a class="navbar-brand" href="#!"><img height="50px"  src="/images/workout.png" class="fab fa-mdb fa-4x"></a>
        <button  id="createButton" class="navbar-toggler" type="button" data-mdb-toggle="collapse"
        data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul v-if="!$auth.$state.loggedIn" class="navbar-nav ms-auto">
            <li class="nav-item">
            <a class="nav-link" href="/login">Sign In</a>
            </li>
            <button type="button" @click="goToRoute('/register')" class="btn btn-dark ms-3">Register</button>
        </ul>
        <ul v-if="$auth.$state.loggedIn" class="navbar-nav ms-auto">
            <li class="nav-item">
            <a class="nav-link" href="/workouts">Go To Workouts</a>
            </li>
            <button id="createButton" type="button" @click="goToRoute('/workout/new')" class="btn btn-dark ms-3">Create Workout</button>
            
        </ul>
        </div>
        </div>
        <a v-if="$auth.$state.loggedIn" @click="onLogOut" href="" class="nav-link float-right">Logout</a>
        </nav>
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

#createButton {
    border: 2px solid rgb(57, 165, 17);
    border-radius: 3px;
    background-color: black;
    color:rgb(57, 165, 17);
}
#createButton:hover {
    border: 2px solid black;
    border-radius: 3px;
    background-color: rgb(57, 165, 17);
    color: black;
}
</style>

<script>
export default  {
    methods: {
        goToRoute(route) {
            this.$router.push(route);
        },
        async onLogOut() {
            await this.$auth.logout();


            this.$router.push('/')
        }
    }
}
</script>
