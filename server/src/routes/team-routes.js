const Router = require("express").Router;
const TeamRouter = Router();

const {
  createTeam,
  searchTeam,
  joinPlayerTeam,
  findAllTeamPlayer,
  findAllPlayerOneTeam,
  getCostsByTeam,
  createCostsByTeam,
} = require("../controllers/team-controller");

TeamRouter.post("/", createTeam);
TeamRouter.post("/search", searchTeam);
TeamRouter.post("/joinPlayer", joinPlayerTeam);
TeamRouter.post("/findAllTeamPlayer", findAllTeamPlayer);
TeamRouter.post("/findPlayers", findAllPlayerOneTeam);
TeamRouter.post("/costsTeam", getCostsByTeam);
TeamRouter.post("/costsTeam/create", createCostsByTeam);

module.exports = TeamRouter;
