export interface MailDetails {
  from?: string;
  to: string | string[];
  otpCode?: string;
  subject?: string;
  text?: string;
  html?: string;
}

export type FromInput = {
  mail: string;
  password: string;
};

export interface IMailService {
  send(input: MailDetails): Promise<void>;
}

function auth() {}
