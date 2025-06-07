# Contact Form Backend

Handles contact form submissions and sends emails using Nodemailer.

## Environment Variables

- `EMAIL_USER`: Gmail address to send from (use an app password)
- `EMAIL_PASS`: Gmail app password (never your real password)
- `EMAIL_TO`:   Recipient email address
- `PORT`:       Port to run the server (default: 3001)

## CORS

- In development, allows requests from `localhost:3000`.
- In production, update `allowedOrigins` in [contactform.js](http://_vscodecontentref_/0) to your deployed frontend domain.

## Deployment

- Never commit your `.env` file.
- Use a process manager (like PM2) or a cloud service for production.
- Update environment variables for your production environment.
