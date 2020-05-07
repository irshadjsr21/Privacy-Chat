const express = require('express');
const router = express.Router();

const controller = require('../../controllers/api/index');

router.get('/status', controller.getStatus);

module.exports = router;
