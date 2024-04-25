require('dotenv').config();
const express = require('express');
const router = express.Router();
const { upload } = require('../config/db'); // Assuming `upload` is configured for `multer`
const supabase = require('../supabaseClient'); // Import the initialized Supabase client

// POST endpoint for multiple file upload
router.post('/upload', upload.array('files'), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  const uploadPromises = req.files.map(file => {
    return supabase.storage.from(process.env.SUPABASE_UPLOAD_BUCKET_NAME).upload(
      `uploads/${file.originalname}`, 
      file.buffer, 
      {
        contentType: file.mimetype, 
        upsert: true, // Overwrite existing files with the same name
      }
    );
  });

  try {
    // Wait for all file uploads to finish
    const results = await Promise.all(uploadPromises);

    // Check for any errors in the upload process
    const errors = results.filter(result => result.error);
    if (errors.length > 0) {
      // Handle the case where one or more uploads failed
      throw new Error('One or more files failed to upload');
    }

    // Respond with success message and details of uploaded files
    return res.status(200).json({
      message: `Successfully uploaded ${results.length} files to Supabase`,
      data: results.map(result => result.data),
    });
  } catch (error) {
    console.error('Error uploading files to Supabase:', error.message);
    return res.status(500).json({ message: 'Error uploading files to Supabase', error: error.message });
  }
});

router.get('/files', async (req, res) => {
  const { data, error } = await supabase
      .storage
      .from(process.env.SUPABASE_UPLOAD_BUCKET_NAME)
      .list('uploads', { limit: 100, offset: 0 });

  if (error) {
      return res.status(500).json({ message: 'Failed to retrieve files', error: error.message });
  }

  // Generate public URLs for each file
  const filesWithUrls = await Promise.all(data.map(async (file) => {
      const { publicURL, error: urlError } = supabase
          .storage
          .from(process.env.SUPABASE_UPLOAD_BUCKET_NAME)
          .getPublicUrl(`uploads/${file.name}`);
      
      if (urlError) {
          console.error('Error generating URL for file:', file.name, urlError);
          return null; // or handle differently as needed
      }

      return { ...file, url: publicURL };
  }));

  res.json(filesWithUrls.filter(file => file !== null)); // Filter out any nulls from errors
});

module.exports = router;
