// import model


  const users = require('../Models/userSchema')

// import jwt

const jwt =require('jsonwebtoken')

// logic for register

 exports.register = async(req,res)=>{

    console.log(`inside userController-register logic`);

    //destruturing datat from the client request body (since json formate is converted into javascript object by the .json( method used in index.js file ))

    const {username, email,password} = req.body
     try
{
    // since email is the unique value we are checking that email is already parent in the database
    // for that we are using findone method which return entire document when the condition is true else return null

    const existingUser = await users.findOne({email})
    if(existingUser){
      // if findone return doument it means thet the user already exist 
      //so we are sending a response in the 400 series (client request error)
      res.status(406).json('Account alredy Exist .....please login')
         
      
    }
    else{
      // if findone returns null ,it mean the email or the user doesnot exist in the database 
      //we register the user

      // create object for the modal
const newUser= new users({
   username,
   email,
   password,
   github:"",
   linkedin:"",
   profile:""
})

//2 add the object use save()method in mongoose 
await newUser.save()


      res.status(200).json(newUser)
    }
   }
   catch(err){
      res.status(401).json("Register Request Failed due to ",err)

   }
  }


  //logic for login 
  exports.login= async(req,res)=>{
       console.log("inside login function ");

       console.log(req.body);
  

  const {email,password}=req.body;

  try{const existingUser= await users.findOne({email,password})
console.log(existingUser);
  if (existingUser){

    //sign is to function used to create token
    // first arg -payload the information that is seretly tranmitted 
    //second arg secret key based on which the token is generated 
      const token = jwt.sign({userId:existingUser._id},"supersecretkey12345") 
    res.status(200).json({
      existingUser,
      token
    }) ;
  }
  else{
    res.status(400).json('Invalid Email or Password')
  }
}catch(err){
  res.status(401).json("Login request failed due to :",err)
}

}

exports.editUser = async(req,res)=>{
  const userId=req.payload
  const{username,email,password,github,linkedin,profile}=req.body

  const projectimage=req.file?req.file.filename:profile

  try{
    const updateUser= await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkedin,profile:projectimage},{new:true})

    await updateUser.save()
    res.status(200).json(updateUser)

  }
  catch(err){
    res.status(401).json(err)
  }
}
   



