const axios = require("axios");
const FormData = require("form-data");

const lineNotify = async (
	token,
	msg = "",
	imgThumbUrl = null,
	imgUrl = null,
	imgFile = null,
	stickerPID = null,
	stickerId = null,
	notiDis = false
) => {
	if (imgFile && (imgUrl || imgThumbUrl)) {
		console.log("please select either file or url image");
		return;
	}

	if ((imgUrl && !imgThumbUrl) || (!imgUrl && imgThumbUrl)) {
		console.log("image url need both ful image and thumbnail");
		return;
	}

	if ((imgUrl && !imgThumbUrl) || (!imgUrl && imgThumbUrl)) {
		console.log("image url need both ful image and thumbnail");
		return;
	}

	const form = new FormData();
	form.append("message", msg ? msg : "This is the way!");

	if (imgUrl && imgThumbUrl) {
		form.append("imageFullsize", imgUrl);
		form.append("imageThumbnail", imgThumbUrl);
	}

	if (imgFile) {
		form.append("imageFile", imgFile);
	}

	if (stickerPID && stickerId) {
		form.append("stickerPackageId", stickerPID);
		form.append("stickerId", stickerId);
	}

	if (notiDis) {
		form.append("notificationDisabled", notiDis);
	}

	const postURI = "https://notify-api.line.me/api/notify";

	await axios
		.post(postURI, form, {
			headers: {
				...form.getHeaders(),
				Authorization: "Bearer " + (token ? token : ""),
			},
		})
		.then((res) => {
			return res;
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
};

const thaiNumber = (num) => {
	let array = {
		1: "๑",
		2: "๒",
		3: "๓",
		4: "๔",
		5: "๕",
		6: "๖",
		7: "๗",
		8: "๘",
		9: "๙",
		0: "๐",
	};
	let str = num.toString();
	for (let val in array) {
		str = str.split(val).join(array[val]);
	}
	return str;
};

const showTimeInDigits = (targetTime) => {
	const target = {
		seconds: Math.floor(targetTime / 1000) % 60,
		minutes: Math.floor(targetTime / 60000) % 60,
		hours: Math.floor(targetTime / 3600000) % 24,
	};
	return `${target.hours.toLocaleString("en-US", {
		minimumIntegerDigits: 2,
		useGrouping: false,
	})}:${target.minutes.toLocaleString("en-US", {
		minimumIntegerDigits: 2,
		useGrouping: false,
	})}:${target.seconds.toLocaleString("en-US", {
		minimumIntegerDigits: 2,
		useGrouping: false,
	})}`;
};

const showTargetTime = (targetTime) => {
	if (typeof targetTime === "undefined" || targetTime == 0) {
		return "00:00:00";
	}
	return showTimeInDigits(targetTime);
};

const showReadableTargetTimeTH = (targetTime) => {
	const target = {
		seconds: Math.floor(targetTime / 1000) % 60,
		minutes: Math.floor(targetTime / 60000) % 60,
		hours: Math.floor(targetTime / 3600000) % 24,
	};
	let result = "";
	if (target.hours > 0) {
		result += `${target.hours.toLocaleString("en-US")} ชั่วโมง `;
	}
	if (target.minutes > 0) {
		result += `${target.minutes.toLocaleString("en-US")} นาที `;
	}
	if (target.seconds > 0) {
		result += `${target.seconds.toLocaleString("en-US")} วินาที`;
	}
	return result;
};

var parseDateToObject = (date) => {
		const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
		const [, day, month, year] = datePattern.exec(date);
		return {
			day: parseInt(day),
			month: parseInt(month),
			year: parseInt(year),
		};
	};

	var dateToDMY = (date) => {
		var d = date.getDate();
		var m = date.getMonth() + 1; //Month from 0 to 11
		var y = date.getFullYear();
		return "" + (d <= 9 ? "0" + d : d) + "/" + (m <= 9 ? "0" + m : m) + "/" + y;
	};

exports.lineNotify = lineNotify;
exports.thaiNumber = thaiNumber;
exports.showTargetTime = showTargetTime;
exports.showReadableTargetTimeTH = showReadableTargetTimeTH;
