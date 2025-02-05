const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// TODO: Add your routes here
router.route("/:reviewId")
  .put(controller.update) // PUT /reviews/:reviewId
  .delete(controller.destroy) // DELETE /reviews/:reviewId
  .all(methodNotAllowed);
module.exports = router;
