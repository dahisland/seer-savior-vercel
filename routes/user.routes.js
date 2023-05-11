import express from "express";
import {
  requireAdminToken,
  requireToken,
  requireUserTokenOrAdmin,
  requireNotConnected,
} from "../middleware/auth.middleware.js";
import {
  userLogin,
  userSignup,
  userLogout,
} from "../controllers/auth.controller.js";
import {
  getAllUsers,
  getOneUser,
  addLevelScore,
  updateLevelScore,
  updateUserLogins,
  updateUserEmail,
  updateUserPicture,
  deleteUser,
} from "../controllers/user.controller.js";
import { uploadUserPicture } from "../controllers/upload.controller.js";
import { uploadMiddleware } from "../middleware/upload.middleware.js";
import { requireValidObjectID } from "../middleware/objectID.middleware.js";
import { deleteFilesUploaded } from "../controllers/deleteFiles.controller.js";

const router = express.Router();

// -------------------------------------------------- //
// ------------ AUTHENTIFICATION ROUTES ------------- //
// -------------------------------------------------- //

// --- Requires disconnected user
router.post("/login", requireNotConnected, userLogin); // Login
router.post("/signup", requireNotConnected, userSignup); // Signup

// --- No specific requirements
router.get("/logout", userLogout); // Logout

// -------------------------------------------------- //
// ---------------- USER DATA ROUTES ---------------- //
// -------------------------------------------------- //

// --- Requires user connected (with token) or user with role admin

// Get one user by ID
router.get("/:id", requireValidObjectID, requireUserTokenOrAdmin, getOneUser);
// Update user scores by ID when new level has been won for the first time
router.patch(
  "/add-level-score/:id",
  requireValidObjectID,
  requireUserTokenOrAdmin,
  addLevelScore
);
// Update user scores by ID when user play a level already played before and broke his previous score
router.patch(
  "/update-level-score/:id",
  requireValidObjectID,
  requireUserTokenOrAdmin,
  updateLevelScore
);
// Update user email by ID
router.patch(
  "/update-email/:id",
  requireValidObjectID,
  requireUserTokenOrAdmin,
  updateUserEmail
);
// Update user picture by ID (only when user choose to update his picture with an unlocked avatar)
router.patch(
  "/update-picture/:id",
  requireValidObjectID,
  requireUserTokenOrAdmin,
  updateUserPicture
);
// Update user login identifiants by ID (email and password)
router.put(
  "/update-logins/:id",
  requireValidObjectID,
  requireUserTokenOrAdmin,
  updateUserLogins
);
// Delete user by ID
router.delete(
  "/:id",
  requireValidObjectID,
  requireUserTokenOrAdmin,
  deleteUser
);

// --- Requires user with role admin
router.get("/", requireAdminToken, getAllUsers); // Get all users

// -------------------------------------------------- //
// ------ USER DATA UPLOAD FILE PICTURE ROUTE ------- //
// -------------------------------------------------- //

// --- Requires user connected (with token) or user with role admin

// Update user picture by ID by uploading a custom picture file
router.post(
  "/upload-picture/:id",
  requireValidObjectID,
  requireUserTokenOrAdmin,
  uploadMiddleware,
  uploadUserPicture
);

// --- Requires user connected (with token)

// Delete files uploaded and update user.picture url
router.put(
  "/delete-pictures/:id",
  requireValidObjectID,
  requireUserTokenOrAdmin,
  deleteFilesUploaded
);

export default router;
