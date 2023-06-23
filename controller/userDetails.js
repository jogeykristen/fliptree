const { user } = require('../database/userDetails');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/';
        
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});


const upload = multer({ storage: storage }).single('image');

module.exports.userDetails = async (req, res) => {
  try {
   
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        
        console.log("Multer Error:", err);
        return res.status(400).json({ message: 'Image upload failed' });
      } else if (err) {
        
        console.log("Error:", err);
        return res.status(500).json({ message: 'Server error' });
      }
      const imageUrl = req.file ? req.file.path : undefined;
      
      const details = new user({
        name: req.body.name,
        type: req.body.type,
        DOB: req.body.DOB,
        motherTounge: req.body.motherTounge,
        location: req.body.location,
        email: req.body.email,
        maritalStatus: req.body.maritalStatus,
        height: req.body.height,
        caste: req.body.caste,
        birthStar: req.body.birthStar,
        disabled: req.body.disabled,
        education: req.body.education,
        job: req.body.job,
        bio: req.body.bio,
        food: req.body.food,
        drinking: req.body.drinking,
        smoking: req.body.smoking,
        beliefs: req.body.beliefs,
        hobbies: req.body.hobbies,
        // image: {
        //   data: req.file.buffer,
        //   contentType: req.file.mimetype 
        // }
        image: imageUrl
      });

     
      const result = await details.save();

      return res.status(200).send("User registered successfully");
    });
  } catch (error) {
        console.log("error", error);
        return res.status(500).json({message:"Server error"})
    }
}