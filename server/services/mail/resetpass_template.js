const resetPass = data => {

    const URL = process.env.NODE_ENV === 'production' ? `https://www.spotads.live` : 'http://localhost:3001';


    return `
    <!DOCTYPE html>
   <html style="margin: 0; padding: 0;">
   
       <head>
           <title>One | Email template!</title>
       </head>
   
           <body style="margin: 0; padding: 0;">
               <table class="table" cellpadding="0" cellspacing="0" style="background-color: #eee; empty-cells: hide; margin: 0 auto; padding: 0; width: 600px;">
                   <tr>
                       <td style="background-color: #999592; margin: 0 auto;">
                           <h1 style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">Spot Ads</h1></td>
                   </tr>
                   <tr>
                       <td style="margin: 0 auto;padding: 15px 25px;box-sizing: border-box">
                            <p>Click on this link to reset your password:</p>
                            <a href="${URL}/reset_password/${data.resetToken}">Reset your password</a>
                       </td>
                   </tr>
                   <tr>
                        <td style="background-color: #999592; margin: 0 auto;">
                                <p style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;font-size:10px">
                                       SpotAds. platform for placing your ads in tons of display boards in just minutes.
                                </p></td>
                   </tr>
               </table>
           </body>
   
     </html>
    `;
};

module.exports = { resetPass };
