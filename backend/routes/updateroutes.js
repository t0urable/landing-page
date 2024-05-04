require('dotenv').config();
const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// PUT endpoint for renaming a specific file in the 'uploads' folder of the bucket
router.put('/files/:oldFileName/:newFileName', async (req, res) => {
    const oldFileName = req.params.oldFileName; // Get the old file name from the route parameter
    const newFileName = req.params.newFileName; // Get the new file name from the route parameter

    // First, download the existing file
    const { data: downloadData, error: downloadError } = await supabase
        .storage
        .from(process.env.SUPABASE_UPLOAD_BUCKET_NAME)
        .download('uploads/' + oldFileName);

    if (downloadError) {
        return res.status(500).json({ message: 'Failed to download the file for renaming', error: downloadError.message });
    }

    // Then, upload the file with the new name
    const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from(process.env.SUPABASE_UPLOAD_BUCKET_NAME)
        .upload('uploads/' + newFileName, downloadData, {
            upsert: false  // Set to false to prevent overwriting existing files
        });

    if (uploadError) {
        return res.status(500).json({ message: 'Failed to upload the file with new name', error: uploadError.message });
    }

    // If the upload is successful, delete the old file
    const { error: deleteError } = await supabase
        .storage
        .from(process.env.SUPABASE_UPLOAD_BUCKET_NAME)
        .remove(['uploads/' + oldFileName]);

    if (deleteError) {
        // If deletion fails, attempt to delete the newly uploaded file to avoid duplicates
        await supabase
            .storage
            .from(process.env.SUPABASE_UPLOAD_BUCKET_NAME)
            .remove(['uploads/' + newFileName]);
        return res.status(500).json({ message: 'Failed to delete the old file', error: deleteError.message });
    }

    // Send a success response
    res.json({ message: 'File renamed successfully', data: uploadData });
});

module.exports = router;
