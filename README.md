# Repository Overview

This repository contains a test for a Full-Stack Developer position at Haupcar, focused on a **Car Management System** that includes CRUD operations.
**Tech Stack** includes:
 - **Frontend:** React TypeScript
 - **Backend:** Node.js TypeScript with Sequelize ORM
 - **Database:** PsotgreSQL

This README file outlines my thought process, structural planning, and project execution steps for both the frontend and backend.

## Backend
I started the project with the backend first. I use Design Pattern like **Repository Pattern** for clean code architecture. The database has 1 table (Car) and will be used by utilizing containers through the **Docker Compose**, So use the commands below to work with the database.

    docker compose up -d
I don't have any Unit Tests but I use **Postman** to test the APIs, So I've attached the postman json file in the root of the backend folder

Folder Structure includes:

    backend
	    ├── src
		    ├── config        #Set up variables retrieved from a .env file
		    ├── controller    #Manage HTTP requests
		    ├── database      #Set up database connection using sequelize   
		    ├── dto           #Select only the required fields for sending and receiving data
		    ├── interface     #Define the database fields
		    ├── model         #Map an interface to a field in a database
		    ├── repository    #Access data from data sources
		    ├── route         #Define the path of the APIs
		    ├── service       #Business Logic of the APIs
		    └── util          #Helper function (e.g. Generic response)

Fields in the table **Car** includes:
 - carId: integer
 - registrationNumber: string (mush be unique)
 - brand: string
 - model: string
 - notes: string (not require)

The business logic can be summarized as follows:

 1. Registration numbers must be unique; therefore, the system must handle data errors during the creation process to prevent the creation of duplicate entries.

After obtaining the database container, the next step to run the backend is create .env file, fill all the variables in the .env file (variable example is in .env.example) and then run the command below.

    npm run dev

## Frontend

Next, I started with the frontend by installing the necessary dependencies, which include:

 - **tailwind css:**: Used for build UI faster
 - **antd:**:  Used for creating layouts and forms.
 - **axio:** Invoke an API
 - **tanstack query:** Server State Management (e.g. API fetching, Mutation)

I use a feature-based structure for the clean code architecture; however, since there is only one feature "car management" I didn't create a dedicated "features" folder. Instead, I placed the structure for this feature directly within the `src` folder. I use Tanstack Query to cache data fetched from an API, which helps avoid unnecessary redundant API calls.

Folder Structure includes:

    frontend
	    ├── src
		    ├── component     #UI component using antd (e.g. Modal, Table)
		    ├── hook    	  #Reusable API hooks using tanstack query
		    ├── interface     #Define the fields used to receive data from API
		    ├── page          #Frontend page composed of components
		    └── service       #API calls using axios

To run the fronend is create .env file, fill all the variables in the .env file (variable example is in .env.example) and then run the command below.

    npm run dev