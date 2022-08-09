import axios from "axios";

const headersAPI = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const createUserApi = (token, user) => {
  axios
    .post("http://localhost:4000/api/users/signup", user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.status === 201)
    .catch((error) => error.response);
};

export const createTeam = (token, team) => {
  axios
    .post("http://localhost:4000/api/teams/", team, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.status === 201)
    .catch((error) => error.response);
};

export const getAllPlayersOneTeam = async (token, teamName) => {
  const response = await axios.post(
    "http://localhost:4000/api/teams/findPlayers",
    { teamName: teamName },
    headersAPI(token)
  );
  return response.data;
};

export const searchTeam = async (token, team) => {
  return await axios
    .post("http://localhost:4000/api/teams/search", team, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res)
    .catch((error) => error.response);
};

export const findAllTeamsUser = async (token) => {
  var config = {
    method: "post",
    url: "http://localhost:4000/api/teams/findAllTeamPlayer",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => error.response);
};

export const joinUserToTeam = (token, teamName) => {
  var data = JSON.stringify({
    teamName: teamName,
  });

  var config = {
    method: "post",
    url: "http://localhost:4000/api/teams/joinPlayer",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then((response) => response.data)
    .catch((error) => error.response);
};

const timeId = () => {
  const today = new Date();
  const timeid = Date.now(today);
  // console.log(timeid)
  return timeid;
};

export const createEvent = (token, UserEvent) => {
  var config = {
    method: "post",
    url: "http://localhost:4000/api/event/",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: UserEvent,
  };

  axios(config)
    .then((res) => res.status === 201)
    .catch((error) => error.response);
};

export const allUserEvents = async (token) => {
  var config = {
    method: "post",
    url: "http://localhost:4000/api/event/findAllUserEvent",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  return await axios(config)
    .then((res) => res.data.data[0].userData)
    .catch((error) => error.response);
};

export const deleteEvent = async (token, eventId) => {
  var data = JSON.stringify({
    eventId: eventId,
  });

  var config = {
    method: "delete",
    url: "http://localhost:4000/api/event/deleteEvent",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then((res) => res.status === 204)
    .catch((error) => error.response);
};
export const getAllCostsOneTeam = async (token, team) => {
  const response = await axios.post(
    "http://localhost:4000/api/teams/costsTeam",
    { teamName: team },
    headersAPI(token)
  );

  return response.data;
};

export const getUpdatePayment = async (token, id, payment) => {
  const response = await axios.post(
    "http://localhost:4000/api/users/checkPayment",
    { id: id, payment: payment },
    headersAPI(token)
  );

  return response.data;
};

export const createCostTeam = async (token, teamName, cost) => {
  const response = await axios.post(
    "http://localhost:4000/api/teams/costsTeam/create",
    { teamName: teamName, cost: cost },
    headersAPI(token)
  );

  return response.data;
};
