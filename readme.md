# Feedback Survey Application

This is a backend application for a Feedback Survey Application built using Node.js, Express, and MongoDB.

## Project Structure

```
feedback-survey-app/
├── controllers/
│   ├── adminController.js
│   ├── surveyController.js
│   └── userController.js
├── middleware/
│   └── auth.js
├── models/
│   ├── survey.js
│   ├── user.js
│   └── response.js
├── routes/
│   ├── adminRoutes.js
│   ├── surveyRoutes.js
│   └── userRoutes.js
├── views/
│   └── 

index.ejs


├── 

app.js


├── 

config.js


└── 

package.json


```


## Endpoints

### Admin Endpoints

1. **Add User**
   - **URL:** `POST /admin/addUser`
   - **Description:** Adds a new user and returns a token.
   - **Body:**
     ```json
     {
       "username": "newuser",
       "password": "password123",
       "role": "user"
     }
     ```
   - **Response:**
     ```json
     {
       "message": "User added successfully",
       "userId": "userId",
       "token": "token"
     }
     ```

2. **Remove User**
   - **URL:** `DELETE /admin/removeUser/:userId`
   - **Description:** Removes a user by user ID.
   - **Params:** [userId](http://_vscodecontentref_/6) (ID of the user to be removed)
   - **Response:**
     ```json
     {
       "message": "User removed successfully"
     }
     ```

3. **Create Survey**
   - **URL:** `POST /admin/createSurvey`
   - **Description:** Creates a new survey with rating (1 to 5) questions and/or text questions.
   - **Body:**
     ```json
     {
       "title": "Customer Satisfaction Survey",
       "questions": [
         {
           "type": "rating",
           "question": "How satisfied are you with our service?"
         },
         {
           "type": "text",
           "question": "Any suggestions?"
         }
       ]
     }
     ```
   - **Response:**
     ```json
     {
       "message": "Survey created successfully",
       "surveyId": "surveyId"
     }
     ```

4. **Assign Survey**
   - **URL:** `POST /admin/assignSurvey`
   - **Description:** Assigns a survey to one or more users (one user can be assigned only to one open survey at a time).
   - **Body:**
     ```json
     {
       "surveyId": "surveyId",
       "userIds": ["userId1", "userId2"]
     }
     ```
   - **Response:**
     ```json
     {
       "message": "Survey assigned successfully",
       "surveyId": "surveyId",
       "userIds": ["userId1", "userId2"]
     }
     ```

5. **View Surveys**
   - **URL:** `GET /admin/viewSurveys`
   - **Description:** Retrieves a list of all surveys.
   - **Response:**
     ```json
     [
       {
         "_id": "surveyId",
         "title": "Customer Satisfaction Survey",
         "questions": [
           {
             "type": "rating",
             "question": "How satisfied are you with our service?"
           },
           {
             "type": "text",
             "question": "Any suggestions?"
           }
         ],
         "assignedUsers": [
           {
             "_id": "userId1",
             "username": "user1"
           },
           {
             "_id": "userId2",
             "username": "user2"
           }
         ]
       }
     ]
     ```

6. **View Survey Answers**
   - **URL:** `GET /admin/viewSurveyAnswers/:surveyId`
   - **Description:** Retrieves answers for a specific survey.
   - **Params:** [surveyId](http://_vscodecontentref_/7) (ID of the survey)
   - **Response:**
     ```json
     [
       {
         "_id": "responseId",
         "survey": "surveyId",
         "user": {
           "_id": "userId",
           "username": "user1"
         },
         "answers": ["4", "Great service!"]
       }
     ]
     ```

### User Endpoints

1. **Login**
   - **URL:** `POST /user/login`
   - **Description:** Logs in a user and returns a token.
   - **Body:**
     ```json
     {
       "username": "newuser",
       "password": "password123"
     }
     ```
   - **Response:**
     ```json
     {
       "token": "token"
     }
     ```

2. **Start Survey**
   - **URL:** `POST /user/startSurvey`
   - **Description:** Submits answers for a survey.
   - **Headers:**
     - `Authorization: Bearer <token>`
   - **Body:**
     ```json
     {
       "surveyId": "surveyId",
       "answers": ["4", "Great service!"]
     }
     ```
   - **Response:**
     ```json
     {
       "message": "Survey completed successfully",
       "responseId": "responseId"
     }
     ```

3. **View Completed Surveys**
   - **URL:** `GET /user/viewCompletedSurveys`
   - **Description:** Retrieves a list of surveys completed by the current user.
   - **Headers:**
     - `Authorization: Bearer <token>`
   - **Response:**
     ```json
     [
       {
         "_id": "responseId",
         "survey": {
           "_id": "surveyId",
           "title": "Customer Satisfaction Survey",
           "questions": ["How satisfied are you with our service?", "Any suggestions?"]
         },
         "answers": ["4", "Great service!"]
       }
     ]
     ```

4. **View Survey Answers**
   - **URL:** `GET /user/viewSurveyAnswers/:surveyId`
   - **Description:** Retrieves answers given by the current user for a specific survey.
   - **Headers:**
     - `Authorization: Bearer <token>`
   - **Params:** [surveyId](http://_vscodecontentref_/8) (ID of the survey)
   - **Response:**
     ```json
     {
       "_id": "responseId",
       "survey": {
         "_id": "surveyId",
         "title": "Customer Satisfaction Survey",
         "questions": ["How satisfied are you with our service?", "Any suggestions?"]
       },
       "answers": ["4", "Great service!"]
     }
     ```

### Survey Endpoints

1. **Get All Surveys**
   - **URL:** `GET /survey`
   - **Description:** Retrieves a list of all surveys.
   - **Response:**
     ```json
     [
       {
         "_id": "surveyId",
         "title": "Customer Satisfaction Survey",
         "questions": ["How satisfied are you with our service?", "Any suggestions?"]
       }
     ]
     ```

2. **Get Survey by ID**
   - **URL:** `GET /survey/:surveyId`
   - **Description:** Retrieves a specific survey by ID.
   - **Params:** [surveyId](http://_vscodecontentref_/9) (ID of the survey)
   - **Response:**
     ```json
     {
       "_id": "surveyId",
       "title": "Customer Satisfaction Survey",
       "questions": ["How satisfied are you with our service?", "Any suggestions?"]
     }
     ```

3. **Submit Response**
   - **URL:** `POST /survey/response`
   - **Description:** Submits a response for a survey.
   - **Headers:**
     - `Authorization: Bearer <token>`
   - **Body:**
     ```json
     {
       "surveyId": "surveyId",
       "answers": ["4", "Great service!"]
     }
     ```
   - **Response:**
     ```json
     {
       "message": "Response submitted successfully",
       "responseId": "responseId"
     }
     ```

4. **Get Responses by Survey**
   - **URL:** `GET /survey/responses/:surveyId`
   - **Description:** Retrieves responses for a specific survey.
   - **Params:** [surveyId](http://_vscodecontentref_/10) (ID of the survey)
   - **Response:**
     ```json
     [
       {
         "_id": "responseId",
         "survey": "surveyId",
         "user": {
           "_id": "userId",
           "username": "user1"
         },
         "answers": ["4", "Great service!"]
       }
     ]
     ```

## Testing with Postman

1. **Add User**
   - Method: `POST`
   - URL: `http://localhost:3000/admin/addUser`
   - Body: JSON
     ```json
     {
       "username": "newuser",
       "password": "password123",
       "role": "user"
     }
     ```

2. **Remove User**
   - Method: `DELETE`
   - URL: `http://localhost:3000/admin/removeUser/<userId>`

3. **Create Survey**
   - Method: `POST`
   - URL: `http://localhost:3000/admin/createSurvey`
   - Body: JSON
     ```json
     {
       "title": "Customer Satisfaction Survey",
       "questions": [
         {
           "type": "rating",
           "question": "How satisfied are you with our service?"
         },
         {
           "type": "text",
           "question": "Any suggestions?"
         }
       ]
     }
     ```

4. **Assign Survey**
   - Method: `POST`
   - URL: `http://localhost:3000/admin/assignSurvey`
   - Body: JSON
     ```json
     {
       "surveyId": "surveyId",
       "userIds": ["userId1", "userId2"]
     }
     ```

5. **View Surveys**
   - Method: `GET`
   - URL: `http://localhost:3000/admin/viewSurveys`

6. **View Survey Answers**
   - Method: `GET`
   - URL: `http://localhost:3000/admin/viewSurveyAnswers/<surveyId>`

7. **Login**
   - Method: `POST`
   - URL: `http://localhost:3000/user/login`
   - Body: JSON
     ```json
     {
       "username": "newuser",
       "password": "password123"
     }
     ```

8. **Start Survey**
   - Method: `POST`
   - URL: `http://localhost:3000/user/startSurvey`
   - Headers: `Authorization: Bearer <token>`
   - Body: JSON
     ```json
     {
       "surveyId": "surveyId",
       "answers": ["4", "Great service!"]
     }
     ```

9. **View Completed Surveys**
   - Method: `GET`
   - URL: `http://localhost:3000/user/viewCompletedSurveys`
   - Headers: `Authorization: Bearer <token>`

10. **View Survey Answers**
    - Method: `GET`
    - URL: `http://localhost:3000/user/viewSurveyAnswers/<surveyId>`
    - Headers: `Authorization: Bearer <token>`

11. **Get All Surveys**
    - Method: `GET`
    - URL: `http://localhost:3000/survey`

12. **Get Survey by ID**
    - Method: `GET`
    - URL: `http://localhost:3000/survey/<surveyId>`

13. **Submit Response**
    - Method: `POST`
    - URL: `http://localhost:3000/survey/response`
    - Headers: `Authorization: Bearer <token>`
    - Body: JSON
      ```json
      {
        "surveyId": "surveyId",
        "answers": ["4", "Great service!"]
      }
      ```

14. **Get Responses by Survey**
    - Method: `GET`
    - URL: `http://localhost:3000/survey/responses/<surveyId>`

This [README.md](http://_vscodecontentref_/11) file provides a comprehensive guide to all the endpoints available in the Feedback Survey Application, along with instructions on how to test them using Postman.