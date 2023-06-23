import { Endpoints } from '../../types';

export const addShippingMethod: Endpoints['addShippingMethod'] = async (
  context,
  params
) => {
  console.log('addShippingMethod has been called');

  const endpoint = `/store/carts/${params.id}/shipping-methods`;
  const { data } = await context.client.post(endpoint, {
    option_id: params.option_id,
  });
  return { data: data };
};
