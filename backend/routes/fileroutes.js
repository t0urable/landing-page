require('dotenv').config();
const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient'); // Ensure the path is correct

// GET endpoint for listing files from the 'uploads' folder
router.get('/files', async (req, res) => {
    const { data, error } = await supabase
        .storage
        .from(process.env.SUPABASE_UPLOAD_BUCKET_NAME)
        .list('uploads', { limit: 100, offset: 0 }); // Specify the 'uploads' folder

    if (error) {
        return res.status(500).json({ message: 'Failed to retrieve files - check fileroutes.js', error: error.message });
    }

    res.json(data);
});

module.exports = router;
