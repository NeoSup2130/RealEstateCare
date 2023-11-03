# Welcome to Real Estate Care

Hier vind u het VueJS prototype om de case van Real Estate Care te realiseren.

# WCAG 
Several best practices for level A where being reached until I came to the conclusion that Vuetify breaks certain conventions
On LoginPage.vue (/login-user)
- 2 errors occur due to a multiple lables, but these are internal input lables which Vuetify added. I cannot change those without affecting the entire framework.
On SettingPage.vue (/settings)
- 1 error occurs because of the slider component, using an internal input field which doesn't have a lable.
Several of these cases occur within the project/website, despite my best efforst I can't fix all of them.  

# How to login in?
- User email: admin@mail.com
- User password: admin123

# How to install
1. Clone this repository.
2. Use NPM to install dependencies (npm install)
3. Run the project on port 8000 (npm run serve -- --port 8000)
4. Vist website on localhost:8000
5. Login and Enjoy!

# Used websites
- Glitch
- Netlify

# Used libraries/frameworks

 - Vue.JS (Vue 3)
 - Vuetify 3
 - Pinia
 - Pinia Persistent
 - JSON-server
 - JSON-server auth

