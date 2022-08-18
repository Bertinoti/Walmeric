const endpoint = "/api";

const { verifyPermissionApi } = require("../middleware/verifyPermisssionApi");

const UserRouter = require("./user-routes");
const VerifyRouter = require("./verification-routes");
const InviteRouter = require("./friend-invites-routes");
// const EventRouter = require("./event-routes");

const routes = function (server) {
  server.use(`${endpoint}`, VerifyRouter);
  server.use(verifyPermissionApi);
  server.use(`${endpoint}/users`, UserRouter);
  server.use(`${endpoint}/invite`, InviteRouter);
  // server.use(`${endpoint}/event`, EventRouter) P@ssw0rd;
};

module.exports = routes;
