const { User, Team } = require("../models");

async function createTeam(req, res, next) {
  const { teamName, logo, city, country } = req.body;

  try {
    const user = await User.findOne({ uid: req.user.uid });
    const foundTeam = await Team.find({ name: teamName });
    if (foundTeam.lenght > 0) {
      return res.status(302).send({ message: "Team already exists" });
    }

    const newTeam = await Team.create({
      name: teamName,
      captain: user._id,
      logo: logo,
      city: city,
      country: country,
      players: user._id,
    });

    res.status(201).send({ data: newTeam });
  } catch (error) {
    next(error);
  }
}

async function searhTeam(req, res, next) {
  const { teamName } = req.body;
  const reg = eval(`/^${teamName}*/i`);
  try {
    const team = await Team.find({ name: { $regex: reg } });
    res.status(200).send(team);
  } catch (error) {
    next(error);
  }
}

async function joinPlayerTeam(req, res, next) {
  const { teamName } = req.body;

  try {
    const team = await Team.findOne({ name: teamName }).populate("players");
    const foundPlayer = team.players
      .map((player) => player.uid)
      .includes(req.user.uid);
    if (!foundPlayer) {
      const playerId = await User.findOne({ uid: req.user.uid }).select("id");
      const updateTeam = await Team.findOneAndUpdate(
        { name: teamName },
        { $push: { players: playerId } },
        { new: true }
      );
      res.status(200).send(updateTeam);
    }
  } catch (error) {
    next(error);
  }
}

async function findAllTeamPlayer(req, res, next) {
  const { uid } = req.user;
  try {
    const playerId = await User.findOne({ uid: uid }).select("_id");
    const allTeams = await Team.find({ players: playerId._id });
    res.status(200).send({ allTeams: allTeams, playerId: playerId });
  } catch (error) {
    next(error);
  }
}

async function findAllPlayerOneTeam(req, res, next) {
  const { teamName } = req.body;

  try {
    const allPlayers = await Team.findOne({ name: teamName })
      .populate("players")
      .select("players");
    res.status(200).send(allPlayers);
  } catch (error) {
    next(error);
  }
}

async function getCostsByTeam(req, res, next) {
  const { teamName } = req.body;

  try {
    const costsTeam = await Team.findOne({ name: teamName }).select("costs");
    res.status(200).send(costsTeam);
  } catch (error) {
    next(error);
  }
}

async function createCostsByTeam(req, res, next) {
  const { teamName, cost } = req.body;

  try {
    const costsTeam = await Team.findOneAndUpdate(
      { name: teamName },
      { $push: { costs: cost } },
      { new: true }
    );
    res.status(200).send(costsTeam);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createTeam: createTeam,
  searchTeam: searhTeam,
  joinPlayerTeam: joinPlayerTeam,
  findAllTeamPlayer,
  findAllPlayerOneTeam,
  getCostsByTeam,
  createCostsByTeam,
};
//jeff eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ2NDExN2FjMzk2YmM3MWM4YzU5ZmI1MTlmMDEzZTJiNWJiNmM2ZTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbG9naW5hdXRoLWRldmVsb3BtZW50IiwiYXVkIjoibG9naW5hdXRoLWRldmVsb3BtZW50IiwiYXV0aF90aW1lIjoxNjQ4ODIzNzYyLCJ1c2VyX2lkIjoiV0lzRklaQnFURVhUZTVETEkzR0lETFhZRWRQMiIsInN1YiI6IldJc0ZJWkJxVEVYVGU1RExJM0dJRExYWUVkUDIiLCJpYXQiOjE2NDg4MjM3NjIsImV4cCI6MTY0ODgyNzM2MiwiZW1haWwiOiJqZWZmQG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImplZmZAbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.lnMWcbiMLWSNaRd613x7YTmrSnnFxgIxypE4BlkBsS5MCy1_Krs4z-nKZ0W9mugfxSLVLqKo2B-DdZzyYPmwUBC0hEHdRti0hyPYpD-Vm4rxKrW_xMAG6uHxVXzhdAccx2mFntwrsetTlC3I7QTyDjI5Vg-rQZrHLGVAxGoZ0fFga88a7613ueEegPemgPM3sF_lNuiqLY1fJF2fPR1InY7oJBmOVJojG491Eo6tHqR7MV5xHkBrIJ8BUEpeUGqgv6gYdD47c6xq4c5mEpP6aDcmZ9btE_OcDUrKMy0ol9xjkFJoSNKj7r-GK3IJ1uGeb2c_PYj2n7pCLc1yXfwEDg

// pepe eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ2NDExN2FjMzk2YmM3MWM4YzU5ZmI1MTlmMDEzZTJiNWJiNmM2ZTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbG9naW5hdXRoLWRldmVsb3BtZW50IiwiYXVkIjoibG9naW5hdXRoLWRldmVsb3BtZW50IiwiYXV0aF90aW1lIjoxNjQ4ODIzNjkyLCJ1c2VyX2lkIjoieFNSVVZGU3hPS2F0dmIyT09YOWV0Mm1Ua0dyMSIsInN1YiI6InhTUlVWRlN4T0thdHZiMk9PWDlldDJtVGtHcjEiLCJpYXQiOjE2NDg4MjM2OTIsImV4cCI6MTY0ODgyNzI5MiwiZW1haWwiOiJwZXBlQG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInBlcGVAbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.nF74yxYiNRsh0jCnFCv1DoTUXU8KvKaHW-utnb5_sQw9kF8o1P77i7Cjw1QuH2wRQHaWRqR47ByBDixxXNPoS8v3-1OnescWVX04HGfXxyLvOBdM6sLNOr9v1krgpLjgc9COdP4bE4zqBBffnXGZGsVnEFWUB-p_fO5NzhxLf733rnOsZKjANYHU_vUfvS3vOjhYdzJigTq7hyvUX3XVrwDZPI1hslBidZHQiFV0PG-gSCcAdttLuTVWgUm799BFbRjxRQcvq5BWCkcYu2rG5Dib54Vvt8VwzcNbZkNnPuDgWz5zXBHEfW_xdMgRU5uKX1ROiUtU_cAZrtQIaNAFYA
