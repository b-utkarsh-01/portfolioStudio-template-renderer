import React from "react";

const AiEducation = ({ education, cardStyle }) => (
  <section style={cardStyle}>
    <h2 style={{ marginTop: 0 }}>Education</h2>
    {education.map((item, idx) => (
      <div key={`edu-${idx}`} style={{ marginBottom: "8px" }}>
        <strong>{item?.institution || item?.school || "Institute"}</strong>
        <div style={{ opacity: 0.85 }}>{item?.degree || ""}</div>
      </div>
    ))}
  </section>
);

export default AiEducation;
