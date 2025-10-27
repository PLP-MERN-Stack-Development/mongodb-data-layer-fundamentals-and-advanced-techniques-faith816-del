MongoDB Fundamentals - Week 1

Setup Instructions

Before starting this assignment, ensure you have the following installed:

1. MongoDB Community Edition – Installation Guide
or set up a *free MongoDB Atlas cluster.


2. MongoDB Shell (mongosh) – included with MongoDB Community Edition or accessible via Atlas.


3. Node.js – Download here.



Project Setup

1. Clone your GitHub Classroom repository:

git clone <your-repo-url>
cd <your-repo-folder>


2. Initialize Node.js and install dependencies (if not already installed):

npm init -y
npm install mongodb dotenv


3. Create a .env file in the project root with your MongoDB connection string:

MONGO_URI="your-mongodb-connection-string"

> Make sure .env is added to .gitignore to keep credentials private.



Assignment Overview

This assignment covers MongoDB fundamentals, including:

Connecting to MongoDB and creating databases/collections

CRUD operations (Create, Read, Update, Delete)

Querying and filtering documents

Aggregation pipelines for data analysis

Indexing for performance optimization



How to Run

1. Populate the database:

node insert_books.js

This script inserts 10 sample book documents into the plp_bookstore database.


2. Run queries:

node queries.js

This script demonstrates:

Find books by genre, author, and publication year

Update book price

Delete a book

Advanced queries: filter, projection, sorting, pagination

Aggregation pipelines: average price by genre, top author, books by decade

Indexing and performance analysis



Files Included

insert_books.js – populates the database with sample books

queries.js – contains all required MongoDB queries and aggregations

.env – contains your MongoDB connection string (excluded from GitHub)

README.md – instructions and overview


Requirements

Node.js (v18 or higher)

MongoDB ( Atlas cluster)

MongoDB Shell (mongosh) or MongoDB Compass


Submission

1. Push all files to your GitHub Classroom repository.


2. Include a screenshot of MongoDB Compass or Atlas showing your books collection and sample documents.


3. Ensure .env is not included in the repository.




---

Resources

MongoDB Documentation

MongoDB University

MongoDB Node.js Driver