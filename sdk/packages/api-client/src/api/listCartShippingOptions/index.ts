import { Endpoints } from '../../types';

export const listCartShippingOptions: Endpoints['listCartShippingOptions'] =
  async (context, params) => {
    console.log('listCartShippingOptions has been called');

    const { data } = await context.client.get(
      `/store/shipping-options/${params.id}`
    );
    return { data: data };
  };
