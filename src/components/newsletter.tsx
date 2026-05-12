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
            ? "you'll receive nothing. as promised."
            : "your@email — get nothing in return"
        }
        autoComplete="email"
        data-cursor="text"
        disabled={submitted}
      />
      <button type="submit" data-cursor="link" data-cursor-label="Join">
        {submitted ? "Joined" : "Join the Void"}
      </button>
    </form>
  );
}
