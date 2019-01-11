<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.commit('SET_SOCKET', this.$socket)
  },
  sockets: {
    endGame() {
      this.$router.push('/end');
    },
    noGame() {
      this.$router.push('/');
    },
    connect() {
      let storage = window.localStorage;
      let rejoin = storage.getItem('rejoin');
      if (rejoin !== null) {
        this.$socket.emit('player-rejoin', rejoin);
        this.$router.push('/game');
      } else {
        this.$router.push('/');
      }
    }
  }
}
</script>


<style lang="less">
@font-face {
  font-family: 'Action Man';
  font-style: normal;
  font-weight: 400;
  src: url('./assets/fonts/Action_Man.ttf');
}
@font-face {
  font-family: 'Ancient';
  font-style: normal;
  font-weight: 400;
  src: url('./assets/fonts/Ancient_Medium.ttf');
}

@font-face {
  font-family: 'Ruritania';
  font-style: normal;
  font-weight: 400;
  src: url('./assets/fonts/Ruritania.ttf');
}

@font-face {
  font-family: 'Anir';
  font-style: normal;
  font-weight: 400;
  src: url('./assets/fonts/anirm.ttf');
}
@font-face {
  font-family: 'Adolphus Serif';
  font-style: normal;
  font-weight: 400;
  src: url('./assets/fonts/Almendra-Regular.ttf');
}
@font-face {
  font-family: 'Troll Bait';
  font-style: normal;
  font-weight: 400;
  src: url('./assets/fonts/troll_bait.ttf');
}
@font-face {
  font-family: 'Action Man Shaded';
  font-style: normal;
  font-weight: 400;
  src: url('./assets/fonts/Action_Man_Shaded.ttf');
}

@font-face {
  font-family: 'PT Mono';
  font-style: normal;
  font-weight: 400;
  src: url('./assets/fonts/PTM55FT.ttf');
}
html, body {
  height: 100%;
}
body:before {
  content: "";
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  position: fixed;
  z-index: -3;
  opacity: 0.6;
  background: url('./assets/bg.jpg');
}
#app {
  font-family: 'Adolphus Serif', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
  height: 100%;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
