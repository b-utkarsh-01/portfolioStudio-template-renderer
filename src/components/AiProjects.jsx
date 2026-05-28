import React from "react";

const AiProjects = ({ projects, cardStyle }) => (
  <section style={cardStyle}>
    <h2 style={{ marginTop: 0 }}>Projects</h2>
    {projects.map((item, idx) => (
      <div key={`proj-${idx}`} style={{ marginBottom: "10px" }}>
        <strong>{item?.title || item?.name || "Project"}</strong>
        <p style={{ margin: "4px 0 0 0", opacity: 0.9 }}>{item?.description || ""}</p>
      </div>
    ))}
  </section>
);

export default AiProjects;
