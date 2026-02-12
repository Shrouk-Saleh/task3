const Book =require("../models/Book");
const express = require("express");
const router = express.Router();

router.post("/",async(req,res)=>{
    try{
       const {title,author}=req.body;
          if (!title || !author) {
      return res.status(400).json({
        success: false,
        message: "title and author are required"
      });
    }

    const book = await Book.create({
      title,
      author
    });


      res.status(201).json({
         msg:"book created",
         data: book
      })
    
    }
 catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
})
router.get("/", async (req, res) => {
  try {
    const book = await Book.find().populate('author');

    res.json({
      success: true,
      count: book.length,
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "book not found"
      });
    }

    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
module.exports = router;
