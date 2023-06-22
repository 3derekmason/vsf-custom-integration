import { Endpoints } from '../../types';

export const removeLineItem: Endpoints['removeLineItem'] = async (
  context,
  params
) => {
  console.log('removeLineItem has been called');

  const id = params.id;
  const line_id = params.line_id;

  console.log(params);

  const { data } = await context.client.delete(
    `/store/carts/${id}/line-items/${line_id}`
  );
  return { data: data };
};
