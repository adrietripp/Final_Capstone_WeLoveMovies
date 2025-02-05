const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Middleware: Check if the review exists
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);

  if (!review) {
    return next({ status: 404, message: "Review cannot be found." });
  }

  res.locals.review = review;
  next();
}

// DELETE /reviews/:reviewId
async function destroy(req, res, next) {
  await service.destroy(res.locals.review.review_id);
  res.sendStatus(204);
}

// PUT /reviews/:reviewId (Update review)
async function update(req, res, next) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };

  await service.update(updatedReview);
  const updatedData = await service.readWithCritic(res.locals.review.review_id);
  res.json({ data: updatedData });
}

module.exports = {
  destroy: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
};
