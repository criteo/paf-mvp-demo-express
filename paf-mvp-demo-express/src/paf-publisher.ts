import { pafPublisherClientNodeConfig, pafPublisherWebSiteConfig } from './config';
import { App } from '@core/express/express-apps';

export const pafPublisherWebSiteApp = new App(pafPublisherWebSiteConfig.name).setHostName(
  pafPublisherWebSiteConfig.host
);

pafPublisherWebSiteApp.app.get('*', (req, res) => {
  const view = 'publisher/index';
  res.render(view, {
    title: pafPublisherWebSiteConfig.name,
    cdnDomain: pafPublisherWebSiteConfig.cdnHost,
    // Using the CMP backend as a PAF client node
    pafNodeHost: pafPublisherClientNodeConfig.host,
    cmp: true,
  });

  // Send full URL in referer header, for testing this config
  res.setHeader('Referrer-Policy', 'unsafe-url');
});

export const pafPublisherCdnApp = new App(pafPublisherWebSiteConfig.name).setHostName(
  pafPublisherWebSiteConfig.cdnHost
);
