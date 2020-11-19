## Table of contents
* [Project Overview](#project-overview)
* [Demo](#demo)
* [Features](#features)
* [Documentation](#documentation) 
* [System Requirements](#system-requirements)
* [Installation Guide](#installation-guide)
* [Changelog](*Changelog)

# Project Overview
Everest is an ePortfolio system aimed at students and professionals looking for a platform to show off their achievements.
It's an app built using React, Redux and Firebase that supports user sign-in, file upload, template switching and profile sharing. 

# Demo
Link to the deployed product can be found [here](https://impressive-hall-288310.web.app/)

# Features

## User Stories
As a student,
I want to be able to Create Projects (Name projects, upload documents, add text, images, reflections, and tag project) I have done,
So I can provide evidence to potential employers.

As a student,
I want to provide evidence for work (Add Text to Projects) I have done,
So I can show potential employers.

As a student, 
I want to provide evidence for work (Add Pictures to Projects) I have done, 
So I can show potential employers.

As a student, 
I want to reflect on work I have done,
So I can improve myself and my work.

As an employer,
I want to be able to find a potential employee,
So I can see examples of their work.

As a user with projects,
I want to be able to find specific projects easily,
So I can edit them.

As a user,
I want to structure my projects in an intuitive way,
So I can organise my portfolio easier.

As a user,
I want to upload files to a project,
So I can demonstrate the work I have done.

As a user,
I want to personalise my profile,
So I can express my individuality.

As a user,
I want to create a profile that is secure,
So I can store my projects.

# Documentation
An **architecture diagram** can be found [here](Documentation/EverestArchitecture.png)

**Back-end functions** documentation can be found [here](Documentation/FunctionsDocumentation.pdf)

**Data model** documentation used in the in app can be found [here](Documentation/DataModel.pdf)

A **deployment architecture** diagram can be found [here](Documentation/DeploymentArchitecture.png)

A **style guide** for the current templates can be found [here](Documentation/StyleGuide.pdf)

# System Requirements
The app uses Node 10+, Firebase, React and Redux as it's main dependancies, these must be installed on the machine before the app can be run.



# Installation Guide
## Deployment
As indicated in the [deployment architecture diagram](Documentation/DeploymentArchitecture.png) the application is authomatically deployed through Travis CI to a firebase project used for the development of the [demo](#demo), 

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

# Changelog
## Sprint 1
## Sprint 2
## Sprint 3
