import { gql } from '@apollo/client/core';

const ITEM_FIELDS = gql`
  fragment itemFields on Item {
    _id
    itemName
    itemPrice
    itemCategoryId
    itemImage
  }
`

const GET_CATEGORIES = gql`
  query {
    categories {
      _id
      categoryName
    }
  }
`

const ADD_CATEGORY = gql`
  mutation($categoryName: String) {
    addCategory(categoryName: $categoryName)
  }
`

const DELETE_CATEGORY = gql`
  mutation($_id: ID) {
    deleteCategory(_id: $_id)
  }
`

const UPDATE_CATEGORY = gql`
  mutation($_id: ID, $categoryName: String) {
    updateCategory(_id: $_id, categoryName: $categoryName)
  }
`

const GET_ITEMS = gql`
  query($pageNumber: Int, $itemCategoryId: ID, $search: String) {
    itemPageCount(itemCategoryId: $itemCategoryId, search: $search),
    items(pageNumber: $pageNumber, itemCategoryId: $itemCategoryId, search: $search) {
      ...itemFields
    }
  }
  ${ITEM_FIELDS}
`

const ADD_ITEM = gql`
  mutation($itemName: String, $itemPrice: Int, $itemImage: String, $itemCategoryId: ID) {
    addItem(itemName: $itemName, itemPrice: $itemPrice, itemImage: $itemImage, itemCategoryId: $itemCategoryId) {
      ...itemFields
    }
  }
  ${ITEM_FIELDS}
`

const UPDATE_ITEM = gql`
  mutation($_id: ID, $itemName: String, $itemPrice: Int, $itemImage: String, $itemCategoryId: ID) {
    updateItem(_id: $_id, itemName: $itemName, itemPrice: $itemPrice, itemImage: $itemImage, itemCategoryId: $itemCategoryId) {
      ...itemFields
    }
  }
  ${ITEM_FIELDS}
`

const DELETE_ITEM = gql`
  mutation($_id: ID) {
    deleteItem(_id: $_id)
  }
`

const UPLOAD_FILE = gql`
  mutation($file: Upload) {
    uploadFile(file: $file) {
      fileName
      fileType
      filePath
    }
  }
`

export {
  ITEM_FIELDS,
  GET_CATEGORIES,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  GET_ITEMS,
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  UPLOAD_FILE,
}