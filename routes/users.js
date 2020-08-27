const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth=require('../middleware/auth');

const User = require("../models/User");

//Validating User

router.post('/auth',
  
  async (req, res) => {
   
    const { email, password } = req.body;
     if ( !email || !password)
       return res.status(400).json({ msg: "Enter All Fields" });
    

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json( {msg: "Invalid Credentials"} );
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ msg: "Invalid Credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, "secret", (err, token) => {
        if (err) throw err;
        res.json({
          auth:true,
          token,
          user: {
            id: user._id,
            name: user.name,
          },
        });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({msg:"Server error"});
    }
  }
);


//Registering user
router.post(
  "/",
  async (req, res) => {
   
    const { name, email, password } = req.body;
    if(!name || !email || !password) return res.status(400).json({msg:"Enter All Fields"});
    if(password.length<5) return res.status(400).json({msg:"Password needs to be atleast 5 characters long"});


    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json( { msg: "User already exists" } );
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

     
      
        res.json({ msg:'User Registered' });
      
    } catch (err) {
      console.error(err.message);
      res.status(500).json({msg:"Server error"});
    }
  }
);


router.post('/tokenIsValid',async(req,res)=>{
  try {
    const token =req.headers.token;
      
    if(!token) return res.json(false);
     console.log(1);
    const verified=jwt.verify(token,'secret');

    if(!verified) return res.json(false);
  
    return res.json(true);

  } catch (err) {
    console.log(err);
    res.status(500).json({msg:err.message+'s'});
  }
})

router.delete('/',auth,async(req,res)=>{
  console.log("==>testing");
})

router.get('/',auth,async(req,res)=>{
console.log(3);
  const user=await (await User.findById(req.user.id).select('-password'));
  console.log(user)
  res.json(user);

})



module.exports = router;
