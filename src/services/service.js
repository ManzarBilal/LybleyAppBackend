const fast2sms = require("fast-two-sms");
const nodemailer =  require("nodemailer");


function smsSend(otp,mobile){

    let options = {
        authorization :"oST3Je8bKsi6hGZjd9MHx047OmLrWcEDqAufIU51CnXpaBVtRPxqR3ZKJPHyWboQlOpAzstmL78j5cwS" ,
         message : `This is from LY3LEY, Your OTP code is ${otp}` , 
          numbers : [mobile]
        }

    fast2sms.sendMessage(options)
    .then((res)=>{
        // console.log("res",res)
    }).catch((err)=>{
      console.log(err);
    }) 
  }

async function sendMail(email,pass,isForget){
  console.log(email,pass,isForget);
     let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        requireTLS:true,
        auth:{
           // user:"jesus.mueller87@ethereal.email",
            user:"manzarbilal89@gmail.com",
            pass:"txhjevointzpweqz"
            //pass:"zT95Aax114tCZtwD1B"
        }
     })
try{
    let sub=isForget ? "LY3LEY Password changed" : "LY3LEY Registration";
     let info = await transporter.sendMail({
        from:'"LY3LEY  " <manzarbilal89@gmail.com>',
        to:email,
        subject:sub,
        html:`<h4>${isForget ? "Your Password has been changed." : "Thank you for your registration."}<h4>
               ${isForget ? "You have successfully changed your password." : "You have successfully registered on LY3LEY."}
              <P></P>
             ${isForget ? "" : `Username:<a href="#">${email}</a> <br/>`}
             ${isForget ? "New Password" : "Password"}:<a href="#">${pass}</a>`
     });
     console.log(info);
}catch(err){
    console.log("err",err);
}
}

module.exports={
    smsSend,
    sendMail
  }