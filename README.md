# UserDoc-Manager-Client
ToDo
![Noteful screenshot](https://github.com/)

[Live Demo](https://user-docs-manager.now.sh/)

## Description

This is a react client application. The associated back-end can be found here: [UserDoc-Manager-API](https://github.com/vansky17/UserDoc-Manager-API.git).

### Functional Description
The purpose of this app is to serve as a small, yet not over-complicated content management system for small to mid-range organizations to help them manage their user/technical documentation
#### Easy Access and Overview to User Documentation

- Get quick overview of all stored documents, ordered by product groups. Get information on topic, format, release date, article and version number, as well as description.

- Open PDF documents directly in your browser. Other file types are either directly opened or downloaded for further use when clicking on the OPEN button (depending on your operating system and/or and the settings of your browser).
#### Upload Documents

- Upload new user documentation and use the settings wizard to provide all the required data, then assign it to the respective product group.

- The following file formats are supported: PDF, DOCX, XSL, ZIP, PNG/JPG
#### Manage Product Groups
- Create new product groups or delete existing ones. Once created, you can assign uploaded documents to better organize your user documentation.

### Technical Description
- React **Context API** is used in this application.
 
- **AWS S3** is used to store the documents.

- Fetch requests are made to two endpoints when the application mounts: **/products** and **/docs**. 

- The API calls are made to a **PostgreSQL database**

- To upload to the S3 Bucket make a request to the **/upload** endpoint


## Setup

1. See [UserDoc-Manager-API](https://github.com/vansky17/UserDoc-Manager-API.git) for instructions on installing the back-end API

2. Clone this repository

3. In the terminal, change to the directory on your computer that contains this repo

4. Install dependencies: `npm install`
   
5. Change the back-end API endpoint in `./src/config.js` 

6. Start the app in a web browser: `npm start`

