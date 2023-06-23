import { Endpoints } from '../../types';

export const createPaymentSessions: Endpoints['createPaymentSessions'] = async (
  context,
  params
) => {
  console.log('createPaymmentSessions has been called');

  const { data } = await context.client.post(
    `/store/carts/${params.id}/payment-sessions`
  );
  return { data: data };
};
