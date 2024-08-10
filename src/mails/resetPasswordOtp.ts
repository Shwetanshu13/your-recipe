export const getResetPasswordEmailHtml = (name: string, otp: string) => {
    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
          <h2 style="color: #4CAF50; text-align: center;">Password Reset Request</h2>
          <p style="font-size: 16px;">Hi ${name},</p>
          <p style="font-size: 16px;">We received a request to reset your password. Please use the following OTP to reset your password:</p>
          <div style="text-align: center; margin: 20px 0;">
            <h3 style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #fff; border-radius: 5px;">${otp}</h3>
          </div>
          <p style="font-size: 16px;">If you did not request this, please ignore this email.</p>
          <p style="font-size: 16px;">Best regards,</p>
          <p style="font-size: 16px;">Your Recipe Team</p>
        </div>
      </div>
    `;
  };
  