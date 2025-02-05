const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// GET /theaters
async function list(req, res, next) {
  const theaters = await service.list();
  res.json({ data: theaters });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
