const uuid = require('uuid').v4 
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'uploads/', // temporary directory
  filename: (req, file, cb) => {
    const { originalname } = file;
    const ext = path.extname(originalname); // Get file extension
    cb(null, `${uuid()}${ext}`); 
  },
});

const upload = multer({
  storage, 
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase(); 
    if (ext !== '.mp4' && ext !== '.mov') {
      return cb(new Error('Only video files are allowed'), false);
    }
    cb(null, true);
  },
});

module.exports = upload;