import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import streamifier from 'streamifier';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload media from buffer using streamifier (for multer memory storage)
export const uploadMedia = async (fileBuffer) => {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'profile-photos',
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      // ✅ Convert buffer to stream using streamifier
      streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

// Delete media from Cloudinary
export const deleteMedia = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};

export default cloudinary;
