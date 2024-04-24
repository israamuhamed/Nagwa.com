const { defineConfig } = require("cypress");
const { Client } = require('pg')
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
module.exports = defineConfig({
e2e: {
async setupNodeEvents(on, config) {
    on("task", {
        async connectDB(query){
        const client = new Client({
        host: '',
        user: 'testing_team',
        password: '',
        database: '',
        port: 5432
          })
          await client.connect()
          const res = await client.query(query)
          await client.end()
          return res.rows;
        }
      })
const bundler = createBundler({
plugins: [createEsbuildPlugin(config)],
});
 

on("file:preprocessor", bundler);
await addCucumberPreprocessorPlugin(on, config);

return config;
},
specPattern: "cypress/e2e/features/*.feature",
baseUrl: "https://www.nagwa.com",
env: {
    language: 'en',
    baseURL: '',
    new_user_email: ''
}
}, 
});




  


   

