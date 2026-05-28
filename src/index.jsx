import { defaultTemplates, DefaultPortfolioRenderer } from "portfolio-studio-default";
import {
  premiumTemplates,
  PremiumPortfolioRenderer,
  PortfolioDataProvider,
  TemplateV1Layout,
} from "portfolio-studio-premium";
import AiHero from "./components/AiHero.jsx";
import AiSkills from "./components/AiSkills.jsx";
import AiExperience from "./components/AiExperience.jsx";
import AiProjects from "./components/AiProjects.jsx";
import AiEducation from "./components/AiEducation.jsx";
import AiContact from "./components/AiContact.jsx";

const TEMPLATE_CATALOG = [...defaultTemplates, ...(Array.isArray(premiumTemplates) ? premiumTemplates : [])];

const getTemplateById = (templateId) =>
  TEMPLATE_CATALOG.find((template) => template.id === templateId) || TEMPLATE_CATALOG[0];

const withResolvedCustomStageTitles = (portfolioData) => {
  if (!portfolioData || typeof portfolioData !== "object") return portfolioData;

  const stageTitleById = new Map(
    (Array.isArray(portfolioData?.layout?.stages) ? portfolioData.layout.stages : []).map((stage) => [
      `${stage?.id || ""}`.trim(),
      `${stage?.title || ""}`.trim(),
    ])
  );

  const customStages = Array.isArray(portfolioData?.customStages) ? portfolioData.customStages : null;
  if (!customStages) return portfolioData;

  const nextCustomStages = customStages.map((stage) => {
    const id = `${stage?.id || ""}`.trim();
    const mappedTitle = `${stageTitleById.get(id) || ""}`.trim();
    const existingTitle = `${stage?.title || ""}`.trim();
    const resolvedTitle = mappedTitle || existingTitle || "Custom Stage";
    return { ...stage, title: resolvedTitle };
  });

  return { ...portfolioData, customStages: nextCustomStages };
};

const TemplatePortfolioRenderer = ({ appReady, templateId = "default-horizon", portfolioData = null }) => {
  const data = withResolvedCustomStageTitles(portfolioData || null);
  const renderMode = `${portfolioData?.renderMode || "static"}`.toLowerCase();
  const aiTemplateSpec = portfolioData?.aiTemplateSpec || null;
  const isDynamic = renderMode === "dynamic" && aiTemplateSpec && typeof aiTemplateSpec === "object";

  if (isDynamic) {
    const palette = aiTemplateSpec?.theme?.palette || {};
    const sections = Array.isArray(aiTemplateSpec?.sections) ? aiTemplateSpec.sections : [];
    const visibleSections = sections
      .filter((section) => section?.visible !== false)
      .sort((a, b) => Number(a?.order || 0) - Number(b?.order || 0));

    const profile = data?.profile || {};
    const skills = Array.isArray(data?.skills) ? data.skills : [];
    const experiences = Array.isArray(data?.experiences) ? data.experiences : [];
    const projects = Array.isArray(data?.projects) ? data.projects : [];
    const education = Array.isArray(data?.education) ? data.education : [];
    const contacts = Array.isArray(profile?.contacts) ? profile.contacts : [];

    const shellStyle = {
      background: palette.background || "#020617",
      color: palette.text || "#e2e8f0",
      minHeight: "100dvh",
      width: "100%",
    };
    const cardStyle = {
      background: palette.surface || "#0f172a",
      border: `1px solid ${palette.border || "#334155"}`,
      borderRadius: "14px",
      padding: "14px",
      marginBottom: "12px",
    };

    const renderSection = (section) => {
      switch (`${section?.type || ""}`) {
        case "hero":
          return <AiHero key={section.id} profile={profile} palette={palette} cardStyle={cardStyle} />;
        case "skills":
          return <AiSkills key={section.id} skills={skills} palette={palette} cardStyle={cardStyle} />;
        case "experience":
          return <AiExperience key={section.id} experiences={experiences} cardStyle={cardStyle} />;
        case "projects":
          return <AiProjects key={section.id} projects={projects} cardStyle={cardStyle} />;
        case "education":
          return <AiEducation key={section.id} education={education} cardStyle={cardStyle} />;
        case "contact":
          return <AiContact key={section.id} contacts={contacts} cardStyle={cardStyle} />;
        default:
          return null;
      }
    };

    return (
      <div style={shellStyle}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 16px 40px 16px" }}>
          {visibleSections.length ? visibleSections.map(renderSection) : <section style={cardStyle}>No AI sections available.</section>}
        </div>
      </div>
    );
  }

  const isDefaultTemplate = `${templateId}`.startsWith("default-");

  if (isDefaultTemplate) {
    return <DefaultPortfolioRenderer templateId={templateId} data={data} />;
  }

  return (
    <PortfolioDataProvider value={data}>
      <PremiumPortfolioRenderer appReady={appReady} templateId={templateId} />
    </PortfolioDataProvider>
  );
};

const TemplatePreviewFrame = ({
  templateId,
  portfolioData,
  showPreviewLabel = false,
  children,
}) => {
  const isNebulaPreview = templateId === "premium-v1";

  if (!isNebulaPreview) {
    return children;
  }

  return (
    <TemplateV1Layout
      showPreviewLabel={showPreviewLabel}
      portfolioData={portfolioData}
      templateId={templateId}
    >
      {children}
    </TemplateV1Layout>
  );
};

export default TemplatePortfolioRenderer;
export { TEMPLATE_CATALOG, getTemplateById, TemplatePreviewFrame };
