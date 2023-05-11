import express from "express";
import { requireToken } from "../middleware/auth.middleware.js";
import {
  getAllRanking,
  getOneRanking,
  createRanking,
  updateRanking,
  deleteRanking,
  filterRankingByLevel,
} from "../controllers/ranking.controller.js";
import { requireValidObjectID } from "../middleware/objectID.middleware.js";

const router = express.Router();

// Requires connected user (user with token)
router.post("/", requireToken, createRanking); // Post a new level ranking
router.put("/:id", requireValidObjectID, requireToken, updateRanking); // Modify an existing level ranking
router.delete("/:id", requireValidObjectID, requireToken, deleteRanking); // Delete an existing level ranking
router.post("/filter-ranking", requireToken, filterRankingByLevel); // Filter ranking by user level

// No specific requirements
router.get("/", getAllRanking); // Get all levels ranking
router.get("/:id", requireValidObjectID, getOneRanking); // Get one level ranking by id

export default router;
