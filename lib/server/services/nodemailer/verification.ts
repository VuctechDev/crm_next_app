import { sendEmail } from ".";

export const sendVerificationEmail = async (
  to: string,
  authCode: string,
  userId: number
) => {
  try {
    await sendEmail({
      from: `CRM APP <neotech@pikado.net>`, // sender address
      to: "vuctechdev@gmail.com",
      subject: `Email verification - CRM APP`, // Subject line
      html: `<span style="
            display: inline; 
            margin-right: 15px;
            margin-bottom: 20px;
            font-family:'Segoe UI',Tahoma,Verdana,Arial,sans-serif;
            color: #2a2a2a;
            ">Your CRM verification email is valid for 24h</span>
            <br>
            <br>
            <span style="
            display: inline; 
            margin-right: 15px;
            margin-bottom: 20px;
            font-family:'Segoe UI',Tahoma,Verdana,Arial,sans-serif;
            color: #2a2a2a;
            ">Confirm your Email by clicking on the link 
            <a href="${process.env.API_BASE_URL}/api/auth/verification?code=${authCode}&_id=${userId}&email=${to}">Verify</a>
           
            </span>     
             <img src="${process.env.API_BASE_URL}/api/email/read?_id=123456789" width="1" height="1" style="display:none;">      
            `,
    });
  } catch (error) {}
};
