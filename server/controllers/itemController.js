const item = require('../models/item.js');

// creates a new item, saves it, returns it
const createItem = async (req, res) => {
  try {
    const { name, quantity, price, lowStockThreshold } = req.body;
    const newItem = new item({ name, quantity, price, lowStockThreshold });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// retrieves all items from the database
const getAllItems = async (req, res) => {
  try {
    const items = await item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// retrieves a single item by its ID
const getItemById = async (req, res) => {
  try {
    const Item = await item.findById(req.params.id);
    if (!Item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(Item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// updates an existing item by its ID
const updateItem = async (req, res) => {
  try {
    const { name, quantity, price, lowStockThreshold } = req.body;
    const updatedItem = await item.findByIdAndUpdate(
      req.params.id,
      { name, quantity, price, lowStockThreshold },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// deletes an item by its ID
const deleteItem = async (req, res) => {
  try {
    const deletedItem = await item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
};