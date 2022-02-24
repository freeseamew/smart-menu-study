import Orders from './collections';
import { getCurrentDate } from '/imports/utils/formatDate.js';

const queries = {
  async orders(_, args, context, info) {
    try {
      const result = await Orders.find({
        orderDate: {"$gte": new Date()}
      });
      return result;
    }
    catch(error) {
      throw `orders query Error: ${error}`;
    }
  }
}

const mutations = {
  async addOrder(_, { orderPriceSum, orderCount, orderItems}, {user}, info) {
    
    const newDate = getCurrentDate();

    let orderValues = {
      orderDate: newDate,
      orderPriceSum: orderPriceSum,
      orderCount: orderCount,
      orderItems: orderItems,
      orderState: false
    }

    try {
      const result = Orders.insert(orderValues);
      return result;
    }
    catch(error) {
      throw `order Add Error: ${error}`;
    }
  },
  async checkOrder(_, {_id, orderState}, {user}, info) {
    const changeOrderState = {
      orderState: !orderState
    }

    try {
      await Orders.update(
        {_id: _id},
        {$set: changeOrderState},
      )
    }
    catch(error) {
      throw `checkOrder Update Error: ${error}`;
    }
  }

}

const resolvers = {
  Query: queries,
  Mutation: mutations,
}

export default resolvers;