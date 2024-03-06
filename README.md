# Note-Taking App - MERN Stack

## Overview

This Note-Taking App is a simple web application built using the MERN stack (MongoDB, Express.js, React, Node.js). The primary goal of the application is to allow users to create, edit, and delete notes. Additionally, basic user authentication has been implemented to enable users to save and access their own notes securely.

## Features

- **User Authentication:** Secure user authentication ensures that each user has a private space for their notes.
- **Create Notes:** Users can easily create new notes with a title and content.
- **Edit Notes:** Users have the ability to edit their existing notes, providing a seamless editing experience.
- **Delete Notes:** Unwanted notes can be easily deleted, maintaining a clutter-free workspace.

## Technologies Used

- **MongoDB:** For storing and managing the notes data.
- **Express.js:** As the backend framework to handle server-side operations.
- **React:** For building a dynamic and responsive user interface.
- **Node.js:** To run the server and handle server-side logic.

## Getting Started

Follow these steps to set up and run the Note-Taking App locally:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/note-taking-app.git
   cd note-taking-app
   ```

2. **Install Dependencies:**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `server` directory and set the following variables:
   ```env
   PORT=3001
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Run the Application:**
   ```bash
   # Start the server (from the server directory)
   npm start

   # Start the client (from the client directory)
   npm start
   ```

5. **Open in Browser:**
   Visit [http://localhost:3000](http://localhost:3000) in your web browser to access the Note-Taking App.

## Screenshots

### Login/Register
![Login Page](https://github.com/parthasarathy27/Notes-Taking-App/assets/83574852/f11dfa2b-59f3-4f9b-8e80-8bab3dc90c9e)

![Register Page](https://github.com/parthasarathy27/Notes-Taking-App/assets/83574852/65f0022f-72ea-4322-a92a-a467ef01d177)

### Home Page
![Home Page](https://github.com/parthasarathy27/Notes-Taking-App/assets/83574852/c96264ee-a8ff-420e-94ca-19d1ab036818)

### Create Note
![Create Note](https://github.com/parthasarathy27/Notes-Taking-App/assets/83574852/fdd9a445-26f7-4391-bd1d-52c9fdb336cf)

### Edit Note
![Edit Note](https://github.com/parthasarathy27/Notes-Taking-App/assets/83574852/0ed6444f-d092-47d1-aa48-2a233e654610)

## Contributing

If you'd like to contribute to this project, please follow the [contribution guidelines](CONTRIBUTING.md).
