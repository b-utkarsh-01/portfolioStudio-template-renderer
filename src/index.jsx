import { defaultTemplates, DefaultPortfolioRenderer } from "portfolio-studio-default";
import {
  premiumTemplates,
  PremiumPortfolioRenderer,
  PortfolioDataProvider,
  TemplateV1Layout,
} from "portfolio-studio-premium";

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
