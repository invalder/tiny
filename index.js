const axios = require("axios");
const FormData = require('form-data');

const lineNotify = async (
  token,
  msg = "",
  imgThumbUrl = null,
  imgUrl = null,
  imgFile = null,
  stickerPID = null,
  stickerId = null,
  notiDis = false) => {
  
  if (imgFile && (imgUrl || imgThumbUrl)) {
    console.log('please select either file or url image')
    return;
  }

  if ((imgUrl && !imgThumbUrl) || (!imgUrl && imgThumbUrl)) {
    console.log('image url need both ful image and thumbnail')
    return;
  }

  if ((imgUrl && !imgThumbUrl) || (!imgUrl && imgThumbUrl)) {
    console.log('image url need both ful image and thumbnail')
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

	await axios.post(postURI, form, {
		headers: {
			...form.getHeaders(),
			Authorization: "Bearer " + (token ? token : "")
		} 
	}).then(res => {
    return (res);
	}).catch(err => {
    console.log(err);
    throw (err);
	});
}

exports.lineNotify = lineNotify