const cloudinary = require('cloudinary');
const config = require('../../config/index')
const { Advert } = require('../../models/advertisers/advert/Advert')
cloudinary.config({
    cloud_name: config.CD_CLOUD_NAME,
    api_key: config.CD_CLOUD_API_KEY,
    api_secret: config.CD_CLOUD_API_SECRET
});





exports.CDphotoupload = async function (req, res) {

    // uploading all images at once
    let filesForUpload = []

    // looping all files ( blobs) from client-side
    for (const key in req.files) {
        if (req.files.hasOwnProperty(key)) {
            const element = req.files[key];

            // pushing all files into filesForUpload Array we declare above
            filesForUpload.push(element)
        }
    }

    // res_promises will be an array of promises . we use .map function for looping all promises for sending cloudinary
    let res_promises = filesForUpload.map(file => new Promise((resolve, reject) => {

        // here we use cloudinary upload method for sending file path for each promise ( image file)
        cloudinary.v2.uploader.upload(file.path, { use_filename: true, unique_filename: false, timeout: 120000 }, function (error, result) {

            if (error) reject(error)

            // sending back url we get back from cloudinary after success
            else resolve({ public_id: result.public_id, url: result.secure_url })
        })
    })
    )
    // Promise.all will fire when all promises are resolved 
    Promise.all(res_promises)
        .then((results) => {

            // now sending back to client-side as images [ results]
            res.status(200).send({
                success: true,
                results: results
            })

        })
        .catch((err) => {
            console.log(err)
        })

}



exports.CDimagedelete = (req, res) => {

    const { imageId, advertId } = req.params;

    console.log(imageId)
    console.log(advertId)
    Advert.findOneAndUpdate({ _id: advertId }, { $pull: { 'contents.images': { public_id: imageId } } }, { upsert: true, new: true }, (err, updatedAdvert) => {
        console.log(updatedAdvert)
        if (err) return res.json({ succes: false });
        res.status(200).send({ success: true, advert: updatedAdvert });

    })

    cloudinary.uploader.destroy(imageId, (error, result) => {
        if (error) {
            console.log(error)
        }

    })



}








exports.S3Upload = function (req, res) {

    singleUpload(req, res, (err) => {

        if (err) {
            return res.status(422).send({ erorrs: [{ title: 'Image upload error', detail: err.message }] })

        }

        return res.json({ 'imageUrl': req.file.location })
    })


}