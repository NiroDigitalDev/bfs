"use client";

import { useState } from "react";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="newsletter"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <label htmlFor="email" className="sr-only">
        Email
      </label>
      {submitted ? (
        <output
          htmlFor="email"
          role="status"
          aria-live="polite"
          className="newsletter-status"
        >
          On file. Dispatch is rare and worth the wait.
        </output>
      ) : (
        <>
          <input
            id="email"
            type="email"
            required
            placeholder="Address. Sent rarely. Mostly never."
            autoComplete="email"
            data-cursor="text"
          />
          <button type="submit" data-cursor="link" data-cursor-label="Enter">
            Submit
          </button>
        </>
      )}
    </form>
  );
}
