"use client";

import { useState, type FormEvent } from "react";

type Errors = Partial<Record<"name" | "email" | "whatsapp" | "city" | "level" | "goal" | "consent", string>>;

export function InterestForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const next: Errors = {};
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const whatsapp = String(form.get("whatsapp") ?? "").trim();
    const city = String(form.get("city") ?? "").trim();
    const level = String(form.get("level") ?? "");
    const goal = String(form.get("goal") ?? "").trim();
    if (name.length < 2) next.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (!/^\+?[0-9 ()-]{8,20}$/.test(whatsapp)) next.whatsapp = "Enter a valid WhatsApp number, including country code where possible.";
    if (city.length < 2) next.city = "Enter your city.";
    if (!level) next.level = "Choose your current skill level.";
    if (goal.length < 10) next.goal = "Tell us a little more about what you want to learn.";
    if (form.get("consent") !== "yes") next.consent = "Consent is required before a future submission can be sent.";
    setErrors(next);
    setMessage(Object.keys(next).length ? "Please correct the highlighted fields." : "Your details look complete. This demonstration form did not send or save them because a secure registration service has not been connected yet.");
  }

  const error = (name: keyof Errors) => errors[name] ? <span className="field-error" id={`${name}-error`}>{errors[name]}</span> : null;
  const described = (name: keyof Errors) => errors[name] ? `${name}-error` : undefined;

  return (
    <form className="form-card" onSubmit={submit} noValidate>
      <div className="form-message"><strong>Demonstration mode:</strong> validation works, but this form does not transmit or store personal information.</div>
      <div className="form-grid" style={{ marginTop: 22 }}>
        <div className="form-field"><label htmlFor="interest-name">Full name</label><input id="interest-name" name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={described("name")} />{error("name")}</div>
        <div className="form-field"><label htmlFor="interest-email">Email address</label><input id="interest-email" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={described("email")} />{error("email")}</div>
        <div className="form-field"><label htmlFor="interest-whatsapp">WhatsApp number</label><input id="interest-whatsapp" name="whatsapp" type="tel" autoComplete="tel" placeholder="e.g. +92 …" aria-invalid={Boolean(errors.whatsapp)} aria-describedby={described("whatsapp")} />{error("whatsapp")}</div>
        <div className="form-field"><label htmlFor="interest-city">City</label><input id="interest-city" name="city" autoComplete="address-level2" aria-invalid={Boolean(errors.city)} aria-describedby={described("city")} />{error("city")}</div>
        <div className="form-field full"><label htmlFor="interest-level">Current skill level</label><select id="interest-level" name="level" defaultValue="" aria-invalid={Boolean(errors.level)} aria-describedby={described("level")}><option value="" disabled>Select one</option><option>Completely new to AI</option><option>Used a few AI tools</option><option>Use AI regularly</option></select>{error("level")}</div>
        <div className="form-field full"><label htmlFor="interest-goal">Primary learning goal</label><textarea id="interest-goal" name="goal" placeholder="What would you like to become able to do?" aria-invalid={Boolean(errors.goal)} aria-describedby={described("goal")} />{error("goal")}</div>
        <div className="form-field full"><label className="checkbox-field"><input type="checkbox" name="consent" value="yes" aria-invalid={Boolean(errors.consent)} aria-describedby={described("consent")} /><span>I agree that my details may be used to respond when a secure registration service is connected. This demo does not currently send them.</span></label>{error("consent")}</div>
      </div>
      <button className="primary-button" type="submit">Check my details</button>
      <div aria-live="polite" role="status" style={{ marginTop: 14 }}>{message}</div>
    </form>
  );
}
