require('dotenv').config();
const jwt = require('jsonwebtoken');
const app =require('../app')
const {user} = require('../database/userDetails')
module.exports.login = async (req, res) => {
    try {
      const { phonenumber } = req.body;
      const regex = /^\d{10}$/;
      if (regex.test(phonenumber)) {
        const min = 1000;
        const max = 9999;
        const verificationCode = Math.floor(Math.random() * (max - min + 1) + min);
  
        req.session.verificationCode = verificationCode;
        req.session.phonenumber = phonenumber;
  
        return res.status(201).json({ verificationCode });
      } else {
        return res.status(401).json({ message: "Enter a valid 10 digit number" });
      }
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ message: "server error" });
    }
  };

module.exports.verifyToken = async(req,res)=>{
    try {
        const { enteredCode } = req.body;
        console.log("Entered code =", enteredCode);
    
        
        const verificationCode = req.session.verificationCode;
        console.log("verify =",verificationCode)
        if (!verificationCode) {
            return res.status(400).json({ message: 'Verification code not found in session' });
          }
        
        if (enteredCode === verificationCode) {
          return res.status(201).json({ message: 'Login successful' });
        } else {
          
          return res.status(400).json({ message: 'Verification code is invalid' });
        }
      } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: 'Server error' });
      }
    };

    module.exports.resendToken = async (req, res) => {
        try {
        //   const { phonenumber } = req.body;
        //   const regex = /^\d{10}$/;
          
            const min = 1000; 
            const max = 9999; 
            
            const verificationCode = Math.floor(Math.random() * (max - min + 1) + min);
            const phonenumber = req.session.phonenumber;
            if (!phonenumber) {
            return res.status(400).json({ message: 'Phone number not found in session' });
            }

            req.session.verificationCode = verificationCode;
            // const { code, phonenumber } = req.session.verificationCode;
            // req.session.verificationCode.code = verificationCode;
            //req.session.verificationCode = verificationCode;
      
            // Send the new verification code to the user's phone number
            //logic.sendVerificationCode(verificationCode, phonenumber);
      
            return res.status(200).json({ verificationCode });
        } catch (error) {
          console.log('error', error);
          return res.status(500).json({ message: 'server error' });
        }
      };