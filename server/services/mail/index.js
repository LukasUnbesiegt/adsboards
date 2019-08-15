
const mailer = require('nodemailer')
const { resetPass } = require("./resetpass_template");



const getEmailData = (to, name, actionData) => {

    return {
        from: "SpotAds <password.spotads@gmail.com>",
        to,
        subject: `Hey ${name}, reset your pass`,
        html: resetPass(actionData)
    }


}


const sendEmailHelper = (to, name, actionData = null) => {

    const smtpTransport = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: "email.spotads@gmail.com",
            pass: 'yngWIE500'
        }
    })
    const mail = getEmailData(to, name, actionData)
    smtpTransport.sendMail(mail, (error, response) => {

        if (error) {
            console.log(error);
        } else {

            cb()
        }
        smtpTransport.close();

    })


}


module.exports = { sendEmailHelper }