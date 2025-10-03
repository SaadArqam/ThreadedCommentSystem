# Nested Comments Frontend

A modern React-based frontend for the nested comments system with a clean, responsive UI built with Tailwind CSS.

## Features

- **Nested Comments**: Support for unlimited comment threading with visual nesting
- **Real-time Updates**: Comments update automatically when new replies are posted
- **Like System**: Users can like comments with optimistic UI updates
- **User Authentication**: Integrated user context with avatar display
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Modern UI**: Clean, modern design with smooth animations and transitions
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Loading indicators for better user experience

## Components

### Core Components
- `App.jsx`: Main application component with user context provider
- `Header.jsx`: Application header with user information
- `CommentList.jsx`: Container for all comments with data fetching
- `Comment.jsx`: Individual comment component with nesting support
- `CommentForm.jsx`: Form for creating new top-level comments
- `ReplyForm.jsx`: Form for replying to existing comments
- `CommentActions.jsx`: Like and reply action buttons

### Services
- `api.js`: Centralized API service for backend communication

### Context
- `UserContext.jsx`: React context for user authentication and state

## Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Integration

The frontend communicates with the backend API at `http://localhost:3000` with the following endpoints:

- `GET /comments` - Fetch all comments
- `POST /comments` - Create a new comment or reply
- `PATCH /comments/:id/like` - Like a comment
- `GET /user` - Get current user information
- `DELETE /comments` - Delete all comments (admin function)

## Styling

The application uses Tailwind CSS for styling with custom CSS in `App.css` for specific animations and effects.

## Development

The frontend is built with:
- React 19.1.1
- Vite for build tooling
- Tailwind CSS for styling
- date-fns for date formatting

## Usage

1. Start the backend server (from the server directory)
2. Start the frontend development server (from the client directory)
3. Open your browser to `http://localhost:5173`
4. The application will automatically load user information and comments
5. Users can create comments, reply to comments, and like comments

## Features in Detail

### Comment Threading
- Comments support unlimited nesting levels
- Visual indicators show comment hierarchy
- Reply forms appear inline when replying

### Like System
- Optimistic UI updates for immediate feedback
- Like counts update in real-time
- Visual feedback for liked comments

### User Experience
- Loading states during API calls
- Error messages for failed operations
- Responsive design for mobile devices
- Smooth animations and transitions

## Troubleshooting

If you encounter issues:

1. Ensure the backend server is running on port 3000
2. Check browser console for any API errors
3. Verify CORS is properly configured on the backend
4. Make sure the database connection is working

## Customization

The UI can be customized by:
- Modifying Tailwind classes in components
- Updating the custom CSS in `App.css`
- Changing the color scheme in the Tailwind configuration
- Adjusting component layouts and spacing