const Item = require('../models/Item');

exports.getAllItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

exports.createItem = async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.status(201).json(newItem);
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedItem);
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  await Item.findByIdAndDelete(id);
  res.status(204).send();
};
