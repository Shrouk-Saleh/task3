const Author =require("../models/Author");
const express = require("express");
const router = express.Router();

router.post("/",async(req,res)=>{
    try{

    const {name}=req.body;
    if(!name){
      return res.status(400).json({
         msg:"name is missing",
      })
    }
      const author = await Author.create({
      name
      })
      res.status(201).json({
         msg:"Author is created",
         data: author
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
    const author = await Author.find();

    res.json({
      success: true,
      count: author.length,
      data: author
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
    const author = await Author.findByIdAndDelete(req.params.id);

    if (!author) {
      return res.status(404).json({
        success: false,
        message: "author not found"
      });
    }

    res.json({
      success: true,
      data: author
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
module.exports = router;
