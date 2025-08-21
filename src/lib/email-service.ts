// Email service for UniFlow
// Note: This is a mock implementation for development
// In production, you would integrate with services like SendGrid, AWS SES, or similar

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export class EmailService {
  private static instance: EmailService;
  
  private constructor() {}
  
  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  async sendEmail(emailData: EmailData): Promise<{ success: boolean; error?: string }> {
    try {
      // In development, we'll just log the email and simulate success
      console.log('📧 Email would be sent:', {
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html.substring(0, 100) + '...',
      });

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // For development, we'll return success
      // In production, this would actually send the email
      return { success: true };
    } catch (error) {
      console.error('Failed to send email:', error);
      return { success: false, error: 'Failed to send email' };
    }
  }

  async sendVerificationEmail(email: string, token: string, firstName: string): Promise<{ success: boolean; error?: string }> {
    const verificationUrl = `${window.location.origin}/auth/verify-email?token=${token}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Verify your UniFlow account</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to UniFlow!</h1>
            </div>
            <div class="content">
              <h2>Hi ${firstName},</h2>
              <p>Thank you for creating your UniFlow account! To get started, please verify your email address by clicking the button below:</p>
              
              <div style="text-align: center;">
                <a href="${verificationUrl}" class="button">Verify Email Address</a>
              </div>
              
              <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #667eea;">${verificationUrl}</p>
              
              <p>This link will expire in 24 hours for security reasons.</p>
              
              <p>If you didn't create this account, you can safely ignore this email.</p>
            </div>
            <div class="footer">
              <p>UniFlow - Unify your digital life in one seamless flow</p>
              <p>This email was sent to ${email}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const text = `
      Welcome to UniFlow!
      
      Hi ${firstName},
      
      Thank you for creating your UniFlow account! To get started, please verify your email address by visiting this link:
      
      ${verificationUrl}
      
      This link will expire in 24 hours for security reasons.
      
      If you didn't create this account, you can safely ignore this email.
      
      UniFlow - Unify your digital life in one seamless flow
    `;

    return this.sendEmail({
      to: email,
      subject: 'Verify your UniFlow account',
      html,
      text,
    });
  }

  async sendPasswordResetEmail(email: string, token: string, firstName: string): Promise<{ success: boolean; error?: string }> {
    const resetUrl = `${window.location.origin}/auth/reset-password?token=${token}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Reset your UniFlow password</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset Request</h1>
            </div>
            <div class="content">
              <h2>Hi ${firstName},</h2>
              <p>We received a request to reset your UniFlow password. Click the button below to create a new password:</p>
              
              <div style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset Password</a>
              </div>
              
              <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #667eea;">${resetUrl}</p>
              
              <p>This link will expire in 1 hour for security reasons.</p>
              
              <p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
            </div>
            <div class="footer">
              <p>UniFlow - Unify your digital life in one seamless flow</p>
              <p>This email was sent to ${email}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const text = `
      Password Reset Request
      
      Hi ${firstName},
      
      We received a request to reset your UniFlow password. Visit this link to create a new password:
      
      ${resetUrl}
      
      This link will expire in 1 hour for security reasons.
      
      If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
      
      UniFlow - Unify your digital life in one seamless flow
    `;

    return this.sendEmail({
      to: email,
      subject: 'Reset your UniFlow password',
      html,
      text,
    });
  }
}

export const emailService = EmailService.getInstance();
