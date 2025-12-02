export interface IEmailProvider {
    sendEmail(to: string | string[], subject: string, htmlBody: string, attachments?: { filename: string; path?: string; content?: Buffer; cid?: string }[]): Promise<void>;
}