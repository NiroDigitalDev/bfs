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
      <input
        id="email"
        type="email"
        required
        placeholder={
          submitted
            ? "Received. Dispatch is rare and worth the wait."
            : "Address. Sent rarely. Mostly never."
        }
        autoComplete="email"
        data-cursor="text"
        disabled={submitted}
      />
      <button type="submit" data-cursor="link" data-cursor-label="Enter">
        {submitted ? "On file" : "Submit"}
      </button>
    </form>
  );
}
