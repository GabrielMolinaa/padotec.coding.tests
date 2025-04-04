// Schema para montar um Dispositivo (Device)

const mongoose = require("mongoose");

const dispositivoSchema = new mongoose.Schema({

  deviceId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  mac: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Dispositivo", dispositivoSchema);
