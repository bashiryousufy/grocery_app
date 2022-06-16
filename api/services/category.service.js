const { category } = require('../models/category.model');
const { MONGO_DB_CONFIG } = require('/config/app.config');

async function createCategory(params, callback) {
  if (!params.categoryname) {
    return callback(
      {
        message: 'Category Name Required',
      },
      ''
    );
  }

  const model = new category(params);
  model
    .save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function getCategories(params, callback) {
  const categoryName = params.categoryName;

  var condition = categoryName
    ? {
        categoryName: { $regex: new RegExp(categoryName), $options: 'i' },
      }
    : {};

  let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.pageSize;
  let page = (Math.abs(params.page) || 1) - 1;

  category
    .find(condition, 'categoryName categoryImage')
    .limit(perPage)
    .skip(perPage * page)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}
