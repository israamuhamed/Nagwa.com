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
        host: 'live-nagwa-otp.cluster-cmmuo3lde4yu.us-east-1.rds.amazonaws.com',
        user: 'testing_team',
        password: 'Sp5YkYwH576tjYEcLV4PP7',
        database: 'live-mmOtpDataBase',
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
    baseURL: 'https://api-users.nagwa.com/',
    new_user_email: 'tester_new_automation@nagwa.com'
}
}, 
});




  


   

