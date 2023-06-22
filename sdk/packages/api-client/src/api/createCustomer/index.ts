import { Endpoints } from '../../types';

export const createCustomer: Endpoints['createCustomer'] = async (
  context,
  params
) => {
  console.log('createCustomer has been called');

  const body = {
    first_name: params.first_name,
    last_name: params.last_name,
    email: params.email,
    password: params.password,
  };

  const { data } = await context.client.post('/store/customers', body);
  return { data: data };
};
