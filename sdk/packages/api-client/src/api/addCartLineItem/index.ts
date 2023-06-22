import { Endpoints } from '../../types';

export const addCartLineItem: Endpoints['addCartLineItem'] = async (
  context,
  params
) => {
  console.log('addCartLineItem has been called');

  const body = {
    variant_id: params.variant_id,
    quantity: params.quantity,
    metadata: {
      pickup: params.pickup,
    },
  };

  const endpoint = `/store/carts/${params.id}/line-items`;

  const { data } = await context.client.post(endpoint, body);
  return { data: data };
};
