// const cloudinary = require('../config/cloudinary');

// const uploadToCloudinary = async (file, folder) => {
//   try {
//     const result = await cloudinary.uploader.upload(file.path, {
//       folder,
//       resource_type: 'auto',
//     });
//     return { url: result.secure_url, publicId: result.public_id };
//   } catch (error) {
//     throw new Error('Cloudinary upload failed');
//   }
// };

// module.exports = { uploadToCloudinary };

const cloudinary = require('../config/cloudinary');

module.exports = async (file, type = 'image') => {
  const result = await cloudinary.uploader.upload(file.path, {
    resource_type: type === 'music' ? 'video' : 'image',
  });
  return result.secure_url;
};