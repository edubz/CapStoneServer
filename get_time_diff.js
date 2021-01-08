var currentdate = new Date();
var dateTime =
	currentdate.getDate() +
	"/" +
	(currentdate.getMonth() + 1) +
	"/" +
	currentdate.getFullYear() +
	" @ " +
	currentdate.getHours() +
	":" +
	currentdate.getMinutes() +
	":" +
	currentdate.getSeconds();

function get_time_diff(datetime) {
	var datetime =
		typeof datetime !== "undefined"
			? datetime
			: "2014-01-01 01:02:03.123456";

	var datetime = new Date(datetime).getTime();
	var now = new Date().getTime();

	if (isNaN(datetime)) {
		return "";
	}

	//console.log( datetime + " " + now);

	if (datetime < now) {
		var milisec_diff = now - datetime;
	} else {
		var milisec_diff = datetime - now;
	}

	var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));

	var date_diff = new Date(milisec_diff);

	return milisec_diff;
}

module.exports = { get_time_diff };