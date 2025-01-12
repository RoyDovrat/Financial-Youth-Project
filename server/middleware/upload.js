const multer = require('multer');
const path = require('path');
const uuid = require("uuid").v4;

/* in case we want to use aws s3 with secret key

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const storage = multer.memoryStorage();

  const s3Uploadv3 = async (files) => {
  const s3client = new S3Client({ region: process.env.AWS_REGION });

  const params = files.map((file) => {
    console.log("Uploading file:", file.originalname); 
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${uuid()}-${file.originalname}`,
      Body: file.buffer,
    };
  });

  try {
    const results = await Promise.all(
      params.map((param) => s3client.send(new PutObjectCommand(param)))
    );
    console.log("Upload successful:", results);
    return results;
  } catch (error) {
    console.error("S3 Upload Error:", error); // Log the error message
    throw new Error(`S3 upload failed: ${error.message}`);
  }
};
*/

 const storage = multer.diskStorage({
   destination: (req, file, cb) => {
     cb(null, "uploads");
   },
   filename: (req, file, cb) => {
     const { originalname } = file;
     cb(null, `${uuid()}-${originalname}`);
   },
 });

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.mp4' && ext !== '.mov') {
        return cb(new Error('Only video files are allowed'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit

});

module.exports = upload ;