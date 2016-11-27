#LanceSolidarioBackend

Group of APIs and services to serve Lance Solidário system. This APIs are composed
 by one great API called LanceSolidarioAPI, other API called Pagseguro and three smaller 
 services called auction-end, auction-cancel and jqueue-process.

## Getting Started

To get you started you can clone the this repository and install the dependencies:

### Prerequisites

You must have node.js and its package manager (npm) installed.  You can get them from [Node.js](http://nodejs.org/).

You also must have MySQL installed. You can get it from [MySQL](https://www.mysql.com/downloads/).

### Install Dependencies

* We get the tools we depend upon via `npm`, the [node package manager][npm], which is installed with Node.js.

The project is structured like:
 ```
 LanceSolidarioAPI (main folder)
    - auction-cancel (service)
    - auction-end (service)
    - db (database configuration)
    - jqueue-process (service)
    - pagseguro (API)
    - src (Main API)
 ```
 
 To run project is necessary install all dependencies for all services
 and APIs. To do it is necessary open cmd and inside of each service or API folder
  (auction-cancel, auction-end, jqueue-process, pagseguro, src)
 run command:
```
npm install
```

You should find that you have a new folder called node_modules, in your main folder(LanceSolidarioAPI),
as well in services and APIs folders(auction-cancel, auction-end, jqueue-process, pagseguro).

* `node_modules` - contains the npm packages for the tools we need

Besides it, you will find a folder called db with a sql file to create the necessary database,
even as a file called createDB that can be used to create the same structure on database.

### Run the Application

To run the project you have two options, run service by service with node or use a service manager like pm2.

+   For the first one you need follow this list, the first element of each line is the directory that you need to be,
    the second element is the command you need run. Each line will be a different process, so you need to run each
    line in different instances of you CMD(Terminal).
    
   ```
    directory: src/                 command: node app.js
    directory: pagseguro/app        command: node index.js
    directory: jqueue-process/app   command: node index.js
    directory: auction-end/app      command: node index.es6
    directory: auction-cancel/app   command: node index.es6
    ```

+   To use the second method you will need a service manager. We highly recommend you to use pm2, if this is your choise 
    the first thing to do will be install it. You easily can do this with npm, you just need running this command:

    ```
    npm install pm2 -g
    ```
    
    With pm2 correctly installed you can run those commands to start, stop, restart or delete all the processes of LanceSolidarionBackend:
    
    Start:
    ```
    pm2 start processes.json
    ```
    
    Stop:
    ```
    pm2 stop processes.json
    ```
    
    Restart:
    ```
    pm2 restart processes.json
    ```
    
    Delete:
    ```
    pm2 delete processes.json
    ```
    
    To see console output of a service you can use the command:
    
    ```
    pm2 logs [id]
    ```
    
    That command without id will result in the output of all services that are running by pm2. To get the id of one service
    just run see the second column of the table resulted of this command:
    
    ```
    pm2 status
    ```
    
    More information of pm2 usage please see the pm2 WebSite [Pm2] http://pm2.keymetrics.io/


### Git commit convention:

To development for this project, is necessary follow a commit pattern,
to facilitate understanding what commit is about.
In this project, is used Angular Git Commit Convention, one of most
famous git commit conventions.
To more information about this convention, [click here](https://gist.github.com/stephenparish/9941e89d80e2bc58a153#format-of-the-commit-message).
