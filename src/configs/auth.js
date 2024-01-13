//exportando o jwt contendo o secret e o tempo de expiração
module.exports = {
  jwt: {
    secret: process.env.AUTH_SECRET || "default",
    expiresIn: "1d",
  },
};
