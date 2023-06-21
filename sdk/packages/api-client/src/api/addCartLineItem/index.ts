import { Endpoints } from '../../types';

export const addCartLineItem: Endpoints['addCartLineItem'] = async (
  context,
  params
) => {
  console.log('addCartLineItem has been called');

  const body = {
    variant_id: params.variant_id,
    quantity: params.quantity,
  };

  const endpoint = `/store/carts/${params.id}/line-items`;

  console.log(body, endpoint);
  const { data } = await context.client.post(endpoint, JSON.stringify(body));
  return { data: data };
};
