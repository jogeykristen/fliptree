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
  
        const {
          name,
          phonenumber,
          type,
          DOB,
          motherTounge,
          location,
          email,
          maritalStatus,
          height,
          birthStar,
          caste,
          disabled,
          education,
          job,
          bio,
          food,
          drinking,
          smoking,
          beliefs,
          hobbies
        } = req.body;
  
        console.log("name =", name);
  
        if (
          !name ||
          !phonenumber ||
          !type ||
          !DOB ||
          !motherTounge ||
          !location ||
          !email ||
          !maritalStatus ||
          !height ||
          !birthStar ||
          !caste ||
          !disabled ||
          !education ||
          !job ||
          !bio ||
          !food ||
          !drinking ||
          !smoking ||
          !beliefs ||
          !hobbies
        ) {
          return res.status(400).json({ message: 'All fields are required' });
        }
  
        const imageUrl = req.file ? req.file.path : undefined;
  
        const regex = /^\d{10}$/;
  
        const newUser = await user.findOne({ phonenumber });
        if (!newUser) {
          if (regex.test(phonenumber)) {
            const details = new user({
              name,
              phonenumber,
              type,
              DOB,
              motherTounge,
              location,
              email,
              maritalStatus,
              height,
              caste,
              birthStar,
              disabled,
              education,
              job,
              bio,
              food,
              drinking,
              smoking,
              beliefs,
              hobbies,
              image: imageUrl
            });
  
            const result = await details.save();
  
            return res.status(200).send("User registered successfully");
          } else {
            return res.status(401).json({ message: "Enter a valid 10 digit number" });
          }
        } else {
          return res.status(401).json({ message: "User with this number already exists" });
        }
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ message: "Server error" });
    }
};
module.exports.getAllUsers = async(req,res)=>{
    const result = await user.find()
    return res.status(200).json({result})
}

module.exports.updateUser = async (req, res) => {
    try {
      const { phonenumber } = req.params; 
      const { email,location,job,bio} = req.body;
      const existingUser = await user.findOne({ phonenumber });
        if (!existingUser) {
        return res.status(400).json({ message: 'User not found' });
        }

        existingUser.email = email;
        existingUser.location = location;
        existingUser.job = job;
        existingUser.bio = bio;

        await existingUser.save();

        return res.status(200).json({ message: 'User details updated successfully' });
        }
    catch (error) {
    console.log('Error:', error);
    return res.status(500).json({ message: 'Server error' });
    }
};