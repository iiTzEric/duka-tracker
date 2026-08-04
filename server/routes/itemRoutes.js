const item = require('../controllers/itemController');
const express = require('express');
const router = express.Router();

// POST request to create a new item
router.post('/', item.createItem);

// GET request to retrieve all items
router.get('/', item.getAllItems);

// GET request to retrieve a single item by ID
router.get('/:id', item.getItemById);

// PUT request to update an item by ID
router.put('/:id', item.updateItem);

// DELETE request to delete an item by ID
router.delete('/:id', item.deleteItem);

module.exports = router;