<script setup>
import { AppState } from '@/AppState.js';
import { accountService } from '@/services/AccountService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { onMounted, ref } from 'vue';

const editableAccountData = ref({
  name: '',
  picture: '',
  bio: '',
  coverImg: '',
  linkedin: '',
  github: '',
  resume: '',
  class: '',
  graduated: false
})

onMounted(() => {
  editableAccountData.value = { ...AppState.account }
})

async function updateAccount() {
  try {
    await accountService.updateAccount(editableAccountData.value)
    Pop.success("Changes saved!")
  } catch (error) {
    Pop.meow(error)
    logger.error(error)
  }
}
</script>

<template>
  <form @submit.prevent="updateAccount()">
    <div class="mb-3">
      <label for="name" class="form-label"> Name</label>
      <input v-model="editableAccountData.name" type="text" name="name" id="name" class="form-control" maxlength="100">
    </div>
    <div class="mb-3">
      <label for="picture" class="form-label"> Picture</label>
      <input v-model="editableAccountData.picture" type="url" name="picture" id="picture" class="form-control"
        maxlength="500">
    </div>
    <div class="mb-3">
      <label for="coverImg" class="form-label"> CoverImg</label>
      <input v-model="editableAccountData.coverImg" type="url" name="coverImg" id="coverImg" class="form-control"
        maxlength="500">
    </div>
    <div class="mb-3">
      <label for="linkedin" class="form-label"> Linkedin</label>
      <input v-model="editableAccountData.linkedin" type="url" name="accountLinkedin" id="linkedin" class="form-control"
        maxlength="500">
    </div>
    <div class="mb-3">
      <label for="github" class="form-label">GitHub</label>
      <input v-model="editableAccountData.github" type="url" name="github" id="github" class="form-control"
        maxlength="500">
    </div>
    <div class="mb-3">
      <label for="resume" class="form-label">Resume</label>
      <input v-model="editableAccountData.resume" type="url" name="resume" id="resume" class="form-control"
        maxlength="500">
    </div>
    <div class="mb-3">
      <label for="class" class="form-label">Class</label>
      <input v-model="editableAccountData.class" type="text" name="class" id="class" class="form-control"
        maxlength="500">
    </div>
    <div class="mb-3">
      <label for="bio" class="form-label"> Bio</label>
      <textarea v-model="editableAccountData.bio" name="bio" id="bio" class="form-control" maxlength="1000"></textarea>
    </div>
    <div class="mb-3">
      <label for="graduation" class="form-label me-3">Have You Graduated?</label>
      <input v-model="editableAccountData.graduated" type="checkbox" name="graduation" id="graduation">
    </div>
    <div>
      <button class=" btn btn-outline-primary w-100" type="submit">Save Changes</button>
    </div>
  </form>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

label {
  display: block;
  display: flex;
}
</style>