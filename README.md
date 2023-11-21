# Project Routes Documentation

This documentation provides a comprehensive overview of the available routes in the backend server for the project. These routes handle various functionalities related to admin and voter authentication.

## Admin Routes

### Sign In Admin

- **Endpoint:** `POST /admin/sign-in`
- **Description:** Allows an admin to sign in by providing valid credentials.
- **Request Body:**
  - `adminWalletAddress`: Wallet address of the admin.
  - `password`: Admin password.
- **Example:**
  ```json
  {
    "adminWalletAddress": "0x558A03Ea3052620c34D12fA3A1500EbA7D135bE9",
    "password": "adminPassword123"
  }
  ```
- **Response:**
  - Successful Response (HTTP Status Code: 200):
    ```json
    {
      "message": "Successfully logged in admin",
      "token": "your_generated_jwt_token",
      "status": 200
    }
    ```
  - Error Response (HTTP Status Code: 401):
    ```json
    {
      "message": "Invalid credentials",
      "status": 401
    }
    ```
  - Internal Server Error Response (HTTP Status Code: 500):
    ```json
    {
      "message": "Failed to log in admin",
      "error": "detailed_error_message",
      "status": 500
    }
    ```

### Verify Voter

- **Endpoint:** `PUT /admin/verify-voter`
- **Description:** Allows an admin to verify a voter by updating their verification status.
- **Request Query Parameters:**
  - `walletAddress`: Wallet address of the voter to be verified.
- **Example:**
  - `/admin/verify-voter?walletAddress=0x558A03Ea3052620c34D12fA3A1500EbA7D135bF34`
- **Response:**
  - Successful Response (HTTP Status Code: 201):
    ```json
    {
      "message": "Successfully Verified",
      "status": 201
    }
    ```
  - Internal Server Error Response (HTTP Status Code: 500):
    ```json
    {
      "message": "Failed to verify user",
      "error": "detailed_error_message",
      "status": 500
    }
    ```

### Get Voters

- **Endpoint:** `GET /admin/get-voters`
- **Description:** Allows an admin to retrieve a list of all voters.
- **Response:**
  - Successful Response (HTTP Status Code: 200):
    ```json
    {
      "message": "Successfully gotten voters",
      "voters": [
        // Array of voter objects
      ],
      "status": 200
    }
    ```
  - Internal Server Error Response (HTTP Status Code: 500):
    ```json
    {
      "message": "Failed to get voters",
      "error": "detailed_error_message",
      "status": 500
    }
    ```

### Get Voter

- **Endpoint:** `GET /admin/get-voter`
- **Description:** Allows an admin to retrieve details of a specific voter.
- **Request Query Parameters:**
  - `walletAddress`: Wallet address of the voter to be retrieved.
- **Example:**
  - `/admin/get-voter?walletAddress=0x558A03Ea3052620c34D12fA3A1500EbA7D135bF34`
- **Response:**
  - Successful Response (HTTP Status Code: 200):
    ```json
    {
      "message": "Successfully gotten voter",
      "voter": {
        // Voter object details
      },
      "status": 200
    }
    ```
  - Internal Server Error Response (HTTP Status Code: 500):
    ```json
    {
      "message": "Failed to get voter",
      "error": "detailed_error_message",
      "status": 500
    }
    ```

## Voter Routes

### Sign Up Voter

- **Endpoint:** `POST /voter/sign-up`
- **Description:** Allows a voter to sign up by providing necessary details.
- **Request Body:**
  - `voterWalletAddress`: Wallet address of the voter.
  - `fullName`: Full name of the voter.
  - `country`: Country of the voter.
  - `ID`: Voter ID of the voter.
  - `phoneNumber`: Phone number of the voter.
  - `password`: Voter password.
- **Example:**
  ```json
  {
    "voterWalletAddress": "0x558A03Ea3052620c34D12fA3A1500EbA7D135bF34",
    "fullName": "John Doe",
    "country": "USA",
    "ID": "123456",
    "phoneNumber": "123456",
    "password": "your_secure_password"
  }
  ```
- **Response:**
  - Successful Response (HTTP Status Code: 201):
    ```json
    {
      "message": "Successfully created a voter",
      "voter": {
        // Voter object details
      },
      "token": "your_generated_jwt_token",
      "status": 201
    }
    ```
  - Error Response (HTTP Status Code: 400 or 500):
    ```json
    {
      "message": "Failed to create voter",
      "error": "detailed_error_message",
      "status": 400 or 500
    }
    ```

### Login Voter

- **Endpoint:** `POST /voter/sign-in`
- **Description:** Allows a voter to log in by providing valid credentials.
- **Request Body:**
  - `voterWalletAddress`: Wallet address of the voter.
  - `password`: Voter password.
- **Example:**
  ```json
  {
    "voterWalletAddress": "0x558A03Ea3052620c34D12fA3A1500EbA7D135
