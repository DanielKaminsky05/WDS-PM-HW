# Country Visitor App

This project is a web application that allows users to mark countries they have visited on a map. Users can add or remove countries, and the data is stored in a JSON-based backend.

## Features

- Interactive world map using `react-simple-maps`.
- Add countries to the "visited" list.
- Remove countries from the "visited" list.
- Backend stores data in a JSON file (`countrydb.json`).
- Dynamic map coloring for visited countries.

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **react-simple-maps**: For rendering the interactive map.
- **Axios**: For making HTTP requests to the backend.

### Backend
- **Node.js**: For the server-side logic.
- **Express**: For handling API routes.
- **File System (fs)**: For reading and writing to the JSON database.
- **CORS**: For enabling cross-origin requests.

## Setup Instructions

### Prerequisites
- Node.js installed on your machine.
- A package manager like `npm` or `yarn`.

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend

## Setup Instructions

### Prerequisites
- Node.js installed on your machine.
- A package manager like `npm` or `yarn`.

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`.

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

### Usage
1. Open the frontend in your browser at `http://localhost:5173`.
2. Use the input fields to add or remove countries by their country codes (e.g., `CAN` for Canada, `RUS` for Russia).
3. The map will dynamically update to reflect the visited countries.

### Notes
- The backend stores the list of visited countries in `countrydb.json`. Ensure this file is writable by the server.
- If `countrydb.json` does not exist, it will be created automatically when the backend starts.

### Troubleshooting
- If the backend or frontend fails to start, ensure all dependencies are installed and that no other processes are using the required ports (`3000` for the backend, `5173` for the frontend).
- Check the browser console and terminal logs for error messages.

### Future Enhancements
- Add user authentication to save visited countries per user.
- Implement a search feature to find countries by name.
- Add support for mobile devices with responsive design.