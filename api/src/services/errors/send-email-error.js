export class SendEmailError extends Error {
  constructor(){
    super('An error occurred while sending the email to the recipient.')
  }
}