import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import stream from 'stream';

// Use memory storage (good for streaming to Cloudinary)
const storage = multer.memoryStorage();

// Accept both images and videos
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'video/mp4',
    'video/webm',
    'video/ogg'
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Only JPEG, PNG, WebP images and MP4/WebM/Ogg videos are allowed'), false);
  }

  cb(null, true);
};

// 5MB limit for images, 100MB for videos (you can tweak this logic)
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB max for videos
    files: 1
  }
});

// Cloudinary upload stream helper
const uploadStreamToCloudinary = (buffer, type = 'auto') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: type === 'video' ? 'lecture-videos' : 'user-profiles',
        resource_type: type,
      },
      (error, result) => (error ? reject(error) : resolve(result))
    );

    const bufferStream = new stream.PassThrough();
    bufferStream.end(buffer);
    bufferStream.pipe(uploadStream);
  });
};

export { upload, uploadStreamToCloudinary };
