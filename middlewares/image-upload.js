// Importing the multer module for handling multipart/form-data, which is primarily used for uploading files
const multer = require('multer');
// Importing the uuid module for generating unique identifiers
const uuid = require('uuid').v4;

// Configuring multer
const upload = multer({
  // Setting the storage option to diskStorage to store the files on disk
  storage: multer.diskStorage({
    // Setting the destination of the uploaded files
    destination: 'product-data/images',
    // Setting the filename of the uploaded files
    filename: function (req, file, cb) {
      // The filename is set to a unique identifier followed by the original file name
      cb(null, uuid() + '-' + file.originalname);
    },
  }),
});

// Configuring multer to handle single file uploads from fields named 'image'
const configuredMulterMiddleware = upload.single('image');

// Exporting the configured multer middleware
module.exports = configuredMulterMiddleware;
