import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiErrors.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    console.log("Generated Access Token:", accessToken);
    console.log("Generated Refresh Token:", refreshToken);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error in generateAccessAndRefreshToken:", error);
    throw new ApiError(500, "Something went wrong while generating token");
  }
};

const userRegister = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  if (!name || !password || !email) {
    return res.status(400).json({ message: "All field required" });
  }

  const existedUser = await User.findOne({ $or: [{ name }, { email }] });

  if (existedUser) {
    throw new ApiError(409, "user with this email or name is already existed");
  }

  const user = await User.create({
    name,
    email,
    password,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User register succesfully"));
});

const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const userFind = await User.findOne({ email });
  // console.log("User found:", userFind); // Debugging
  if (!userFind) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordMatched = await userFind.isPasswordCorrect(password);

  if (!isPasswordMatched) {
    throw new ApiError(401, "Invalid credentials");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    userFind._id
  );

  const loggedInUser = await User.findById(userFind._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
        },
        "User login successfully"
      )
    );
});

const Logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $set: {
      refreshToken: undefined,
    },
  });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logout succesfully"));
});

export { userRegister, Login, Logout };
