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
            "error" : err,
            "message" : msg
        }
        ```
___
## Authentication
> Send a valid token receive form /auth as an header to verify...
___
## API_Route
### auth/
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
___
## Authenticated routes    
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