import Ranking from "../models/Ranking.model.js";
import { rankingErrors } from "../utils/ranking.errors.js";

// CREATE NEW LEVEL RANKING
export const createRanking = (req, res, next) => {
  const { level, score, userId, userPseudo } = req.body;
  if (
    level === undefined ||
    score === undefined ||
    userId === undefined ||
    userPseudo === undefined
  ) {
    res.status(400).send({
      status: 400,
      error: "Body request requires level, score, userId and userPseudo data",
    });
  } else {
    const ranking = new Ranking({
      level: parseInt(level),
      score: parseInt(score),
      userId: userId,
      userPseudo: userPseudo,
    });

    ranking
      .save()
      .then((rank) => {
        res.status(201).json({
          rankingId: rank._id,
          status: 201,
          message: "New ranking level has been registered",
        });
      })
      .catch((error) =>
        res.status(400).send({
          status: 400,
          error: rankingErrors(error),
        })
      );
  }
};

// GET ALL LEVELS RANKING
export const getAllRanking = (req, res, next) => {
  Ranking.find()
    .select("-createdAt -updatedAt -__v")
    .then((ranks) =>
      res.status(200).json({
        data:
          ranks.length === 0 ? null : ranks.sort((a, b) => a.level - b.level),
        status: 200,
        message: "Get all rankings request success",
      })
    )
    .catch((err) =>
      res
        .status(500)
        .json({ status: 500, error: err.message ? err.message : err })
    );
};

// GET ONE LEVEL RANKING
export const getOneRanking = (req, res, next) => {
  Ranking.findOne({ _id: req.params.id })
    .then((rank) => {
      if (rank === null) {
        throw Error(`Ranking with ID : ${req.params.id} not found`);
      } else {
        res.status(200).json({
          data: rank,
          status: 200,
          message: `Get ranking data with id ${req.params.id} request success`,
        });
      }
    })
    .catch((err) =>
      res
        .status(400)
        .json({ status: 400, error: err.message ? err.message : err })
    );
};

// FILTER RANKING BY USER LEVEL (send response data null if filter return no match)
export const filterRankingByLevel = (req, res, next) => {
  const { level } = req.body;

  if (level === undefined) {
    res.status(400).json({ status: 400, error: "Level data is required" });
  } else {
    Ranking.find()
      .select("-createdAt -updatedAt -__v")
      .then((rankings) => {
        const rankingFiltered = rankings.filter(
          (item) => item.level === parseInt(level)
        );
        res.status(200).json({
          data: rankingFiltered.length === 0 ? null : rankingFiltered[0],
          status: 200,
          message: `Get ranking for level ${level} success`,
        });
      })
      .catch((err) =>
        res
          .status(500)
          .json({ status: 500, error: err.message ? err.message : err })
      );
  }
};

// UPDATE ONE LEVEL RANKING
export const updateRanking = (req, res, next) => {
  const { score, userId, userPseudo } = req.body;

  if (score === undefined || userId === undefined || userPseudo === undefined) {
    return res.status(400).json({
      status: 400,
      error: `Body request requires score, userId and userPseudo data`,
    });
  } else {
    Ranking.findOne({ _id: req.params.id })
      .then((rank) => {
        if (rank === null) {
          throw Error(`Ranking with id : ${req.params.id} not found`);
        } else {
          if (rank.score > parseInt(score)) {
            throw Error(
              `Ranking score request must be greater than ranking score already registered`
            );
          } else {
            rank.score = parseInt(score);
            rank.userId = userId;
            rank.userPseudo = userPseudo;

            rank
              .save()
              .then((rankUpdated) =>
                res.status(200).json({
                  data: rankUpdated,
                  status: 200,
                  message: `Ranking with id : ${req.params.id} has been successfully updated`,
                })
              )
              .catch((err) =>
                res
                  .status(500)
                  .json({ status: 500, error: err.message ? err.message : err })
              );
          }
        }
      })
      .catch((err) =>
        res
          .status(400)
          .json({ status: 400, error: err.message ? err.message : err })
      );
  }
};

// DELETE ONE LEVEL RANKING
export const deleteRanking = (req, res, next) => {
  Ranking.findOneAndDelete({ _id: req.params.id })
    .then((rank) => {
      if (rank === null) {
        throw Error(`Ranking with id : ${req.params.id} not found`);
      } else {
        res
          .status(200)
          .json({ status: 200, message: "Ranking successfully deleted" });
      }
    })
    .catch((err) =>
      res
        .status(400)
        .json({ status: 400, error: err.message ? err.message : err })
    );
};
