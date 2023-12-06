# Welcome to Real Estate Care

Hier vind u het VueJS prototype om de case van Real Estate Care te realiseren.

# WCAG 
Several best practices for level A where being reached until I came to the conclusion that Vuetify breaks certain conventions

On LoginPage.vue (/login-user)
- 2 errors occur due to a multiple lables, but these are internal input lables which Vuetify added. I cannot change those without affecting the entire framework.

On SettingPage.vue (/settings)
- 1 error occurs because of the slider component, using an internal input field which doesn't have a lable.

On CompletedPage.vue (/completed-inspections)
- Several issues pop up due to Vuetify's ambigious form creation code.

Several of these cases occur within the project/website, despite my best efforst I can't fix all of them. Except the ones which occurred due to mistakes on my part. 

# How to login in?
- User email: admin@mail.com
- User password: admin123

# How to install the website locally
1. Clone this repository.
2. Use NPM to install dependencies (npm install)
3. Run the project on port 8000 (npm run serve -- --port 8000). Other ports aren't accepted since port 8000 is whitelisted on [Glitch](https://giant-immediate-celsius.glitch.me).
4. Vist the website on localhost:8000
5. Use the login credentials mention above to login, and Enjoy the website!

# What doesn't fully work yet:
- Added images to a form cannot be removed.
- Alerts button (bottom-left) doesn't go to a page, because in the case it wasn't stated to be an available page. However, the received mock-up of the website showed this icon on the bottom bar.

# Used websites
- [Glitch](https://giant-immediate-celsius.glitch.me) for fake backend "database" with Json-server. The following [repository](https://github.com/NeoSup2130/RealEstateCare/blob/Vuetify-Persistent/src/components/CompletedPage.vue) was created for this backend.
- [Netlify](https://www.netlify.com) for website hosting.

# Used libraries/frameworks

 - [Vue.JS](https://vuejs.org) (Vue 3)
 - [Vuetify 3](https://www.npmjs.com/package/vuetify)
 - [Pinia](https://www.npmjs.com/package/pinia)
 - [Pinia Persistent](https://www.npmjs.com/package/pinia-plugin-persistedstate) 
 - [JSON-server](https://www.npmjs.com/package/json-server)
 - [JSON-server auth](https://www.npmjs.com/package/@danimadmolil/json-server-auth)

