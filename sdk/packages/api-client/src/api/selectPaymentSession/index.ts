import { Endpoints } from '../../types';

export const selectPaymentSession: Endpoints['selectPaymentSession'] = async (
  context,
  params
) => {
  console.log('selectPaymentSession has been called');

  const endpoint = `/store/carts/${params.id}/payment-session`;
  const { data } = await context.client.post(endpoint, {
    provider_id: params.provider_id,
  });
  return { data: data };
};
