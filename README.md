# Employee Tracker Challenge
This challenge is a command line app that allows you to interact with the database by adding, updating, and viewing items in a database.

## Description
This challenge is mostly about writing database schema's and SQL queries and being able to interact with a database.

## Additional Information
### Notes
I had such a difficult time with this challenge. The initial setup with the SQL queries was straightforward, however the promise structure has thrown me. I am so completely out of my depth. The biggest piece I have to fix on this is the ability to recall mainMenu() right now the user will have to exit the app and re-enter every time and I cannot figure out why. 
EDIT: I was able to figure out how to loop the mainMenu function in the promise. You must call mainMenu without the ().

Another challenge I ran into was a weird bug where the foreign key column would replace the primary key column for roles and employees. The way I solved it was by explicitly calling the column names roles.id and roles.department_id. 

### Video
Link to the walkthrough video

[Walkthrough Video Link](https://drive.google.com/file/d/10zww9pYwRVMitg4Xq_SHAZvNygkw_oef/view)

### Access Application

* https://github.com/IsiBee/employeeTracker-challenge - Github Repo
