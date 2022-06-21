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

const ORDER_FIELDS = gql`
  fragment orderFields on Order {
    _id
    orderDate
    orderCount
    orderPriceSum
    orderState
  }
`

const ORDER_ITEM_FIELDS = gql`
  fragment orderItemFields on OrderItem {
    _id
    itemCount
    itemName
    itemPrice
    itemPriceSum
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

const ADD_USER = gql`
  mutation($email:String, $pwd: String) {
    addUser(email: $email, pwd: $pwd)
  }
`

const GET_ME = gql`
  query {
    me {
      _id
      emails {
        address
      }
      profile {
        role
      }
    }
  }
`

const LOGIN_WITH_PASSWORD = gql`
  mutation($email: String, $pwd: String) {
    loginWithPassword(email: $email, pwd: $pwd) {
      authToken
      userId
    }
  }
`

const LOGOUT = gql`
  mutation {
    logout
  }
`

const UPDATE_USER_ROLE = gql`
  mutation($_id:ID, $role: String) {
    updateUserRole(_id: $_id, role: $role)
  }
`

const GET_USERS = gql`
  query {
    users {
      _id
      emails {
        address
      }
      profile {
        role
      }
    }
  }
`

const ADD_ORDER = gql`
  mutation($orderPriceSum: Int, $orderCount: Int, $orderItems: [OrderItemInput]) {
    addOrder(orderPriceSum: $orderPriceSum, orderCount: $orderCount, orderItems: $orderItems)
  }
`

const GET_ORDERS = gql`
  query {
    orders {
      ...orderFields
      orderItems {
        ...orderItemFields
      }
    }
  }
  ${ORDER_FIELDS}
  ${ORDER_ITEM_FIELDS}
`

const SUBSCRIBE_ORDER = gql`
  subscription($authToken: String) {
    orderAdded(authToken: $authToken) {
      ...orderFields
      orderItems {
        ...orderItemFields
      }
    }
  }
  ${ORDER_FIELDS}
  ${ORDER_ITEM_FIELDS}
`

const CHECK_ORDER = gql`
  mutation($_id: ID, $orderState: Boolean) {
    checkOrder(_id: $_id, orderState: $orderState)
  }
`

export {
  ITEM_FIELDS,
  ORDER_FIELDS,
  ORDER_ITEM_FIELDS,
  GET_CATEGORIES,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  GET_ITEMS,
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  UPLOAD_FILE,
  ADD_USER,
  GET_ME,
  GET_USERS,
  LOGIN_WITH_PASSWORD,
  LOGOUT,
  UPDATE_USER_ROLE,
  ADD_ORDER,
  GET_ORDERS,
  SUBSCRIBE_ORDER,
  CHECK_ORDER,
}