const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const { validationReview, isLoggedIn , isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

// Post Route
router.post("/", isLoggedIn , validationReview,wrapAsync(reviewController.createReview));

// Delete Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports = router;