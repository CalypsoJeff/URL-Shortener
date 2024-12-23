# URL-Shortener

A simple and efficient URL shortener application that allows users to register, log in, and shorten URLs with redirection functionality.

---

## Features
- **Registration**: Secure account creation for users.
- **Login**: User authentication with JWT.
- **URL Shortener**: Convert long URLs into short links.
- **Redirection**: Shortened links redirect to the original URL.

---

## Tech Stack
- **Frontend**: TSX, Vite
- **Backend**: TypeScript
- **Hosting**:
  - Backend: Render
  - Frontend: Vercel
- **Database**: MongoDB

---

## Live Demo
The application is deployed and accessible at:  
**[Deployed URL](https://url-shortener-seven-tan.vercel.app)**

---
## AI-Assisted Development:
This project utilized AI tools like ChatGPT, Claude.Ai and V0byVercel to enhance the development process:

- Frontend UI Development: ChatGPT was instrumental in generating and improving the frontend UI components/pages.
- Error Handling: AI assistance helped identify and resolve bugs more efficiently during the development process.
- Understanding Nest.js: These tools provided valuable explanations and guidance, enabling a deeper understanding of Nest.js concepts and architecture.
By leveraging these tools, the development speed and code quality were significantly improved, ensuring a smoother and more efficient workflow.

---
## Prerequisites
- Node.js installed on your local machine.
- Git installed for version control.

---

## Installation

### Clone the Repository
Clone the repository and navigate into it:
```bash
git clone https://github.com/CalypsoJeff/URL-Shortener.git
cd URL-Shortener
cd server
npm install
cd ../client
npm install

Create a .env file in  backend directories and add the necessary environment variables. 
For Backend:
Example:
JWT_SECRET = 
MONGO_URL=
PORT=

For Frontend / client:
VITE_API_URL=http://localhost:5000
Run the Application Locally:
Backend
Start the backend server:
cd server
npm start
Frontend
Start the frontend / client server:
cd client
npm run dev

Access the Application:
Frontend: http://localhost:5173
Backend: http://localhost:5000

Contributing
Contributions are welcome! 
Feel free to fork the repository and submit a pull request.

