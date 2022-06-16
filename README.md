# Camera Store

## About The Project

This project is the capstone project in in Udacity Cloud Developer nanodegree

before login
![before login](/assets/before-login.png)

auth0 integration
![auth0 integration](/assets/auth0-integration.png)

after login with not items
![after login with not items](/assets/login-no-items.png)

after login with items
![after login with items](/assets/login-with-items.png)

add new item
![add new item](/assets/add-new-item.png)

edit item
![edit item](/assets/edit-item.png)

delete-item item
![delete item](/assets/delete-item.png)

## Built With

[![ReactJS](https://raw.githubusercontent.com/aleen42/badges/master/src/react.svg)](https://reactjs.org)

[![TypeScript](https://github.com/aleen42/badges/raw/master/src/typescript.svg)](https://www.typescriptlang.org)

[![Serverless](https://camo.githubusercontent.com/dcd998f0b6567f17873812fa9bcc9767d63c056862c19024ccbfe5ec7cefe2eb/687474703a2f2f7075626c69632e7365727665726c6573732e636f6d2f6261646765732f76332e737667)](https://www.serverless.com)

## Client Installation

1. cd into frontend folder, then install all dependencies

```sh
  cd frontend
  npm install
```

2. start the client app, local react server will run at http://localhost:3000

```sh
  npm run dev
```

Notes: user might need to refresh the page to see the reuploaded image after editing an item

## Authentication

[Auth0](https://auth0.com/) is used to manage data access and user sign in/sing out.
Client will need to present the auth0 idToken in the http header like `Authentication = Bearer {{idToken}}`

## Backend

backend is configured using Serverless framework deployed on AWS, you do not need to do any config on backend code

Here are all the endpoints:

- GET - /cameras (get all camera items)
- POST - /cameras (create a new camera item)
- PUT - /cameras/{cameraId} (update an existing camera item)
- DELETE - /cameras/{cameraId} (delete a camera item)
- GET - /cameras/{cameraId}/image-url (get image upload url)

serverless CLI is required to deploy the backend with valid AWS credential setup

```sh
serverless deploy
```

## CICD

CICD is implemented via Github Action by using [action for serverless](https://github.com/marketplace/actions/serverless). Every code push to `main` branch will trigger the Github Action, and this will run serverless deploy thus deploy the latest version to AWS

![github action](/assets/github-action.png)

## Project submission

The rubrics I intend to align are:

(Option 1): CI/CD, Github & Code Quality
(Option 2): Functionality
(Option 2): Codebase
(Option 2): Best practices
(Option 2): Architecture
