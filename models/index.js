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
// Relationship establishes a many-to-many connection between Products and Tags through our ProductTag table.
// A product can have multiple Tags, and Tag can be associated with multiple Products
Product.belongsToMany(Tag, {
  through: ProductTag, // specifiying our tabel for our many to many relationship (ProductTag)
  foreignKey: 'product_id', // refering to the foreign key that links to the 'Product'
});

// Tags belongToMany Products (through ProductTag)
// Similar to the previous relationshiop, this also establishes a many - to - many relationship (Tag & Products)
// A Tag can have multiple assocaited Products, and a Product can be asscoiated with multipole Tags
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignkey: 'tag_id', // refering to the foreign key that links to the 'Tag'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
