import { defaultTemplates, DefaultPortfolioRenderer } from "portfolio-studio-default/src";
import {
  premiumTemplates,
  PremiumPortfolioRenderer,
  PortfolioDataProvider,
  TemplateV1Layout,
} from "portfolio-studio-premium/src";

const TEMPLATE_CATALOG = [...defaultTemplates, ...(Array.isArray(premiumTemplates) ? premiumTemplates : [])];

const getTemplateById = (templateId) =>
  TEMPLATE_CATALOG.find((template) => template.id === templateId) || TEMPLATE_CATALOG[0];

const TemplatePortfolioRenderer = ({ appReady, templateId = "default-v1", portfolioData = null }) => {
  const data = portfolioData || null;
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
