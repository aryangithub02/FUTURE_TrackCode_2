# MERN E-commerce Application

A full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, product management, and shopping cart functionality.


## 🚀 Features

- **User Authentication**
  - User registration and login
  - JWT-based authentication
  - Protected routes

- **Product Management**
  - Browse products by categories
  - Product search functionality
  - Product details and images
  - Admin product management (CRUD operations)

- **Shopping Experience**
  - Add/remove items to/from cart
  - Product quantity management
  - Responsive design for all devices
  - Smooth animations and transitions

- **Admin Dashboard**
  - Manage products
  - View orders
  - User management

## 🛠 Technologies Used

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- React Icons
- Axios for API calls
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads

## 📦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB installation

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mern-ecommerce.git
   cd mern-ecommerce/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the frontend directory and add:
   ```
   REACT_APP_API_URL=http://localhost:8080
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```
   This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🔧 API Modes

The application supports two modes for API integration:

1. **Backend Mode** - Connects to your local/remote backend server
2. **DummyJSON Mode** - Uses the free DummyJSON API for product data (great for development and testing)

To switch between modes, modify the `API_MODE` constant in `src/common/index.js`:
```javascript
const API_MODE = 'dummyjson'; // or 'backend' for your own backend
```

## 🚀 Deployment

### Frontend Deployment
1. Build the production version:
   ```bash
   npm run build
   ```
2. Deploy the `build` folder to your preferred hosting service (Vercel, Netlify, etc.)

### Backend Deployment
1. Set up environment variables for production
2. Deploy to a Node.js hosting service (Render, Railway, etc.)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For any questions or suggestions, please reach out to [your-email@example.com](mailto:your-email@example.com)

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`
Launches the test runner in interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
