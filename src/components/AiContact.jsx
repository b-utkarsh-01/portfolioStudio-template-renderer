import React from "react";

const AiContact = ({ contacts, cardStyle }) => (
  <section style={cardStyle}>
    <h2 style={{ marginTop: 0 }}>Contact</h2>
    {contacts.map((contact, idx) => (
      <div key={`contact-${idx}`}>{contact?.text || contact?.href || ""}</div>
    ))}
  </section>
);

export default AiContact;
