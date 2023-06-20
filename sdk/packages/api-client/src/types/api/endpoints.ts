import { MedusaIntegrationContext, TODO } from '..';

/**
 * Definition of all API-client methods available in {@link https://docs.vuestorefront.io/v2/advanced/context.html#context-api | context}.
 */
export interface Endpoints {
  /**
   * Here you can find an example endpoint definition. Based on this example, you should define how your endpoint will look like.
   * This description will appear in the API extractor, so try to document all endpoints added here.
   */
  exampleEndpoint(
    context: MedusaIntegrationContext,
    params: TODO
  ): Promise<TODO>;
  coolEndpoint(context: MedusaIntegrationContext, params: TODO): Promise<TODO>;
  getProducts(context: MedusaIntegrationContext, params: TODO): Promise<TODO>;
  hello(context: MedusaIntegrationContext, params: TODO): Promise<TODO>;
}
