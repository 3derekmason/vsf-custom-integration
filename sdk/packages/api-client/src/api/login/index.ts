import { Endpoints } from '../../types';

export const login: Endpoints['login'] = async (context, params) => {
  console.log('login has been called');

  const body = {
    email: params.email,
    password: params.password,
  };

  const { data } = await context.client.post('/store/auth', body);
  return { data: data };
};
