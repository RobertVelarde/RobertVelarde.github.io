import { useState } from 'react';
import siteData from '../data/siteData';
import SectionHeading from './ui/SectionHeading';
import ScrollReveal from './ui/ScrollReveal';

const { contact } = siteData;

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');

    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch(contact.formspreeEndpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="bg-slate-800/30 py-24">
      <div className="mx-auto max-w-2xl px-6">
        <ScrollReveal>
          <SectionHeading
            title={contact.heading}
            subtitle={contact.description}
          />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full rounded-lg border border-slate-700 bg-surface px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full rounded-lg border border-slate-700 bg-surface px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full resize-none rounded-lg border border-slate-700 bg-surface px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="What would you like to discuss?"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full rounded-lg bg-accent py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-light disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'sent' && (
              <p className="text-center text-sm text-green-400">
                Message sent! I'll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="text-center text-sm text-red-400">
                Something went wrong. Please try again or reach out via LinkedIn.
              </p>
            )}
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
