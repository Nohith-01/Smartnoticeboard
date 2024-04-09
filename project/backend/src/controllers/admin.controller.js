const Admin = require('../models/adminModel.js');

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')



const generateAccessAndRefereshTokens = async(adminId) =>{
  try {
      const admin = await Admin.findById(adminId)
      const accessToken = admin.generateAccessToken()
      const refreshToken = admin.generateRefreshToken()

      admin.refreshToken = refreshToken
      await admin.save({ validateBeforeSave: false })

      return {accessToken, refreshToken}


  } catch (error) {
      throw Error(500, "Something went wrong while generating referesh and access token")
  }
}

const registerAdmin =  async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res
    
   
    const {email, password } = req.body
    //console.log("email: ", email);

    if (
        [email, password].some((field) => field?.trim() === "")
    ) {
        throw Error(400, "All fields are required")
    }

    const existedAdmin = await Admin.findOne({
        $or: [{ email }]
    })

    if (existedAdmin) {
        throw Error(409, "User with email or username already exists")
    }
    //console.log(req.files);
    const admin = await Admin.create({
        email, 
        password,
    })

    const createdAdmin = await Admin.findById(admin._id).select(
        "-password -refreshToken"
    )
        
    if (!createdAdmin) {
        throw Error(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(createdAdmin)
    

}

const loginAdmin = async (req, res) =>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie
     
    const {email,password} = req.body
    console.log(email);

    if ( !email) {
        throw Error(400, "email is required")
    }
    
    // Here is an alternative of above code based on logic discussed in video:
    // if (!(username || email)) {
    //     throw new ApiError(400, "username or email is required")
        
    // }

    const admin = await Admin.findOne({
        $or: [{email}]
    })

    if (!admin) {
        throw Error(404, "User does not exist")
    }

   const isPasswordValid = await admin.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw Error(401, "Invalid user credentials")
    }

   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(admin._id)

    const loggedInAdmin = await Admin.findById(admin._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      {loggedInAdmin, accessToken, refreshToken}
    )

}


const logoutAdmin = async(req, res) => {
    await Admin.findByIdAndUpdate(
        req.admin?._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json("User logged out")
}



const changeCurrentPassword = async(req, res) => {
    const {oldPassword, newPassword} = req.body

    

    const admin = await Admin.findById(req.admin?._id)
    const isPasswordCorrect = await admin.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    admin.password = newPassword
    await admin.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
}

module.exports={
  generateAccessAndRefereshTokens,
  registerAdmin,
  loginAdmin,
  logoutAdmin,



}
