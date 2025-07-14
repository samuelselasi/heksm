change = """
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Reset</title>
</head>
<body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f4f4f4;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f4; padding:20px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 0 10px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color:#007CC7; padding:30px; text-align:center;">
              <img src="https://example.com/logo.png" alt="KnowAfrika API" width="100" style="max-width:100%; height:auto;">
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:30px;">
              <h2 style="color:#333333;">Password Reset Request</h2>
              <p style="color:#555555; font-size:16px; line-height:1.5;">
                Dear User
              </p>
              <p style="color:#555555; font-size:16px; line-height:1.5;">
                You have requested to reset your password. For security reasons, we have generated a unique link for you to change your password.
              </p>
              <p style="color:#555555; font-size:16px; line-height:1.5;">
                Please click the button below to proceed. This link will expire shortly.
              </p>
              <p style="text-align:center; margin:30px 0;">
                <a href="{reset_link}" style="background-color:#007CC7; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:4px; display:inline-block; font-size:16px;">Reset Your Password</a>
              </p>
              <p style="color:#999999; font-size:14px;">
                If you did not request this password reset, please ignore this email.
              </p>
              <p style="color:#555555; font-size:16px;">
                Regards,<br/>
                Admin
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#007CC7; color:#ffffff; padding:20px; text-align:center; font-size:14px;">
              &copy; 2025 HEKSM. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""
