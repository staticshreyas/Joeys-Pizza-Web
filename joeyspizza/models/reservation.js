var mongoose = require("mongoose");
var Schema=mongoose.Schema;

var reservationSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    date: {type: Date},
    time: String,
    tablename: {type: String}

});
var Reservation = mongoose.model("Reservation", reservationSchema);

module.exports.model = Reservation;
module.exports.schema = reservationSchema;
