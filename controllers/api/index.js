const createController = require('../createController');

module.exports = {
  getStatus: createController(async (req, res) => {
    res.status(200).json({ status: 'Running' });
  }),
};
