# Project Overview
Everest is an ePortfolio system aimed at students and professionals looking for a platform to show off and reflect on their achievements.
It's an app built using React, Redux and Firebase that supports user sign-in, file upload, template switching and profile sharing. 

**Please take a look at the** [**wiki**](https://github.com/stavyadatta/ePortfolio/wiki) **for more details about architecture, deployment, features and requirements.**

## Table of contents
* [Project Overview](#project-overview)
* [Demo](#demo)
* [Documentation](#documentation) 
* [System Requirements](#system-requirements)
* [Installation Guide](#installation-guide)
* [Changelog](*Changelog)

# Demo
Link to the deployed product can be found [here](https://impressive-hall-288310.web.app/).

Link to an example project created using Everest can be found [here](https://impressive-hall-288310.web.app/project/u8hRP9wxIWDAudXmAYXe).

# Documentation
An **architecture diagram** can be found [here](Documentation/EverestArchitecture.png)

**Back-end functions** documentation can be found [here](https://github.com/stavyadatta/ePortfolio/wiki/FunctionsDocumentation.pdf)

**Data model** documentation used in the in app can be found [here](Documentation/DataModels.pdf)

A **deployment architecture** diagram can be found [here](https://github.com/stavyadatta/ePortfolio/wiki/DeploymentArchitecture.png)

A **style guide** for the current templates can be found [here](Documentation/StyleGuide.pdf)

# System Requirements
The app uses Node 10+, Firebase, React and Redux as it's main dependancies, these must be installed on the machine before the app can be run.



# Installation Guide
## Deployment
As indicated in the [deployment architecture diagram](Documentation/DeploymentArchitecture.png) the application is authomatically deployed through Travis CI to a firebase project used for the development of the [demo](#demo).

In order to deploy the project to a custom firebase project, a new firebase project must be set up with the app added in the firebase console. 

Several files within the app will need to be updated with the new project's information, namely:
* Front-End/everest/src/Firebase.js
* .firebaserc

Next, ensure firebase-tools are installed and configured using ``` npm install firebase-tools -g ``` and ``` firebase login```

Following this, deployment can be made to firebase by running ``` firebase deploy``` in the root directory.

[This](https://firebase.google.com/docs/cli) is the documention for how to made a deployment this way using the Firebase CLI.


## Local Testing
Installing dependancies requires npm to be installed on the local machine. 

Running ``` npm install``` in the root directory will install all dependancies for the backend and front end application for local testing.

Running ``` npm start``` in the root directory will install all dependancies and start a local emulator for testing purposes.

Running ``` cd functions&&firebase emulators:exec --project <PROJECT_NAME_HERE> --only firestore,functions 'npm test' ``` will run a suite of tests on the back-end firestore functions.
