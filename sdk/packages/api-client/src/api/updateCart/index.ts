import { Endpoints } from '../../types';

export const updateCart: Endpoints['updateCart'] = async (context, params) => {
  console.log('updateCart has been called');

  const endpoint = `/store/carts/${params.id}`;
  console.log(params.body);
  const { data } = await context.client.post(endpoint, params.body);
  return { data: data };
};
