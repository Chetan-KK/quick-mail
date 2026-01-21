import nodemailer, { Transporter } from "nodemailer";
import { QuickMailConfig, SendMailOptions, SendMailResult } from "./types";

/**
 * QuickMail - Simple and quick email sending package
 */
class QuickMailClass {
  private transporter: Transporter | null = null;
  private config: QuickMailConfig | null = null;
  private initialized = false;

  /**
   * Initialize QuickMail with your SMTP credentials
   * @param config - SMTP configuration options including email and password
   * @example
   * ```ts
   * QuickMail.init({
   *   email: 'your-email@gmail.com',
   *   password: 'your-app-password'
   * });
   * ```
   */
  init(config: QuickMailConfig): void {
    const {
      email,
      password,
      smtpHost = "smtp.gmail.com",
      smtpPort = 587,
      smtpSecure,
      senderName,
    } = config;

    if (!email || !password) {
      throw new Error("QuickMail: email and password are required");
    }

    // Auto-detect secure based on port if not provided
    const isSecure = smtpSecure ?? smtpPort === 465;

    this.config = {
      email,
      password,
      smtpHost,
      smtpPort,
      smtpSecure: isSecure,
      senderName,
    };

    this.transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: isSecure,
      auth: {
        user: email,
        pass: password,
      },
    });

    this.initialized = true;
  }

  /**
   * Send an email
   * @param options - Email options
   * @returns Promise with send result
   * @example
   * ```ts
   * const result = await QuickMail.send({
   *   to: 'recipient@example.com',
   *   subject: 'Hello!',
   *   html: '<h1>Welcome!</h1>'
   * });
   * ```
   */
  async send(options: SendMailOptions): Promise<SendMailResult> {
    if (!this.initialized || !this.transporter || !this.config) {
      throw new Error(
        "QuickMail: Not initialized. Call QuickMail.init() first.",
      );
    }

    const { to, subject, html, text, from, cc, bcc, replyTo, attachments } =
      options;

    if (!to) {
      throw new Error("QuickMail: 'to' is required");
    }

    if (!subject) {
      throw new Error("QuickMail: 'subject' is required");
    }

    if (!html && !text) {
      throw new Error("QuickMail: Either 'html' or 'text' is required");
    }

    // Build the "from" field
    const fromAddress = from || this.config.email;
    const fromField = this.config.senderName
      ? `"${this.config.senderName}" <${fromAddress}>`
      : fromAddress;

    try {
      const info = await this.transporter.sendMail({
        from: fromField,
        to: Array.isArray(to) ? to.join(", ") : to,
        cc: cc ? (Array.isArray(cc) ? cc.join(", ") : cc) : undefined,
        bcc: bcc ? (Array.isArray(bcc) ? bcc.join(", ") : bcc) : undefined,
        replyTo,
        subject,
        html: html || undefined,
        text: text || undefined,
        attachments,
      });

      return {
        success: true,
        messageId: info.messageId,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Verify the SMTP connection
   * @returns Promise<boolean> - true if connection is valid
   */
  async verify(): Promise<boolean> {
    if (!this.initialized || !this.transporter) {
      throw new Error(
        "QuickMail: Not initialized. Call QuickMail.init() first. or check your Credentials!",
      );
    }

    try {
      await this.transporter.verify();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if QuickMail is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Reset the QuickMail instance
   */
  reset(): void {
    if (this.transporter) {
      this.transporter.close();
    }
    this.transporter = null;
    this.config = null;
    this.initialized = false;
  }
}

// Export singleton instance
export const QuickMail = new QuickMailClass();
