# Storefront Backend Project

## TECHNOLOGIES
-postgres database was used to storefront api project
-nodejs was used to create the backend
-express was used to create the backend
-dotenv was used to manage environment variables
-db-migrate was used to create migrations
-jasmine was used to create test suites
-supertest was used to create test suites
-nodemon was used to spin up the backend


## SECURITY
-jsonwebtoken was used to create JWTs
-bcrypt was used to hash passwords


## SETUP
- use `npm install` to install other dependencies in package.json file

## ENVIRONMENT VARIABLES
- create .env file in root directory and add the following variables:
```
POSTGRES_DATABASE=//databse name
POSTGRES_HOST=//database server hot name
POSTGRES_USER=//database username
POSTGRES_PASSWORD=//database password
POSTGRES_PORT=//database port ,5432 is default
POSTGRES_DATABASE_TEST=//database name for testing
BCRYPT_SECRET=//bcrypt secret string
SALT=// salt rounds
ENV=//environment
JWT_SECRET=//jwt secret string
```

## DATABASE CONNECTIONS
- use 
```
postgres -U username
# ENTER PASSWORD
CREATE DATABASE database_name;
CREATE DATABASE database_name_test;
```
- to create production databasae and test database
 
## MIGRATIONS
- use `npm run db-migrate up` to create the tables
    -users table
    -product table
    -orders table
    -order_prod table

## TESTING
- use `npm run test` to run test

## RUNNING
- use `npm run start` to run the server on port 3000

## End Points
- user end points mentioned in requirements.md file
    ### products
        INDEX route: 'api/products' [GET]
        SHOW route: 'api/products/:id' [GET] 
        CREATE route: 'api/products' [POST]
        UPDATE route: 'api/products/:id' [PUT]
        DELETE route: 'api/products/:id' [DELETE]
    ### orders
        INDEX route: 'api/orders' [GET]
        SHOW route: 'api/orders/:id' [GET]
        CREATE route: 'api/orders' [POST]
        UPDATE route: 'api/orders/:id' [PUT]
        DELETE route: 'api/orders/:id' [DELETE]
        ADD PRODUCT route: 'api/orders/:id/add_product' [POST]
    ### users
        INDEX route: 'api/users' [GET]
        SHOW route: 'api/users/:id' [GET]
        CREATE route: 'api/users' [POST]
        UPDATE route: 'api/users/:id' [PUT]
        LOGIN route: 'api/users/login' [POST]
    ### special end points
        TOP 5 route: 'api/products/top5' [GET]
        PRODUCT BY CATEGORY route: 'api/products/:category' [POST]
        ACTIVE ORDERS BY USER route: 'api/orders/active' [GET]
        COMPLETED ORDERS BY USER route: 'api/orders/complete' [GET]



