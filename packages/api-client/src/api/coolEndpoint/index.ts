import { Endpoints } from '../../types';

export const coolEndpoint: Endpoints['coolEndpoint'] = async (
  context,
  params
) => {
  console.log('coolEndpoint has been called');

  return JSON.stringify(context);
};
