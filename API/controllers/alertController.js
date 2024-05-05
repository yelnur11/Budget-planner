const Alert = require('../models/alertModel');

const alertController = {
  getAlerts: async (req, res) => {
    try {
      const { userId } = req.params;
      const alerts = await Alert.find({ userId });
      res.status(200).json(alerts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createAlert: async (req, res) => {
    try {
      const { userId, message } = req.body;
      const alert = new Alert({ userId, message });
      await alert.save();
      res.status(201).json(alert);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = alertController;