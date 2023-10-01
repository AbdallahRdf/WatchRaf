# Pomoraf - Pomodoro Timer App

Pomoraf is a Pomodoro Timer app built with ReactJS and Firebase Firestore to help you stay productive and manage your work efficiently.


## Features

- Pomodoro Timer: Use the Pomodoro technique to boost your productivity with focused work intervals.
- User Stats: Track your Pomodoro sessions and progress over time with Firebase Firestore.
- User Authentication: Securely log in to your Pomoraf account.

## Getting Started

Follow these instructions to set up and run Pomoraf on your local machine.

### Prerequisites

- Node.js: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository:

     ```bash
     git clone https://github.com/AbdallahRdf/pomodoro.git

2. Navigate to the project directory:
   
     ```bash
     cd pomoraf
     
4. Install the project dependencies:
   
     ```bash
     npm install

### Configuration
1. Create a Firebase project at Firebase Console.
2. Set up Firebase Authentication and Firestore for your project.
3. Obtain your Firebase configuration details.

### Environment Variables
Create a .env file in the project root and add your Firebase configuration using the Vite format:

      ```bash 
      VITE_POMORAF_API_KEY=your-api-key
      VITE_POMORAF_AUTH_DOMAIN=your-auth-domain
      VITE_POMORAF_PROJECT_ID=your-project-id
      VITE_POMORAF_STORAGE_BUCKET=your-storage-bucket
      VITE_POMORAF_MESSAGING_SENDER_ID=your-messaging-sender-id
      VITE_POMORAF_APP_ID=your-app-id
    
### Start the Development Server
Run the following command to start the development server:
    
    ```bash
    npm start
    
Pomoraf should now be running locally at http://localhost:3000.

## Acknowledgments

- **React** - A JavaScript library for building user interfaces.
- **Firebase** - A comprehensive mobile and web app development platform.

## Contact

If you have any questions or suggestions regarding this project, you can contact me at abdallahradfi@gmail.com.

Happy Pomodoro-ing!


