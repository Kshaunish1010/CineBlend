# CineBlend - Netflix Clone

CineBlend is a feature-rich Netflix clone that has been developed using a stack of cutting-edge technologies. This README file provides an overview of the project and its key features.

## Visit Website

- **Visit CineBlend**: [CineBlend Website](https://eloquent-hotteok-ce3a6f.netlify.app/)
- 
## GitHub Repository

- **GitHub Repository URL**: [CineBlend GitHub Repository](https://github.com/Kshaunish1010/CineBlend)

## Features

CineBlend is a full-featured Netflix clone that replicates the Netflix user experience, and more. Here are some of the core features of this project:

1. **Frontend with ReactJS**: CineBlend's frontend is built using ReactJS, a popular JavaScript library for building user interfaces. ReactJS provides a smooth and interactive user experience.

2. **Backend with Node.js and Express.js**: The backend of CineBlend is powered by Node.js and Express.js, providing a robust and scalable server architecture. These technologies are known for their high performance and flexibility.

3. **Database with MongoDB**: MongoDB is used as the database for CineBlend, offering a NoSQL database solution that can efficiently store and manage large amounts of data.

4. **User Authentication**:
   - **Google Login**: CineBlend features Google login, making it easy for users to sign in and access the platform using their Google credentials don by using firebase.
   - **OTP Authorization**: For added security, OTP (One-Time Password) authorization is implemented to verify user identities using twilio.

5. **TMDB Integration**: CineBlend integrates with The Movie Database (TMDB) API to provide movie and series details. This ensures that users have access to a wide range of content information.

6. **React-Redux State Management**: React-Redux is used to manage the application's state, providing seamless and efficient data management and reducing unnecessary re-renders.

7. **Dynamic Movie Trailer**: CineBlend offers a Dynamic Movie Trailer feature, allowing users to watch movie trailers directly on the platform. This enhances the user experience and helps users make informed choices.

8. **Movie Discovery and Search**: Users can explore and search for their favorite movies and TV series easily. A user-friendly search and recommendation system helps users discover new content.

## Getting Started

To get started with CineBlend, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Kshauish1010/CineBlend.git

2. Navigate to the project directory: `cd Social_Sphere`
   
3. Install dependencies for the frontend and backend:
* Frontend:  Change directory to the `client` directory: `cd client`
  * Install the Node.js dependencies: `npm install`

* Backend:Change directory to the `api` directory: `cd api`
  * Install the Node.js dependencies: `npm install`


4. Set up a MongoDB database and configure the necessary environment variables for the server.

5. Twilio free trial only works for phone numbers registered on its website.

6. To start the servers:

* Start the frontend and backend servers separately using the following commands in their respective directories:
    * Frontend: `cd client;
                 npm start`
    * Backend: `cd api;
                npm server.js`

Access the application by opening a web browser and navigating to the provided URL (usually http://localhost:3000).
