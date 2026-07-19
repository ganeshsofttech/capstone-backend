const Order = require("../models/Order");
const Menu = require("../models/Menu");
// exports.createOrder = async (req, res) => {
//   const order = await Order.create({
//     ...req.body,
//     userId: req.user.id,
//   });

//   res.status(201).json(order);
// };

exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    let totalAmount = 0;

    for (const item of items) {
      const menuItem = await Menu.findById(item.menuId);

      if (!menuItem) {
        return res.status(404).json({
          message: "Menu item not found",
        });
      }

      totalAmount += menuItem.price * item.quantity;
    }

    const order = await Order.create({
      userId: req.user.id,
      items,
      totalAmount,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({
    userId: req.user.id,
  }).populate("items.menuId");

  res.json(orders);
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("userId");

  res.json(orders);
};

exports.updateStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    {
      new: true,
    },
  );

  res.json(order);
};
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      });
    }

    if (order.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        error: "Order already cancelled",
      });
    }

    order.status = "Cancelled";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
