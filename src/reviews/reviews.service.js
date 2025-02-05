const db = require("../db/connection");

async function destroy(reviewId) {
  return db("reviews").where({ review_id: reviewId }).del();
}

async function list(movie_id) {
  const reviews = await db("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.movie_id",
      "r.critic_id",
      "r.created_at",
      "r.updated_at",
      "c.critic_id",
      "c.preferred_name",
      "c.surname",
      "c.organization_name",
      "c.created_at as critic_created_at",
      "c.updated_at as critic_updated_at"
    )
    .where({ "r.movie_id": movie_id });

  return reviews.map((review) => ({
    ...review,
    critic: {
      critic_id: review.critic_id,
      preferred_name: review.preferred_name,
      surname: review.surname,
      organization_name: review.organization_name,
      created_at: review.critic_created_at,
      updated_at: review.critic_updated_at,
    },
  }));
}

async function read(reviewId) {
  return db("reviews").where({ review_id: reviewId }).first();
}

async function readWithCritic(reviewId) {
  const review = await db("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.movie_id",
      "r.critic_id",
      "r.created_at",
      "r.updated_at",
      "c.critic_id",
      "c.preferred_name",
      "c.surname",
      "c.organization_name",
      "c.created_at as critic_created_at",
      "c.updated_at as critic_updated_at"
    )
    .where({ "r.review_id": reviewId })
    .first();

  if (!review) return null;

  return {
    ...review,
    critic: {
      critic_id: review.critic_id,
      preferred_name: review.preferred_name,
      surname: review.surname,
      organization_name: review.organization_name,
      created_at: review.critic_created_at,
      updated_at: review.critic_updated_at,
    },
  };
}

async function update(review) {
  return db("reviews")
    .where({ review_id: review.review_id })
    .update(review)
    .then(() => readWithCritic(review.review_id));
}

module.exports = {
  destroy,
  list,
  read,
  update,
  readWithCritic,
};