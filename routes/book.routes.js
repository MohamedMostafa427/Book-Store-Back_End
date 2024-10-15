const express = require("express");
const { getAllBooks,
     getBookById,
     addToWishlist, 
     getWishlist,
     deleteFromWishlist,
     addToPurchasedList,
     getPurchasedList, 
     getbookcat}
      = require("../controler/books.controler");

const authenticate = require("../middlewares/authMiddleware");
const router = express.Router()


router.route("/getAllBooks")
                .get( authenticate, getAllBooks )

router.route("/getBooksByCat/")
                .get( authenticate, getbookcat )

router.route("/getAllBooks/:bookId")
                .get( authenticate , getBookById )

router.route("/Wishlist")
                .post( authenticate , addToWishlist )
                .get( authenticate , getWishlist )
                .delete( authenticate , deleteFromWishlist )

router.route( "/PurchasedList/" )
                .post( authenticate , addToPurchasedList )
                .get( authenticate , getPurchasedList )

router.route( "/GetBooksByCat/" )
                .post( authenticate , addToPurchasedList )
                .get( authenticate , getPurchasedList )
                
                

module.exports = router