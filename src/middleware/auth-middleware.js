import { prismaClient } from "../application/database.js";

export const authMiddleware = async (req, res, next) => {
  console.log("AuthMiddleware HIT on", req.method, req.url); // 👀 debug

  const token = req.get("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({
        errors: "Unauthorized",
      })
      .end();
  } else {
    const user = await prismaClient.user.findFirst({
      where: {
        token: token,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({
          errors: "Unauthorized",
        })
        .end();
    } else {
      req.user = user;
      next();
    }
  }
};
