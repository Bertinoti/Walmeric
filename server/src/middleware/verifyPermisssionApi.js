const { authFirebase } = require("../firebase/firebase");

async function verifyPermissionApi(req, res, next) {

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    // the authorization token is coming in as:
    // Bearer eyJhb.....
    const bearerToken = req.headers.authorization.substr(7);
    try {
      const userClaims = await authFirebase.verifyIdToken(bearerToken);

      const { email, uid } = userClaims;

      req.user = {
        email: email,
        uid: uid,
      };

      next();
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(401).send({
      data: null,
      error: "Unauthorized",
    });
  }
}

module.exports = {
  verifyPermissionApi: verifyPermissionApi,
};
