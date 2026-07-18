const Menu = require("../models/Menu");

/**
 * GET ALL MENU ITEMS
 * /api/menu
 */
exports.getMenus = async (req, res) => {
  try {
    const menus = await Menu.find();

    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET MENU BY ID
 * /api/menu/:id
 */
exports.getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * SEARCH / FILTER MENU
 * /api/menu/search?keyword=burger
 * /api/menu/search?category=Fast Food
 */
exports.searchMenu = async (req, res) => {
  try {
    const { keyword, category } = req.query;

    const query = {};

    if (keyword) {
      query.name = {
        $regex: keyword,
        $options: "i",
      };
    }

    if (category) {
      query.category = category;
    }

    const menus = await Menu.find(query);

    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * CREATE MENU ITEM
 * ADMIN ONLY
 */
exports.createMenu = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      image,
      availability,
    } = req.body;

    const menu = await Menu.create({
      name,
      description,
      price,
      category,
      image,
      availability,
    });

    res.status(201).json({
      success: true,
      data: menu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * UPDATE MENU ITEM
 * ADMIN ONLY
 */
exports.updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    const updatedMenu = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: updatedMenu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * DELETE MENU ITEM
 * ADMIN ONLY
 */
exports.deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    await Menu.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};