const express = require('express');
const router = express.Router();
const crudController = require('../controllers/crudController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/items', authenticateToken, crudController.getAllItems);
router.post('/items', authenticateToken, crudController.createItem);
router.put('/items/:id', authenticateToken, crudController.updateItem);
router.delete('/items/:id', authenticateToken, crudController.deleteItem);

module.exports = router;
