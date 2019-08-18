# API Document
## status
- Every Response from server start with `status`
- status
    - OK
        ```
        {
            "status" : "OK",
            _ server responses
        }
        ```
    - Error
        ```
        {
            "status" : "Error",
            "http" : status,
            "error" : err
        }
        ```
## Authentication
> Send a valid token receive form /api/auth/login as an header of 'auth_token' to verify...
## API_Route /api/
### auth/
#### login/
- POST
    ```
    {
        "username" : usr,
        "password" : pwd
    }
    ```
- Return
    ```
    {
        "level" : lvl, //privilege
        "token" : tok
    }
    ```
### pictures/
- Return
    ```
    {
        "pictures" : [
            (source, alt), ...
        ]
    }
    ```
### admin/
#### create/
- /user/
    - Post
    ```
    {
        "username" : usr,
        "password" : pwd,
        "permission" : 0-2,
        "name" : myname,
        "school" : school,
        "country" : myschool,
        * "email" : email,
        * "project" : myprojectcode
    }
    * means not required
    ```
    - Return 
    ```
    {
        "user" : {
            ...
        }
    }
    ```
- /project/
   - Post
    ```
    {
        "name" : prjname,
        "branch" : fewchoices,
        "code" : prjcode,
    }
    ```
    - Return 
    ```
    {
        "project" : {
            ...
        }
    }
    ```
### announcements/
#### all/
- Return
    ```
    {
        "announcements" : [
            (id, topic),...
        ]
    }
    ```
#### \<id>/
- Return
    ```
    {
        "announcement" : {
            "id" : id,
            "topic" : topic,
            "author" : author,
            "date" : date,
            "time" : time,
            "content" : content
        }
    }
    ```
### calendar/
#### all/
- Return
    ```
    {
        "events" : [
            (id, name, date), ...
        ]
    }
    ```
#### \<id>/
- Return
    ```
    {
        "event" : {
            "id" : id,
            "topic" : topic,
            "date" : date,
            "description" : desc
        }
    }
    ```
### profile/
- Return
    ```
    {
        "username" : usr,
        "name" : name,
        "school" : school,
        "country" : country_code,
        "email" : email,
        "project" : {
            "branch" : branch,
            "name" : name,
            "room" : room
        }
    }
    ```
### report/
- POST
    ```
    {
        "topic" : topic,
        "content" : content,
        "user" : usr
    }
    ```
- Return
    ```
    {
        "submitted" : true
    }
    ```
### newspaper/
- Return
    ```
    {
        newspaper : source
    }
    ```
### forms/
```Underdevelopment```

## Structure
```
.
|-- index.js
|-- log.txt
|-- .env
|-- api
|    `-- apiroutes.js
|-- bin
|   |-- models
|   |    `-- mongoosemodels.js
|   `-- alllibs.js
|-- routes
|    `- webroutes.js
`-- templates
     `- ejstemps.ejs
```
## Contributors
- Me (obviously)
- [@JDerp](https://github.com/jDerp)
- [@parnikkapore (Maybe, Probably not)](https://github.com/parnikkapore)
- [@itzmeowww](https://github.com/itzmeowww)
    
- [@Non-J](https://github.com/Non-J) is making [a Flutter app](https://github.com/Non-J/kvis_sf_flutter)
