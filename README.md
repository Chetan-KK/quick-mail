# Quick Mail

A simple and quick email sending package for Node.js. Built on top of Nodemailer with sensible defaults for Gmail.

## Try it Online (best for frontend only servers)

**Don't have a Node.js server?** No problem! Use our web app to send emails instantly without any backend or server setup:

**[https://quick-mail-app-green.vercel.app/](https://quick-mail-app-green.vercel.app/)**

Perfect for:

- Frontend-only projects
- Quick email testing
- No server infrastructure needed
- Send emails directly from your browser

Create a free account and start sending emails without any hassle!

## Installation

```bash
npm install quick-mail
```

## Quick Start

```typescript
import { QuickMail } from "quick-mail";

// Initialize with your Gmail credentials
QuickMail.init({
  email: "your-email@gmail.com",
  password: "your-gmail-app-password",
});

// Send an email
const result = await QuickMail.send({
  to: "recipient@example.com",
  subject: "Hello from QuickMail!",
  html: "<h1>Welcome!</h1><p>This is a test email.</p>",
});

if (result.success) {
  console.log("Email sent!", result.messageId);
} else {
  console.error("Failed:", result.error);
}
```

## Configuration Options

### `QuickMail.init(config)`

| Option       | Type    | Default          | Description                                                        |
| ------------ | ------- | ---------------- | ------------------------------------------------------------------ |
| `email`      | string  | **required**     | Your email address used for sending (SMTP username)                |
| `password`   | string  | **required**     | SMTP password. For Gmail, use App Password from Google Account     |
| `smtpHost`   | string  | `smtp.gmail.com` | SMTP server hostname                                               |
| `smtpPort`   | number  | `587`            | SMTP server port (587 for TLS, 465 for SSL)                        |
| `smtpSecure` | boolean | auto             | Use SSL/TLS connection (auto-detects: false for 587, true for 465) |
| `senderName` | string  | -                | Display name shown in recipient's inbox                            |

### `QuickMail.send(options)`

| Option        | Type            | Required | Description                         |
| ------------- | --------------- | -------- | ----------------------------------- |
| `to`          | string \| array | yes      | Recipient email(s)                  |
| `subject`     | string          | yes      | Email subject                       |
| `html`        | string          | yes\*    | HTML content (\*or `text` required) |
| `text`        | string          | yes\*    | Plain text (\*or `html` required)   |
| `from`        | string          | -        | Sender (defaults to `email`)        |
| `cc`          | string \| array | -        | CC recipients                       |
| `bcc`         | string \| array | -        | BCC recipients                      |
| `replyTo`     | string          | -        | Reply-to address                    |
| `attachments` | Attachment[]    | -        | File attachments                    |

## Examples

### Basic Email

```typescript
await QuickMail.send({
  to: "friend@example.com",
  subject: "Hello!",
  html: "<p>How are you?</p>",
});
```

### Multiple Recipients

```typescript
await QuickMail.send({
  to: ["user1@example.com", "user2@example.com"],
  cc: "manager@example.com",
  subject: "Team Update",
  html: "<p>Here's the weekly update...</p>",
});
```

### With Attachments

```typescript
await QuickMail.send({
  to: "client@example.com",
  subject: "Invoice",
  html: "<p>Please find the invoice attached.</p>",
  attachments: [
    { filename: "invoice.pdf", path: "./invoice.pdf" },
    { filename: "readme.txt", content: "Hello World!" },
  ],
});
```

### Custom SMTP Server

```typescript
QuickMail.init({
  email: "your-email@outlook.com",
  password: "your-password",
  smtpHost: "smtp.office365.com",
  smtpPort: 587,
});
```

### With Display Name

```typescript
QuickMail.init({
  email: "noreply@company.com",
  password: "password",
  senderName: "Company Name",
});

// Emails will show: "Company Name" <noreply@company.com>
```

## Utility Methods

```typescript
// Verify SMTP connection
const isConnected = await QuickMail.verify();

// Check if initialized
const ready = QuickMail.isInitialized();

// Reset/disconnect
QuickMail.reset();
```

## Gmail App Password

To use with Gmail, you need an App Password:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Go to App Passwords
4. Generate a new app password for "Mail"
5. Use that 16-character password in the `password` field

## License

MIT
