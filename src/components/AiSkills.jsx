import React from "react";

const AiSkills = ({ skills, palette, cardStyle }) => (
  <section style={cardStyle}>
    <h2 style={{ marginTop: 0 }}>Skills</h2>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {skills.flatMap((group) => group?.items || []).map((item, idx) => (
        <span
          key={`skill-${idx}`}
          style={{
            border: `1px solid ${palette.border || "#334155"}`,
            borderRadius: "999px",
            padding: "6px 10px",
            fontSize: "13px",
          }}
        >
          {item}
        </span>
      ))}
    </div>
  </section>
);

export default AiSkills;
