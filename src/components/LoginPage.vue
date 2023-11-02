<template>
    <v-card
    class="mx-auto centered"
    max-width="344"
    >
    <h1 class="mt-2 text-h5">Login in to continue</h1>
    <v-divider class="w-50 mx-auto my-1" thickness="3"></v-divider>
    <v-form @submit.prevent>
    <v-container>
      <v-text-field
        ref="field-email"
        v-model="email"
        type="email"
        :rules="rules"
        color="primary"
        label="Email"
        variant="underlined"
        autocomplete="user-email"
        required
      ></v-text-field>
      <v-text-field
        ref="field-password"
        v-model="password"
        type="password"
        :rules="rules"
        color="primary"
        label="Password"
        placeholder="Enter your password"
        variant="underlined"
        autocomplete="current-password"
        required
      ></v-text-field>
      <div v-if="error !== null">
        <p class="subtitle-1 text-red">
        Login credentials are incorrect!
        </p>
      </div>
      
    </v-container>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
        <v-btn type="submit" color="teal-darken-4" @click="userLogin()">
        Login
        <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
    </v-card-actions>
  </v-form>
  </v-card>
  

</template>

<script>
import {useAuthStore} from "@/stores/authStore.js"

    export default {
        name : "LoginPage",
        data() {
            return {
                store : useAuthStore(),
                email: null,
                password: null,
                rules: [
                  value =>
                  {
                    if (value) return true

                    return 'This field is required.'
                  }
                ]
            }
        },
        methods : {
            userLogin() 
            {
                if(this.email && this.password)
                {
                  this.store.login(this.email, this.password);
                }
            }
        }, 
        computed : 
        {
          error() {
                return this.store.errors;
            }
        }   
    }
</script>

<style scoped>
.centered {
    margin: calc(50vh - 350px) 0;
}
</style>