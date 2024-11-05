# Image Uploader

This project is a simple image uploader application with basic image manipulation features.

## Features

- Upload images via button or drag and drop
- Draw on images
- Rotate and scale images
- Flip images horizontally and vertically
- Undo/Redo functionality
- Keyboard shortcuts for common actions:
  - `Ctr+z`/`Cmd+z` for undo
  - `Ctr+shift+z`/`Cmd+shift+z` for redo
  - `Escape` to exit drawing mode
- Error handling for incorrect file types and big sizes
- Responsive design

## Getting Started

### Prerequisites

- Node.js and npm (or yarn) installed

### Installation

1. Clone the repository: `git clone https://github.com/MrBra1nwash/image-uploader.git`. Or use any other provided by `<> Code` green button at the top.
2. Navigate to the project directory: `cd image-uploader`
3. Run the setup script:

   **Mac:**

   ```bash
   # The `chmod +x start.sh` needs to run only once.
   # All subsequent runs can be just `./start.sh`.
   chmod +x start.sh && ./start.sh
   ```

   **Windows:**

   ```bash
   start.sh
   ```

This script will automatically install dependencies and start both the frontend and backend servers.

## Manual Run (Optional)

If the setup script doesn't work or want to have a more control, you can manually start the app:

**Backend**

1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Start the server: `node index.js`

**Frontend**

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Usage

1. Upload an image using the upload button or via drag and drop.
2. Use the controls to manipulate the image (rotate, scale, flip).
3. Enable drawing mode to draw on the image.
4. Use the undo/redo buttons or keyboard shortcuts (Ctrl+Z, Ctrl+Shift+Z) to manage your edits.

## Technical Notes

- This project prioritizes simplicity and clarity over excessive performance optimizations. So you will not find useless `useCallback` around every function and method as you might used to see :)
- External libraries are minimized to demonstrate core concepts and implementations.
- I intentionally extended the list of supported formats and added `jpeg`. Despite the fact that in the requirements it is "JPG or PNG format". But JPG and JPEG are identical and JPG is from old days. So in my opinion it is easier to test the app when you have support of JPEG.

## Future Improvements

- Deploy to a cloud platform (e.g., Heroku)
- Use a cloud storage service (e.g., AWS S3) for storing images
- Implement user authentication and authorization
- Add comprehensive unit and integration tests
- Implement image compression for efficient storage
- Add image management features (e.g., viewing the list, deleting, etc)
- Persist image manipulations on the server
