'use server';

import nodemailer from 'nodemailer';

import { ActionState } from '@/lib/utils';
import ContactSchema from '@/schemas/contact';
import { fromErrorToActionState, toActionState } from '@/lib/utils';

export async function sendContact(_actionState: ActionState, formData: FormData) {
  try {
    ContactSchema.parse(Object.fromEntries(formData));

    // Send email
    try {
      const email = formData.get('email') as string;
      const message = formData.get('message') as string;
      const name = formData.get('name') as string;
      const subject = formData.get('subject') as string;

      const transporter = nodemailer.createTransport({
        auth: {
          pass: process.env.GOOGLE_APP_PASSWORD,
          user: process.env.EMAIL_SENDER,
        },
        service: 'gmail',
      });

      const mailOptions = {
        from: email,
        replyTo: email,
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`.trim(),
        to: process.env.EMAIL_RECIPIENT,
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      return fromErrorToActionState(error);
    }
  } catch (error) {
    return fromErrorToActionState(error);
  }

  return toActionState("Your message has been sent successfully! I'll get back to you soon.");
}