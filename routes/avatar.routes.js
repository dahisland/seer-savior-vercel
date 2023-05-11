import express from "express";
import {
  getAllAvatars,
  getOneAvatar,
  createAvatar,
  updateAvatar,
  deleteAvatar,
  filterAvatarsByLevel,
} from "../controllers/avatar.controller.js";
import {
  requireAdminToken,
  requireToken,
} from "../middleware/auth.middleware.js";
import { requireValidObjectID } from "../middleware/objectID.middleware.js";

const router = express.Router();

// Requires admin role

router.get("/", requireAdminToken, getAllAvatars); // Get all avatars
router.get("/:id", requireValidObjectID, requireAdminToken, getOneAvatar); // Get one avatar by id
router.post("/", requireAdminToken, createAvatar); // Post a new avatar
router.put("/:id", requireValidObjectID, requireAdminToken, updateAvatar); // Modify one avatar by id
router.delete("/:id", requireValidObjectID, requireAdminToken, deleteAvatar); // Delete one avatar by id

// Requires connected user (user with token)
router.post("/filter-avatars", requireToken, filterAvatarsByLevel); // Filter avatars by user level

export default router;
