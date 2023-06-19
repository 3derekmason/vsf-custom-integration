import { Endpoints } from '../../types';

export const getProducts: Endpoints['getProducts'] = async (
  context,
  params
) => {
  console.log('getProducts has been called');
  const { data } = await context.client.get('/store/products');
  return { data: data };
};
