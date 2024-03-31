# Estema
is a full-stack web application. It was created to help users learn new words in a foreign language. 
## Process
Users can organize Word pairs into Word lists. Each word list has its unique name, source language, and target language. 
Chosen Word list:
- can be populated with Word pairs. The built-in translation function helps users fill in new Word pairs quickly.
- can be used to generate a quiz out of Word pairs, that are inside the Word list
## Quiz
Each quiz question has 4 possible answers, but only one of them is correct.
Users can choose 3 quiz types:
1. The questions are words in a familiar language. The user has to choose the correct corresponding word in a foreign language
2. The questions are words in a foreign language. The user has to choose the correct corresponding word in a familiar language
3. General quiz. Combines both previous quiz types. The questions are both words in familiar and foreign languages.
## Backend
The backend part of the application was written in Typescript using the Express framework. Word lists and Word pairs are stored in the MongoDB database.
All further end-point documentation can be found on /api-docs end-point. It was written using the Swagger.
To run the server, navigate to the ./Backend folder and run the command: 
```
npm run start
```
## Frontend
The frontend part was written using the Javascript and React framework. 
To run the React application, navigate to the ./frontend folder and run the command:
```
npm start
```
