import { Endpoints } from '../../types';

export const calculateCartTaxes: Endpoints['calculateCartTaxes'] = async (
  context,
  params
) => {
  console.log('calculateCartTaxes has been called');
  console.log(params);
  const endpoint = `/store/carts/${params.id}/taxes`;

  const { data } = await context.client.post(endpoint);
  return { data: data };
};
