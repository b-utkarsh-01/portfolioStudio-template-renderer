import React from "react";

const AiHero = ({ profile, palette, cardStyle }) => (
  <section style={cardStyle}>
    <h1 style={{ margin: 0, color: palette.primary || "#22d3ee" }}>
      {profile?.name || "Portfolio"}
    </h1>
    <p style={{ margin: "8px 0 0 0", opacity: 0.85 }}>
      {profile?.summary || "AI-generated dynamic portfolio"}
    </p>
  </section>
);

export default AiHero;
