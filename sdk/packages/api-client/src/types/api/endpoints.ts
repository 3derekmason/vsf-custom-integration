import { MedusaIntegrationContext, TODO } from '..';
export interface Endpoints {
  addCartLineItem(
    context: MedusaIntegrationContext,
    params: TODO
  ): Promise<TODO>;

  addShippingMethod(
    context: MedusaIntegrationContext,
    params: TODO
  ): Promise<TODO>;

  calculateCartTaxes(
    context: MedusaIntegrationContext,
    params: TODO
  ): Promise<TODO>;

  createCart(context: MedusaIntegrationContext, params: TODO): Promise<TODO>;

  createCustomer(
    context: MedusaIntegrationContext,
    params: TODO
  ): Promise<TODO>;

  createPaymentSessions(
    context: MedusaIntegrationContext,
    params: TODO
  ): Promise<TODO>;

  getProduct(context: MedusaIntegrationContext, params: TODO): Promise<TODO>;

  getProducts(context: MedusaIntegrationContext, params: TODO): Promise<TODO>;

  getShippingMethods(
    context: MedusaIntegrationContext,
    params: TODO
  ): Promise<TODO>;

  hello(context: MedusaIntegrationContext, params: TODO): Promise<TODO>;

  listCartShippingOptions(
    context: MedusaIntegrationContext,
    params: TODO
  ): Promise<TODO>;

  login(context: MedusaIntegrationContext, params: TODO): Promise<TODO>;

  removeLineItem(
    context: MedusaIntegrationContext,
    params: TODO
  ): Promise<TODO>;

  selectPaymentSession(
    context: MedusaIntegrationContext,
    params: TODO
  ): Promise<TODO>;

  updateCart(context: MedusaIntegrationContext, params: TODO): Promise<TODO>;

  updateShippingAddress(
    context: MedusaIntegrationContext,
    params: TODO
  ): Promise<TODO>;
}
