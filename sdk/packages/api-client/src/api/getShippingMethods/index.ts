import { Endpoints } from '../../types';

export const getShippingMethods: Endpoints['getShippingMethods'] = async (
  context,
  params
) => {
  console.log('getShippingMethods has been called');

  const { data } = await context.client.get('/store/shipping-options');
  return { data: data };
};
