const multer = require('multer');

// Configure Multer's memory storage
const storage = multer.memoryStorage();

// Initialize and configure Multer
const upload = multer({ storage: storage });

module.exports = { upload };
