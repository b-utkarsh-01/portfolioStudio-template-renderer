import React from "react";

const AiExperience = ({ experiences, cardStyle }) => (
  <section style={cardStyle}>
    <h2 style={{ marginTop: 0 }}>Experience</h2>
    {experiences.map((item, idx) => (
      <div key={`exp-${idx}`} style={{ marginBottom: "10px" }}>
        <strong>{item?.role || item?.title || "Role"}</strong>
        <div style={{ opacity: 0.85 }}>{item?.company || ""}</div>
        <p style={{ margin: "4px 0 0 0", opacity: 0.9 }}>{item?.description || ""}</p>
      </div>
    ))}
  </section>
);

export default AiExperience;
