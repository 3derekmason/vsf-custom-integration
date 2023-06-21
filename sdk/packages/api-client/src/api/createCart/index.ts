import { Endpoints } from '../../types';

export const createCart: Endpoints['createCart'] = async (context, params) => {
  console.log('createCart has been called');

  const { data } = await context.client.post('/store/carts');
  return { data: data };
};
