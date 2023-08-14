# Users Feature

## Onsite implementation

The addition of the "Users" concept involves creating a system to manage user accounts within the existing service. Users will have unique identifiers (login) and authentication credentials (password).

The ability to perform various actions within the system, like having a profile, rankings, won matches, removing profiles and more will not be a threat to this implementation.

### API

We will need to add new different endpoints for different scopes. This will require a restructuration of the `/api/src` folder.

Firstly, we should add a `/api` at the beginning of the endpoints to be more in line with the common practice in web service development. This gives us some benefits such as namespace separation, scalability, etc. if needed. Even better could be to use `/api/v1` to allow versioning.

Also, we can create a folder `views` for holding the different [blueprints](https://flask.palletsprojects.com/en/2.3.x/blueprints/) as `/views/game.py` and `/views/users.py`. In the same way, we will have to create folders and files for the logic.

1. **User Registration:**
   - Endpoint: `POST /api/users/register`
   - Request body: User details (login and password)
   - Response: Success message or error
   - Purpose: Allows users to create an account


2. **User Login:**
   - Endpoint: `POST /api/users/login`
   - Request body: User credentials (login and password)
   - Response: Authentication token or error


3. **User Profile Retrieval:**
   - Endpoint: `GET /api/users/:userId`
   - Response: User profile details (nothing for the moment)


#### Alternative solution

Integrate a 3rd party tool like [keycloak](https://www.keycloak.org).


### DB Structure

Already implemented on `api/docker-scripts/initdb.sql`. Check the file for more information about the data types and relations available. This will create the tables with the following structure:

**Users Table:**
   - Fields: `login`, `password` (hashed).
   - Purpose: Store user-related information. Very basic. Info about won matches, profile details and more can be added in the future for a more complete application. Storing tokens for user sessions can be also implemented here or perhaps even better in another table.

Notice that the table `matches` is not mentioned since it would be already necessary for the game.


### Architectural and Infrastructure Design

There would be more topics to discuss like authentication, encrypted communications, session management, data backup, etc.

In terms of logging, we could set up a Sentry instance for monitoring errors and warnings, and configure some alarms on them.

In terms of monitoring, we could also set up a Grafana instance for monitoring service usage. This service usage monitoring can be useful for autoscaling, by setting some alarms that trigger events on the hosting infrastructure for scaling up (or down) the number of resources (pods, VMs, etc.).
