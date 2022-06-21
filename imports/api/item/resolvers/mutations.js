import { Categories, Items } from '../collections';
import { getCurrentDate } from '/imports/utils/formatDate';
import processUpload from '/imports/utils/fileUpload';

const mutations = {
  async addCategory(_, { categoryName }) {
    const categoryValue = {
      categoryName: categoryName,
    }

    try {
      const result = await Categories.insert(categoryValue);
      return result;
    }
    catch(error) {
      throw `addCategory Error: ${error}`;
    }
  },
  async updateCategory(_, { _id, categoryName }) {
    const categoryValue = {
      categoryName: categoryName,
    }

    try {
      const result = await Categories.update(
        {_id: _id},
        {$set: categoryValue}
      )
      return result;
    }
    catch(error) {
      throw `updateCategory Error: ${error}`;
    }
  },
  async deleteCategory(_, { _id }) { // 오류
    try {
      const result = await Categories.remove(_id);
      return result;
    }
    catch(error) {
      throw `deleteCategory Error: ${error}`
    }
  },
  async addItem(_, { itemName, itemPrice, itemImage, itemCategoryId }) {
    const newDate = getCurrentDate();

    const itemValues = {
      itemName: itemName,
      itemPrice: itemPrice,
      itemImage: itemImage,
      createdAt: newDate,
      itemCategoryId: itemCategoryId,
    }

    try {
      const result = await Items.insert(itemValues);
      itemValues._id = result;

      return itemValues;
    }
    catch(error) {
      throw `addItem Error: ${error}`;
    }
  },
  async updateItem(_, { _id, itemName, itemPrice, itemImage, itemCategoryId }) {

    let itemValues = {
      itemName: itemName,
      itemPrice: itemPrice,
      itemImage: itemImage,
      itemCategoryId: itemCategoryId,
    }

    try {
      await Items.update(
        {_id, _id},
        {$set: itemValues},
      )

      itemValues._id = _id;

      return itemValues;
    }
    catch(error) {
      throw `updateItem Error: ${error}`;
    }
  },
  async deleteItem(_, { _id }) {
    try {
      await Items.remove(_id);
      return _id;
    }
    catch(error) {
      `deleteItem Error: ${error}`;
    }
  },
  async uploadFile(_, {file}) {
    try {
      const upload = await processUpload(file);
      return upload;
    }
    catch(error) {
      throw `upload file error: ${error}`;
    }
  }
}

export default mutations;