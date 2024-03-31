# Estema
is a **full-stack** web application. It was created to help users learn new words in a foreign language. 
## Backend
The backend part of the application was written in **Typescript** using the **Express** framework.
__Word lists__ and __Word pairs__ are stored in the **MongoDB** database.

All further endpoint __documentation__ can be found on **/api-docs** endpoint. It was written using the **Swagger**.

To __run__ the server, navigate to the **./Backend** folder and __run__ the command: 
```
npm run start
```
## Frontend
The frontend part was written using **Javascript** and the **React** framework. 

To __run__ the React application, navigate to the **./frontend** folder and __run__ the command:
```
npm start
```
## Process
Users can organize __Word pairs__ into __Word lists__. Each __Word list__ has its unique __name__, __source language__, and __target language__. 
Chosen __Word list__:
- can be populated with __Word pairs__. The **built-in translation** function helps users fill in new __Word pairs__ quickly.
- can be used to **generate a quiz** out of __Word pairs__, that are inside the Word list
## Quiz
Each quiz question has 4 possible answers, but only one of them is correct.
Users can choose 3 __quiz__ types:
1. __The questions__ are words in a __familiar__ language. The user has to choose the correct __corresponding__ word in a __foreign__ language
2. __The questions__ are words in a __foreign__ language. The user has to choose the correct __corresponding__ word in a __familiar__ language
3. General quiz. Combines both previous quiz types. The questions are both words in __familiar__ and __foreign__ languages.
