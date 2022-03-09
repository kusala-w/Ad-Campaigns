# Business Campaign Project

Follow these steps to setup the Business Campaign Project in your local environment

1. Clone this repository
2. There are two main folders
    api - The codebase and dependencies for the Node.js API
    front-end - The codebase and dependencies for the Vue.js client application

## 3. API setup
    3.1 Navigate into the 'api' folder from the terminal and run [npm install] to install all the dependencies
    3.2 In the same terminal window, run [node campaign-api.js] command.
    3.3 If the API is successfully running, you should see a message in the terminal notifying that the API is listening to a specific port
        e.g. "API listening on localhost:8081"
    3.4 Make a note of the port number that the API is running. You will need to update the API URL in the client app with this port number

## 4. Client application setup
    4.1 Navigate into the 'front-end' folder from the terminal and run [npm install] to install all the dependencies
    4.2 Navigate into [front-end/src/components] folder and open AllBusinesses.vue and BusinessDetails.vue
        4.2.1 Search for the string 'http://localhost:8081' and replace that with the URL that your API is running. You can get the hostname and port from step 3.3 above
    4.3 Navigate into the 'front-end' folder from the terminal and run [npm run serve] to start the client application
    4.4 If the client app is successfully running, you should see a message similar to this in the terminal window
        App running at:
        - Local:   http://localhost:8080/
        - Network: http://xxx.xxx.xx.xxx:8080/
    4.5 Copy the local URL and paste in a browser window to test the client application
