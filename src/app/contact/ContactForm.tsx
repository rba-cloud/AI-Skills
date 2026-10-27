"use client";

import { useState, type FormEvent } from "react";

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Errors = {};
    if (String(data.get("name") || "").trim().length < 2) next.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(String(data.get("email") || ""))) next.email = "Enter a valid email address.";
    if (!data.get("subject")) next.subject = "Choose an inquiry type.";
    if (String(data.get("message") || "").trim().length < 15) next.message = "Please add at least 15 characters.";
    setErrors(next);
    setStatus(Object.keys(next).length ? "Please correct the highlighted fields." : "Your message looks complete. It was not sent or saved because this demonstration form has no secure destination yet.");
  }
  return (
    <form className="form-card" onSubmit={submit} noValidate>
      <div className="form-message"><strong>Demonstration mode:</strong> This form validates locally but does not send or save messages.</div>
      <div className="form-grid" style={{ marginTop: 22 }}>
        <div className="form-field"><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} />{errors.name && <span id="contact-name-error" className="field-error">{errors.name}</span>}</div>
        <div className="form-field"><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} />{errors.email && <span id="contact-email-error" className="field-error">{errors.email}</span>}</div>
        <div className="form-field full"><label htmlFor="contact-subject">Inquiry type</label><select id="contact-subject" name="subject" defaultValue="" aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "contact-subject-error" : undefined}><option value="" disabled>Select one</option><option>General inquiry</option><option>Training inquiry</option><option>Collaboration inquiry</option></select>{errors.subject && <span id="contact-subject-error" className="field-error">{errors.subject}</span>}</div>
        <div className="form-field full"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} />{errors.message && <span id="contact-message-error" className="field-error">{errors.message}</span>}</div>
      </div>
      <button className="primary-button" type="submit">Check message</button>
      <div aria-live="polite" role="status" style={{ marginTop: 14 }}>{status}</div>
    </form>
  );
}
