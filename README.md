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

To run the project is simple, all you have to do is get in project folder and run command:

```
node app.js
```

Now server is running on port 7780.

### Git commit convention:

To development for this project, is necessary follow a commit pattern,
to facilitate understanding what commit is about.
In this project, is used Angular Git Commit Convention, one of most
famous git commit conventions.
To more information about this convention, [click here](https://gist.github.com/stephenparish/9941e89d80e2bc58a153#format-of-the-commit-message).
