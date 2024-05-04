require('dotenv').config();
const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// DELETE endpoint for deleting a specific file from the 'uploads' folder in the bucket
router.delete('/files/:fileName', async (req, res) => {
    const fileName = req.params.fileName;  // Get the file name from the route parameter

    const { data, error } = await supabase
        .storage
        .from(process.env.SUPABASE_UPLOAD_BUCKET_NAME)
        .remove(['uploads/' + fileName]);  // File path in the bucket

    if (error) {
        return res.status(500).json({ message: 'Failed to delete the file', error: error.message });
    }

    // Send a success response
    res.json({ message: 'File deleted successfully', data });
});

module.exports = router;
