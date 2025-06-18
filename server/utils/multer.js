import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import stream from 'stream';

// Configure memory storage
const storage = multer.memoryStorage();

// Enhanced file filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Only JPEG, PNG, and WebP images are allowed'), false);
  }
  
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1
  }
});

// Cloudinary upload helper
const uploadStreamToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'user-profiles' },
      (error, result) => error ? reject(error) : resolve(result)
    );
    
    const bufferStream = new stream.PassThrough();
    bufferStream.end(buffer);
    bufferStream.pipe(uploadStream);
  });
};

export const singleUpload = upload.single('profilePhoto');
export { uploadStreamToCloudinary };