const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
  try{
    let allCategories = await Category.findAll({
      include: [Product]
    });
    if (!allCategories) {
      res.send({"message": "categories not found"})
    } 
    console.log(allCategories)
    res.json(allCategories);
  } catch(err) {
    console.log(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [Product],
    });

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.status(200).json(category);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const category = await Category.create({
      category_name: req.body.category_name 
    });

    res.status(201).json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Category failed to upload." });
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(
      { category_name: req.body.category_name },
      { where: {
          id: req.params.id,
        },
      });

    if (!updatedCategory) {
      res.status(404).json({ message: "No category found with this id."});
    } else {
      res.status(200).json({ message: "Category updated successfully."});
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating the category."});
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  });

module.exports = router;
