"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

type FormStatus = {
  type: "success" | "danger" | null;
  message: string;
};

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<FormStatus>({ type: null, message: "" });
  const [sending, setSending] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as {
        type: "success" | "danger";
        message: string;
        mailto?: string;
      };

      setStatus({ type: data.type, message: data.message });

      if (data.type === "success") {
        if (data.mailto) {
          window.location.href = data.mailto;
        }
        setForm(initialForm);
      }
    } catch {
      setStatus({
        type: "danger",
        message: "Something went wrong. Please email me directly instead.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="sec-box contact section-padding bord-thin-top" id="contact">
      <div className="row">
        <div className="col-lg-5">
          <Reveal className="sec-head md-mb80">
            <h6 className="sub-title mb-15 opacity-7">Get In Touch</h6>
            <div className="phone fz-30 fw-600 mt-30 underline">
              <a className="main-color" href={site.phoneHref}>
                {site.phone}
              </a>
            </div>
            <ul className="rest social-text d-flex mt-60">
              <li className="mr-30">
                <a href={site.social.telegram} className="hover-this" target="_blank" rel="noreferrer">
                  <span className="hover-anim">Telegram</span>
                </a>
              </li>
              <li className="mr-30">
                <a href={site.social.linkedin} className="hover-this" target="_blank" rel="noreferrer">
                  <span className="hover-anim">LinkedIn</span>
                </a>
              </li>
              <li className="mr-30">
                <a href={site.social.github} className="hover-this" target="_blank" rel="noreferrer">
                  <span className="hover-anim">Github</span>
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
        <div className="col-lg-7 valign">
          <Reveal className="full-width">
            <form id="contact-form" onSubmit={onSubmit}>
              <div className="messages">
                {status.type ? (
                  <div className={`alert alert-${status.type}`}>{status.message}</div>
                ) : null}
              </div>
              <div className="controls row">
                <div className="col-lg-6">
                  <div className="form-group mb-30">
                    <input
                      id="form_name"
                      type="text"
                      name="name"
                      placeholder="Name"
                      required
                      value={form.name}
                      onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-30">
                    <input
                      id="form_email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      value={form.email}
                      onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group mb-30">
                    <input
                      id="form_subject"
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={form.subject}
                      onChange={(event) => setForm((prev) => ({ ...prev, subject: event.target.value }))}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <textarea
                      id="form_message"
                      name="message"
                      placeholder="Message"
                      rows={4}
                      required
                      value={form.message}
                      onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                    />
                  </div>
                  <div className="mt-30">
                    <button type="submit" disabled={sending}>
                      <span className="text">{sending ? "Sending..." : "Send A Message"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
