<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState';
import { AuthService } from '../services/AuthService';

const identity = computed(() => AppState.identity)
const account = computed(() => AppState.account)
async function login() {
  AuthService.loginWithPopup()
}
async function logout() {
  AuthService.logout()
}

</script>

<template>
  <span class="navbar-text d-flex justify-content-center">
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login" v-if="!identity">
      Login
    </button>
    <div v-else>
      <div class="dropdown my-2 my-lg-0">
        <div type="button" class="border-0 selectable no-select" data-bs-toggle="dropdown" aria-expanded="false">
          <div v-if="account?.picture || identity?.picture">
            <img :src="account?.picture || identity?.picture" alt="account photo" />
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-sm-end dropdown-menu-start p-0" aria-labelledby="authDropdown">
          <div class="list-group">
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item dropdown-item list-group-item-action">
                Your Profile
              </div>
            </router-link>
            <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
  <div v-if="account" class="d-flex flex-column gap-3 m-3">
    <h4>{{ account.name }}</h4>
    <h5>Class of: {{ account.class }}</h5>
    <p>{{ account.bio }}</p>
    <div class="fs-4 d-flex flex-column">
      <a v-if="account.github" :href="account.github" target="_blank">
        <i class="mdi mdi-github"></i> GitHub
      </a>
      <a v-if="account.linkedin" :href="account.linkedin" target="_blank">
        <i class="mdi mdi-linkedin"></i> LinkedIn
      </a>
      <a v-if="account.resume" :href="account.resume" target="_blank">
        <i class="mdi mdi-card-account-details"></i> Resume
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

img {
  height: 20dvh;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}
</style>
