export const getVerificationEmailHtml = (
  name: string,
  verificationCode: string
) => {
  return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
          <h2 style="color: #4CAF50; text-align: center;">Email Verification</h2>
          <p style="font-size: 16px;">Hi ${name},</p>
          <p style="font-size: 16px;">Thank you for registering. Please use the following verification code to verify your email address:</p>
          <div style="text-align: center; margin: 20px 0;">
            <h3 style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #fff; border-radius: 5px;">${verificationCode}</h3>
          </div>
          <div>
            Visit the below link to verify your email address:
            <a href="${process.env.WEBURL}/auth/verify-email" style="display: block; margin: 20px 0; color: #4CAF50;">Verify Email</a>
          </div>
          <p style="font-size: 16px;">If you did not request this, please ignore this email.</p>
          <p style="font-size: 16px;">Best regards,</p>
          <p style="font-size: 16px;">Your Recipe Team</p>
        </div>
      </div>
    `;
};
