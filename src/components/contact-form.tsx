'use client';

import { Send } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';

import { ActionState, EMPTY_ACTION_STATE, fromErrorToActionState } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import ContactSchema from '@/schemas/contact';
import FieldError from '@/components/field-error';
import { Input } from '@/components/ui/input';
import { sendContact } from '@/actions/contact';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function ContactForm() {
  // State
  const [validation, setValidation] = useState<ActionState | null>(null);

  // Utils
  const [actionState, formAction, isPending] = useActionState(sendContact, EMPTY_ACTION_STATE);

  // Handlers
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    setValidation(null);

    try {
      ContactSchema.parse(Object.fromEntries(formData));
    } catch (error) {
      setValidation(fromErrorToActionState(error));
      event.preventDefault();
    }
  }

  // Effects
  useEffect(() => {
    if (actionState.message === "Your message has been sent successfully! I'll get back to you soon.") {
      toast("Message Sent", {
        description: "Your message has been sent successfully! I'll get back to you soon.",
      });
    }
  }, [actionState]);

  // Render
  return (
    <form
      action={formAction}
      className="space-y-4"
      onSubmit={onSubmit}
      role="form"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-y-1">
          <label className="font-bold text-xs" htmlFor="name">Your Name</label>
          <Input id="name" name="name" placeholder="John Doe" />
          <FieldError actionState={validation ?? actionState} name="name" />
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="font-bold text-xs" htmlFor="email">Your Email</label>
          <Input id="email" name="email" placeholder="john@example.com" />
          <FieldError actionState={validation ?? actionState} name="email" />
        </div>
      </div>
      <div className="flex flex-col gap-y-1">
        <label className="font-bold text-xs" htmlFor="subject">Subject</label>
        <Input id="subject" name="subject" placeholder="Project Inquiry" />
        <FieldError actionState={validation ?? actionState} name="subject" />
      </div>
      <div className="flex flex-col gap-y-1">
        <label className="font-bold text-xs" htmlFor="message">Message</label>
        <Textarea id="message" name="message" placeholder="Tell me about your project or inquiry..." rows={5} />
        <FieldError actionState={validation ?? actionState} name="message" />
      </div>
      <Button className="w-full" disabled={isPending} type="submit">
        {isPending ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              ></path>
            </svg>
            Sending...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Send Message
          </span>
        )}
      </Button>
    </form>
  );
}