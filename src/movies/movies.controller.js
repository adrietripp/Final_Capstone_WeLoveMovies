const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie cannot be found." });
}

async function list(req, res) {
  const { is_showing } = req.query;
  const data = await service.list(is_showing);
  res.json({ data });
}

async function read(req, res) {
  res.json({ data: res.locals.movie });
}

async function listReviews(req, res) {
  const { movieId } = req.params;
  const data = await service.listReviews(movieId);
  res.json({ data });
}

async function readTheaters(req, res) {
  const { movieId } = req.params;
  const data = await service.listTheaters(movieId);
  res.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  listReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviews)],
  readTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readTheaters)],
};
