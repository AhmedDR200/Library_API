const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../images'));
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, new Date().getTime() + '-' + fileName);
    }
});

const upload = multer({ storage })


router.post('/upload',upload.single("image") ,(req, res) => {
    res.status(200).json({ message: 'File uploaded successfully' });
});





module.exports = router;