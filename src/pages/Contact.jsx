import { useState } from "react";
import "./Contact.css";

function Contact() {
  // useState #1: stores whatever the user types in the message box.
  // This makes the <textarea> a "controlled input" - its value is always
  // whatever is in React state, not managed by the browser itself.
  const [message, setMessage] = useState("");

  // useState #2: a simple true/false toggle to show or hide a tips box.
  // This demonstrates useState being used for UI visibility, not just form data.
  const [showTips, setShowTips] = useState(false);

  return (
    <section className="contact">
      <h2>Contact Me</h2>
      <p>Feel free to send me a message below.</p>

      {/* Clicking this button flips showTips between true and false */}
      <button className="toggle-btn" onClick={() => setShowTips(!showTips)}>
        {showTips ? "Hide Tips" : "Show Tips"}
      </button>

      {/* This box only renders when showTips is true */}
      {showTips && (
        <div className="tips-box">
          Tip: Mention your name and the reason you're reaching out.
        </div>
      )}

      <div className="contact-form">
        <label htmlFor="message">Your Message</label>
        <textarea
          id="message"
          rows="5"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Displays whatever is typed, updating on every keystroke */}
        <p className="live-preview">
          <strong>Live Preview:</strong>{" "}
          {message ? message : "Nothing typed yet..."}
        </p>
      </div>
    </section>
  );
}

export default Contact;