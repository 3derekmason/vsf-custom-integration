import { Endpoints } from '../../types';

export const completeCart: Endpoints['completeCart'] = async (
  context,
  params
) => {
  console.log('completeCart has been called');

  const endpoint = `/store/carts/${params.id}/complete`;
  try {
    const { data } = await context.client.post(endpoint);
    return { data: data };
  } catch (e) {
    console.log(e);
  }
};
