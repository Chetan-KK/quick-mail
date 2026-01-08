/**
 * Configuration options for initializing QuickMail
 */
export interface QuickMailConfig {
  /** Your email address used for sending emails (SMTP username) */
  email: string;
  /** SMTP password for authentication. For Gmail, use an App Password generated from Google Account settings */
  password: string;
  /** SMTP server hostname. Default: smtp.gmail.com */
  smtpHost?: string;
  /** SMTP server port. Default: 587 (TLS) */
  smtpPort?: number;
  /** Enable SSL/TLS secure connection. Default: auto-detects (false for port 587, true for port 465) */
  smtpSecure?: boolean;
  /** Display name shown in recipient's inbox. If not provided, only email address is shown */
  senderName?: string;
}

/**
 * Options for sending an email
 */
export interface SendMailOptions {
  /** Recipient email address(es). Can be a single email string or array of emails */
  to: string | string[];
  /** Email subject line shown in recipient's inbox */
  subject: string;
  /** HTML formatted email content. Recommended for rich formatting */
  html?: string;
  /** Plain text email content. Used as fallback if HTML is not supported by recipient's email client */
  text?: string;
  /** Sender email address. If not provided, uses the email from init() configuration */
  from?: string;
  /** CC (Carbon Copy) recipients - visible to all recipients */
  cc?: string | string[];
  /** BCC (Blind Carbon Copy) recipients - hidden from other recipients */
  bcc?: string | string[];
  /** Reply-To email address. Responses will be sent to this address instead of the 'from' address */
  replyTo?: string;
  /** File attachments to include in the email */
  attachments?: Attachment[];
}

/**
 * Email attachment configuration
 */
export interface Attachment {
  /** Name of the file as it will appear to the recipient */
  filename: string;
  /** Local file path or URL to the file. Example: './document.pdf' or 'https://example.com/file.pdf' */
  path?: string;
  /** Raw file content as string or Buffer. Use this instead of 'path' for in-memory files */
  content?: string | Buffer;
  /** MIME type of the file. Example: 'application/pdf', 'image/png'. Auto-detected if not provided */
  contentType?: string;
}

/**
 * Result returned after attempting to send an email
 */
export interface SendMailResult {
  /** Whether the email was sent successfully */
  success: boolean;
  /** Unique message ID assigned by the email server. Only present if success is true */
  messageId?: string;
  /** Error message describing what went wrong. Only present if success is false */
  error?: string;
}
