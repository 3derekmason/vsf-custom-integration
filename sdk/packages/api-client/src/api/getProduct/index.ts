import { Endpoints } from '../../types';

export const getProduct: Endpoints['getProduct'] = async (context, params) => {
  console.log('getProduct has been called');

  const { data } = await context.client.get(`/store/products/${params.id}`);
  return { data: data };
};
