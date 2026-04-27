# URL Shortener

A simple and efficient URL shortening application built with Node.js, Express, MongoDB, and EJS.

## Introduction

This project demonstrates how to build a URL shortener web application using Node.js, Express, MongoDB, and EJS. The application allows users to shorten long URLs, track clicks on shortened links, and manage their URL collection. The shortid module is used to generate unique identifiers, MongoDB stores the data, and Bootstrap provides a clean user interface.

## Features

- **URL Shortening** - Convert long URLs into short, easy-to-remember links
- **URL Redirection** - Automatically redirect users from short URLs to the original full URLs
- **Click Tracking** - Track the number of clicks on each shortened URL
- **URL Management** - View all shortened URLs in a clean table format
- **URL Deletion** - Remove unwanted shortened URLs from the database
- **Persistent Storage** - MongoDB database for reliable data persistence

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Frontend:** EJS templating engine, Bootstrap 5
- **Utilities:** shortid (for unique URL generation), method-override (for HTTP method override)

## Requirements

- Node.js (v12 or higher)
- MongoDB (local or remote instance)
- npm (Node Package Manager)

## Installation

1. Clone or download the project
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Update the MongoDB connection URI in `server.js` if needed:

```js
const MONGO_URI = `mongodb://127.0.0.1:27017/Url_Shortner`;
```

## Running the Application

Start the development server:

```bash
npm run devStart
```

Or start the server directly:

```bash
npm start
```

The application will be available at `http://localhost:5000/`

## Database Schema

The application uses a single MongoDB collection called `urls` with the following fields:

```javascript
{
  _id: ObjectId,           // MongoDB document ID
  full: String,            // Original full URL (required)
  short: String,           // Generated short URL (required, unique)
  clicks: Number,          // Click counter (default: 0)
  createdAt: Date          // Timestamp (auto-generated)
}
```

## API Endpoints

| Method | Route        | Description                                       |
| ------ | ------------ | ------------------------------------------------- |
| GET    | `/`          | Display homepage with all shortened URLs          |
| POST   | `/shorturls` | Create a new shortened URL                        |
| GET    | `/:shorturl` | Redirect to the original URL and increment clicks |
| POST   | `/:id`       | Delete a shortened URL (uses method-override)     |

## Project Structure

```
.
├── server.js              # Main Express server and route definitions
├── models/
│   └── shorturl.js        # MongoDB schema for URLs
├── views/
│   └── index.ejs          # Frontend template
├── package.json           # Project dependencies
├── package-lock.json      # Dependency lock file
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## How It Works

### Creating a Short URL

1. User enters a full URL in the form
2. Form is submitted to `/shorturls` endpoint
3. Server creates a new document in MongoDB with the full URL and a generated short ID
4. User is redirected to the homepage where the new shortened URL appears

### Redirecting from a Short URL

1. User clicks or visits a shortened URL (e.g., `http://localhost:5000/abc123`)
2. Server looks up the short URL in the database
3. Click counter is incremented
4. User is redirected to the original full URL

### Deleting a Short URL

1. User clicks the "Delete" button next to a URL
2. Server receives a DELETE request with the URL's MongoDB ID
3. Document is removed from the database
4. User is redirected to the homepage

## Development

To run the server with auto-reload during development:

```bash
npm run devStart
```

This uses nodemon to automatically restart the server when file changes are detected.

## Future Enhancements

- Add user authentication and authorization
- Implement custom short URL generation
- Add URL expiration dates
- Create an admin dashboard with statistics
- Add input validation and sanitization
- Implement rate limiting for API endpoints
- Add URL preview functionality
- Support for QR code generation

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Notes

- Ensure MongoDB is running before starting the application
- The application runs on port 5000 by default
- Short URLs are generated using the shortid library and are unique
- Click counts are incremented each time a shortened URL is accessed
