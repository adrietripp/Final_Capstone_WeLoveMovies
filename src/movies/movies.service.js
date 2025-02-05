const db = require("../db/connection");

async function list(is_showing) {
  return db("movies")
    .select("movies.*")
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
    });
}

async function read(movie_id) {
  return db("movies").where({ movie_id }).first();
}

async function listReviews(movie_id) {
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

async function listTheaters(movie_id) {
  return db("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*")
    .where({ "mt.movie_id": movie_id });
}

module.exports = {
  list,
  read,
  listReviews,
  listTheaters,
};