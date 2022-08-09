const endpoint = "/api";

const { verifyPermissionApi } = require("../middleware/verifyPermisssionApi");

const UserRouter = require("./user-routes");
// const EventRouter = require("./event-routes");

const routes = function (server) {
  server.use(verifyPermissionApi);
  server.use(`${endpoint}/users`, UserRouter);
  // server.use(`${endpoint}/event`, EventRouter);
};

module.exports = routes;
