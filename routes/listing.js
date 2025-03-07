const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner , validationListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");

const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


router.route("/")
.get(wrapAsync(listingController.index)) //Index Route
.post(isLoggedIn, upload.single("listing[image]") ,validationListing , wrapAsync(listingController.createListing)); //Create Route


//Search Route
router.get("/search", wrapAsync(listingController.search));

//New Route
router.get("/new", isLoggedIn,listingController.newListing );

router.route("/:id")
.get(wrapAsync(listingController.showListing)) //Show Route
.put(isLoggedIn, isOwner, upload.single("listing[image]") , validationListing, wrapAsync(listingController.updateListing)) //Update Route
.delete(isLoggedIn,isOwner, wrapAsync(listingController.deleteListing)); //Delete Route

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));

module.exports = router;