import { z } from 'zod';

const ContactSchema = z.object({
  email: z.string().min(1, { message: 'Email is required.' }).email({ message: 'Email is invalid.' }),
  message: z.string().min(1, { message: 'Message is required.' }),
  name: z.string().min(1, { message: 'Name is required.' }),
  subject: z.string().min(1, { message: 'Subject is required.' }),
});

export default ContactSchema;
