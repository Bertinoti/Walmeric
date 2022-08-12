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
  console.log('entro' )
  const {data, status} = await axios.post("http://localhost:4000/api/users/checkuserapi", user)
  return data
};

export const getCurrentUser = async (token, email) => {
  var data = JSON.stringify({
    email: email,
  });
  var config = {
    method: "get",
    url: "http://localhost:4000/api/users/getcurrentuser",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  return await axios(config)
  .then((response) => {
      console.log(response);
      if (response.status === 200) {
        return response.data.data
      }
      if(response.status === 209){
        console.log(response);
        throw Error (response.data.msg);
      }
    })
    .catch((error) => {
      console.log(error.message);
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
