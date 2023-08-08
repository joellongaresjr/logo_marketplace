// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo one specific Category
// Defining the relationship between Product & Category Model 
Product.belongsTo(Category, {
  foreignKey: 'category_id', // passing an object as a second argument
  // relationshiop establishes that every product will have a 'category_id' in their table
  // storing the ID of the category that the product belongs to
  onDelete: 'CASCADE',
});

// Categories have many Products
// Defining the relationsip between Category model & Product Model
// One category can have many (hasMany) products associated with it
Category.hasMany(Product, {
  foreignKey: 'category_id', // passing an object as a second agruement
  // everytime we refer to the product table, this emplies that it in foreign key column will be'category_id' 
  onDelete: 'CASCADE', 
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id', 
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignkey: 'tag_id',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
