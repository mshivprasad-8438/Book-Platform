## BookExchangePlatform

# [Website Url](http://13.127.201.161/)

**Book Exchange Platform** is a web application designed to facilitate the exchange of books among users. This platform aims to create a seamless experience for discovering, listing, and exchanging books. It simplifies the process for users looking to share or acquire books.

## Key Features

- **Book Discovery:**
  Browse a diverse collection of books based on genre, author, or location.

- **User Registration:**
  Create a personal account and log in securely.

- **Book Listings:**
  List the books you have for exchange, including details like title, author, and genre.

- **Exchange Requests:**
  Send and receive requests from other users for book exchanges.

- **User Dashboard:**
  Access a personalized dashboard to manage contributed books, exchange requests, and notifications.

- **Book Availability:**
  View the real-time availability status of a particular book.

- **Contribution Tracking:**
  Keep track of books contributed to the platform and their status.

- **Request History:**
  Review the history of sent and received book exchange requests.

- **Book Removal:**
  Remove a book from the collection if needed, ensuring control over listings.

- **Privacy and Security:**
  Ensure user privacy and data security through robust authentication mechanisms.

- **Mobile-Friendly:**
  Access the platform conveniently through mobile applications.

- **Sustainability:**
  Promote sustainability by encouraging the reuse of books, reducing waste, and adopting eco-friendly practices.

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB

- **Frontend:**
  - HTML
  - CSS
  - Bootstrap
  - jQuery
  - JavaScript (EJS for templating)

- **Storage:**
  - MongoDB
  - S3 (for file storage)

## To Run the Application

1. Create a `.env` file with the following (Replace the text in "" with actual values):
   - `DB_CONNECT`: Your MongoDB connection string
   - `ACCESS_KEY_ID`: IAM user access key
   - `SECRET_ACCESS_KEY`: IAM user secret
   - `book_BUCKET_NAME`: Your S3 bucket name of books
   - `profile_BUCKET_NAME`: Your S3 bucket name of users
   - `REGION`: Region for AWS
   - `JWT_PRIVATEKEY`: A private which you want to use for encryption
   - `Email`: Gmail which you want to use as a server
   - `Password`: App password of your gmail younuse


2. Ensure Node.js is set up on your system.

3. Run the following commands:
   ```bash
   npm install
   npm start
   ```
   Also install all the required modules using the `npm i module_name` command
   At the end run in teminal run `npm start` command
   
5. Open http://localhost:7000/userauth/home in your browser.

This Book Exchange Platform provides an intuitive and user-friendly interface for book enthusiasts to share their passion for reading.
