<template>
  <div class="home">
    <div class="leftContainer">
      <h1>co Notes</h1>
      <i class="fa-solid fa-square-pen"></i>
    </div>
    <div class="line"></div>
    <div class="rightContainer">
      <router-link to="/login"><button>Login</button></router-link>
      <router-link to="/createAccount"
        ><button>Create Account</button></router-link
      >
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
</script>
<style scoped>
  .home {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }
  .line {
    width: 1px;
    height: 12rem;
    background: black;
  }
  .leftContainer {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  h1 {
    font-size: 4rem;
  }
  .fa-square-pen {
    font-size: 4rem;
    color: black;
    width: 20px;
    margin-right: 2rem;
  }
  .rightContainer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .rightContainer > * > * {
  }
  button {
    width: 120%;
    font-size: 1.5rem;
  }
</style>
