const mongoose = require( 'mongoose' );

// Equivalent to "Schema = mongoose.Schema"
const { Schema } = mongoose;

const orderItemsSchema = new Schema({
  itemID: {
    type: String,
    required: true,
    unique: false
  },
  quantity: {
    type: Number,
    required: true,
    unique: false
  }
}, { _id: false });


const ordersSchema = new Schema({

  // userID, orderNumber, and productID should be a primary key together
  userID: {
    type: String,
    required: true,
    unique: false
  },
  orderNumber: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  items: [ orderItemsSchema
    /* {
      itemID: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
      },
      quantity: {
        type: Number,
        required: true,
        unique: false
      }
    } */
   ],
  totalPrice: {
    type: Number,
    required: true,
    unique: false
  }
});
const orders = mongoose.model( 'orders', ordersSchema );

module.exports = orders;
