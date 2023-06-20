import { Endpoints } from '../../types';

export const hello: Endpoints['hello'] = async (context, params) => {
  console.log('hello has been called');
  const { data } = await context.client.get('/hello');
  return { data: data };
};
