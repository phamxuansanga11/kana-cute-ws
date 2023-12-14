import jwt from "jsonwebtoken";

const middlewareController = {
  verifyAccessToken: (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({
        message: "You are not logged in",
      });
      return;
    }
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        res.status(403).json({
          message: "Token is not valid",
        });
        return;
      }
      req.user = user;
      next();
    });
  },
};

export default middlewareController;
