import { Endpoints } from '../../types';

export const updateShippingAddress: Endpoints['updateShippingAddress'] = async (
  context,
  params
) => {
  console.log('updateShippingAddress has been called');
  console.log(params);
  const body = {
    first_name: params.first_name,
    last_name: params.last_name,
    address_1: params.address_1,
    address_2: params.address_2,
    city: params.city,
    country_code: params.country_code,
    postal_code: params.postal_code,
    province: params.province,
  };

  const { data } = await context.client.post(
    '/store/customers/me/addresses',
    body,
    {
      headers: {
        Cookie: `connect.sid={${params.sid}}`,
      },
    }
  );
  return { data: data };
};
