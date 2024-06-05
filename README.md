# Blogit

Welcome to BlogIt, a modern blogging platform built using React. With BlogIt, users get a very user-friendly and intuitive UI to add their blog post(s) to the public.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication (Sign Up, Log In)
- Create, Edit, and Delete Blogs
- Like Blogs
- Responsive UI

## Tech Stack

- **Frontend:** React, React Hook Form, React Redux Toolkit, React Router
- **Backend:** Appwrite (for Authentication and Database)
- **State Management:** Redux (React Redux Toolkit)
- **Form Management:** React Hook Form

## Setup and Installation

To get started with BlogIt, follow these steps:

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Appwrite server setup (You can refer to [Appwrite documentation](https://appwrite.io/docs))

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/Devam433/BlogIt.git
    cd BlogIt
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

    or

    ```sh
    yarn install
    ```

3. Configure Appwrite:

    - Set up your Appwrite server and create a new project.
    - Create the necessary collections for users and blogs.
    - Update the `src/config/config.js` file with your Appwrite project details.

4. Start the development server:

    ```sh
    npm run dev
    ```

    or

    ```sh
    yarn start
    ```

    The app should now be running on `http://localhost:3000`.

## Usage

### User Authentication

- **Sign Up:** Users can sign up by providing their email and password.
- **Log In:** Existing users can log in using their credentials.

### Blogs

- **Create Blog:** Authenticated users can create new blogs.
- **Edit Blog:** Users can edit their own blogs.
- **Delete Blog:** Users can delete their own blogs.
- **Like Blog:** Users can like any blog.



## Contributing

Feel free to contribute

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.
