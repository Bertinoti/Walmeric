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

export const checkUserApi = async (user) => {
  const {data} = await axios.post("http://localhost:4000/api/checkuserapi", user)
  return data
};

export const getCurrentUser = async (token, email) => {
  var data = {
    email: email,
  };
  var config = {
    method: "post",
    url: "http://localhost:4000/api/users/getcurrentuser",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  return await axios(config)
  .then((response) => {
      if (response.status === 200) {
        return response.data.data
      }
      if(response.status === 209){
        throw Error (response.data.msg);
      }
    })
    .catch((error) => {
      return error.message
    })
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
