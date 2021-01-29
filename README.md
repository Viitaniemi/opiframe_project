Timing: Project should be finish at the end of the course

Aim: Everyone creates a simple full-stack application preferably using MERN stack. Database and backend can be changed but frontend 
should be React. Application will have a frontend, backend and a database. It will also have some kind of user management and session management.

required parts:
    - Application
    - Public git (github.com/Viitaniemi)
    - Simple manual
    - Simple design document
        - Architecture
        - Class design
        - UI mocks
        - Static and dynamic flow design
        - Explanation of technologies used
        - Future (plans for futher developement)

Idea:   PoE leaderboad V2
    - frontend has leaderboards, maybe charts, from PoE temp leagues
    - backend serves the frontend json data that are used to make the leaderboards and charts, data is refreshed every 5 minutes or so (Public API constraints and there is no need 
        to constantly update the info).
    - Data gathered from PoE public API, from the end of every day the server stores data in MongoDB that is used to make leaderboards from previous days 
        or charts that span multiple days.
    - User management? Ability link to your PoE account or to make an account on the site where you can specify your characters / account name on PoE, 
        to see yourself on the leaderboard / charts.