<template>
  <div class="home">
    <div class="leftContainer">
      <h1>co Notes</h1>
      <i class="fa-solid fa-square-pen"></i>
    </div>
    <div class="rightContainer">
      <router-link to="/login"><button>Log In</button></router-link>
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
  :root {
    --homepage-primary: #03071e;
  }

  .home {
    z-index: -3;
    min-height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  .leftContainer {
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    animation-name: appear;
    animation-duration: 0.75s;
    font-family: "Karla", sans-serif;
  }

  @keyframes appear {
    0% {
      transform: translate(250px);
      opacity: 0.8;
    }
    100% {
      transform: translate(0px);
      opacity: 1;
    }
  }

  h1 {
    font-size: 4rem;
    font-family: "Karla", sans-serif;
    color: var(--homepage-primary);
  }
  .fa-square-pen {
    font-size: 4rem;
    color: #03071e;
    width: 20px;
    margin-right: 2.5rem;
    animation-name: rainbow;
    animation-duration: 6s;
    animation-iteration-count: infinite;
  }

  .rightContainer {
    min-height: 200px;
    border-left: 2px solid #03071e;
    background: white;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .rightContainer > * {
    width: 100%;
  }

  button {
    width: 100%;
    padding: 0.5rem;
    font-size: 2rem;
    background: none;
    border: 2px solid #03071e;
    color: var(--homepage-primary);
    border-radius: 10px;
    transition: all 0.25s;
    font-weight: bold;
  }

  button:hover {
    background: #03071e;
    cursor: pointer;
    color: white;
  }

  @media screen and (max-width: 800px) {
    .home {
      flex-direction: column;
      align-items: center;
      justify-content: start;
      min-height: 0px;
      margin-top: 1rem;
    }

    .leftContainer {
      animation: none;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
    h1 {
      margin: 0px;
    }

    .rightContainer {
      border-left: 0px;
      border: 2px solid #03071e;
      border-top: none;

      padding: 2rem;
      border-radius: 0px 0px 1rem 1rem;
    }
  }

  @media screen and (max-width: 480px) {
    .home {
      gap: 0px;
      padding: 5vw;
    }
    .home > * {
      width: 80%;
    }
    h1 {
      font-size: 16vw;
      white-space: nowrap;
    }
    .fa-square-pen {
      font-size: 16vw;

      margin-right: 8vw;
    }

    button {
      font-size: 8vw;
    }
    .rightContainer {
      border-left: 0px;
      border: none;
      border-top: none;

      padding: 0px;
    }
  }
</style>
