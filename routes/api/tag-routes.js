const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [Product],
    });

    if (!allTags) {
      res.status(404).json({ message: "Tags not found" });
    } else {
      res.status(200).json(allTags);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({err});
  }
});

router.get("/", async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [Product],
    });

    if (!allTags) {
      res.status(404).json({ message: "Tags not found" });
    } else {
      res.status(200).json(allTags);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({err});
  }
});

router.post("/", async (req, res) => {
  try{
    const tag = await Tag.create(req.body)
    res.status(200).json(tag)
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Tag failed to upload" })
  }
});

router.put("/:id", async (req, res) => {
  try{
    const updatedTag = await Tag.update(
      { where: {
        id: req.params.id,
      },
    });

    if(!updatedTag) {
      res.status(404).json({ message: "No tag found with this id."})
    } else {
      res.status(200).json(updatedTag)
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id!" });
    } else {
      res.status(200).json({ message: "Tag deleted successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({err});
  }
});

module.exports = router;
