reset_password_template = """
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Reset Code</title>
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
              <h2 style="color:#333333;">Your Password Reset Code</h2>
              <p style="color:#555555; font-size:16px; line-height:1.5;">
                Dear User,
              </p>
              <p style="color:#555555; font-size:16px; line-height:1.5;">
                You have requested to reset your password. Please use the code below to proceed with the password reset process.
              </p>
              <p style="text-align:center; margin:30px 0;">
                <span style="display:inline-block; background-color:#007CC7; color:#ffffff; font-size:20px; padding:10px 20px; border-radius:5px; letter-spacing:2px;">
                  {code}
                </span>
              </p>
              <p style="color:#999999; font-size:14px; text-align:center;">
                This code will expire in a few minutes.
              </p>
              <p style="color:#555555; font-size:16px;">
                Thank you,<br/>
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
