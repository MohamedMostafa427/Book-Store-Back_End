const booksModel = require('../models/books.model');
const Book = require('../models/books.model');
const User = require('../models/user.model');


const getAllBooks = async (req, res) => {
    console.log("njmjjj")
    try {
        const books = await Book.find({});
        res.status(200).json({ status: "Success" , data: books });
    } catch (error) {
        console.error("Error getting books:", error.message);
        res.status(500).json({  status: "Erorr" , message: "Server error" });
    }
};

const getBookById = async (req, res) => {
    try {
        const { bookId } = req.params; 
        

        const book = await Book.findOne({ bookId });

        if (!book) {
            return res.status(404).json({  status: "Erorr" , message: "Book not found" });
        }

        res.status(200).json({status: "Success" , data: book}); 
    } catch (error) {
        console.error("Error getting the book:", error.message);
        res.status(500).json({ status: "Erorr" , message: "Server error" });
    }
};
const getbookcat = async (req, res) => {
    try {
        const { cat } = req.body; 
        console.log("Category:", cat);

        const books = await booksModel.find({ genres: { $regex: cat, $options: 'i' } });

        console.log("Books found:", books.length);


        res.json({ status: "Success", data: books });
    } catch (error) {
        console.error("Error fetching books by category:", error.message);


        res.status(500).json({
            status: "Error",
            message: "An error occurred while fetching books. Please try again later."
        });
    }
};


const addToWishlist = async (req, res) => {
    try {
        const userId = req.user.id;  
        const { bookId } = req.body; 
 
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }

        if (user.purchasedBooks.includes(bookId)) {
            return res.status(400).json({ status: "Error", message: "Book already in wishlist" });
        }
        const book = await booksModel.findOne({bookId})
        
        user.wishlist.push( book );
        await user.save(); 

        
        return res.status(200).json({
            status: "Success",
            message: "Book added to wishlist successfully",
            purchasedBooks: user.purchasedBooks
        });
    } catch (error) {
        console.error("Error adding to wishlist:", error.message); 
        return res.status(500).json({ status: "Error", message: "Server error" });
    }
};  
const getWishlist = async (req, res) => {
    try {
        const userId = req.user.id; 

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: "Error" , message: "User not found" });
        }
        console.log(user.wishlist)
        return res.status(200).json({ status: "Success" , data: user.wishlist });
    } catch (error) {
        console.error("Error getting purchased list:", error.message);
        return res.status(500).json({ status: "Error" , message: "Server error" });
    }
};

const deleteFromWishlist = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { bookId } = req.body; 

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }

        const bookIndex = user.wishlist.findIndex(book => book.bookId === bookId);

        if (bookIndex === -1) {
            return res.status(400).json({ status: "Error", message: "Book not found in wishlist" });
        }

        user.wishlist.splice(bookIndex, 1); 

        await user.save();

        return res.status(200).json({
            status: "Success",
            message: "Book removed from wishlist successfully",
            wishlist: user.wishlist 
        });
    } catch (error) {
        console.error("Error removing from wishlist:", error.message);
        return res.status(500).json({ status: "Error", message: "Server error" });
    }
};

    const addToPurchasedList = async (req, res) => {
        try {
            const userId = req.user.id;  
            const { bookId } = req.body; 
     
            const user = await User.findById(userId);
            
            if (!user) {
                return res.status(404).json({ status: "Error", message: "User not found" });
            }
    
            if (user.purchasedBooks.includes(bookId)) {
                return res.status(400).json({ status: "Error", message: "Book already in wishlist" });
            }
            const book = await booksModel.findOne({bookId})
            console.log("lkmnkjbvbjknbnjkjnbnjnb;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;",book);
            
            user.purchasedBooks.push( book );
            await user.save(); 
    
            
            return res.status(200).json({
                status: "Success",
                message: "Book added to purchasedBooks successfully",
                purchasedBooks: user.purchasedBooks
            });
        } catch (error) {
            console.error("Error adding to wishlist:", error.message); 
            return res.status(500).json({ status: "Error", message: "Server error" });
        }
    };  
    

const getPurchasedList = async (req, res) => {
    try {
        const userId = req.user.id; 

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: "Error" , message: "User not found" });
        }
        console.log(user.purchasedBooks)
        return res.status(200).json({ status: "Success" , data: user.purchasedBooks });
    } catch (error) {
        console.error("Error getting purchased list:", error.message);
        return res.status(500).json({ status: "Error" , message: "Server error" });
    }
};



module.exports = {
    getAllBooks,
    getBookById,
    addToWishlist,
    getWishlist,
    addToPurchasedList,
    getPurchasedList,
    deleteFromWishlist,
    getbookcat
};
