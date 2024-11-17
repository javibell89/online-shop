# Online Shop

A full-featured e-commerce application built with Node.js, Express, and MongoDB.

## Features

- User Authentication (Signup/Login)
- Product Management (Admin)
- Shopping Cart
- Order Processing
- Stripe Payment Integration
- Image Upload
- Session Management
- CSRF Protection

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Template Engine**: EJS
- **Payment Processing**: Stripe
- **File Upload**: Multer
- **Security**: CSRF Protection, Session Management
- **Styling**: CSS

## Project Structure

```
online-shop/
├── config/           # Configuration files
├── controllers/      # Route controllers
├── data/            # Database connection
├── middlewares/     # Custom middlewares
├── models/          # Data models
├── public/          # Static files
│   ├── scripts/     # Client-side JavaScript
│   └── styles/      # CSS files
├── routes/          # Route definitions
├── util/            # Utility functions
└── views/           # EJS templates
```

## Setup

1. Clone the repository

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update `.env` with your Stripe API key:
     ```
     STRIPE_API_KEY=your_stripe_secret_key
     ```

4. Set up MongoDB:

   - Make sure MongoDB is running locally
   - Database will be created at: mongodb://localhost:27017/online-shop

5. Start the application:
   ```bash
   npm start
   ```

## Available Scripts

- `npm start`: Starts the development server using nodemon
- `npm run eslint`: Runs ESLint to check code style
- `npm run eslint:fix`: Automatically fixes ESLint issues

## Code Style

The project uses ESLint with the following key configurations:

- Airbnb base style guide
- Maximum line length of 120 characters
- Custom rules for:
  - Function naming
  - Import ordering
  - Error handling
  - Code formatting

## Features in Detail

### User Management

- User registration and authentication
- Session-based authentication
- Password hashing with bcrypt

### Product Management

- Add, edit, and delete products (admin only)
- Image upload for products
- Product listing and details view

### Shopping Cart

- Add/remove items
- Update quantities
- Price calculations
- Cart persistence across sessions

### Order Processing

- Order creation and management
- Order history
- Payment processing with Stripe
- Order status tracking

### Security

- CSRF protection
- Secure session handling
- Protected routes
- Input validation
- Environment variables for sensitive data

## Environment Variables

The following environment variables are required:

| Variable       | Description                |
| -------------- | -------------------------- |
| STRIPE_API_KEY | Your Stripe secret API key |

## License

ISC

## Author

Javier Bellido
