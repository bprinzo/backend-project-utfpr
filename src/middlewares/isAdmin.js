module.exports = (request, response, next) => {
  request.isAdmin === true
    ? next()
    : response.status(400).send({ error: "User is not an administrator" });
};
