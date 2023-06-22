import { initSDK, buildModule } from '@vue-storefront/sdk';
import { medusaModule, MedusaModuleType } from '../packages/sdk/src';

const sdkConfig = {
  medusa: buildModule<MedusaModuleType>(medusaModule, {
    apiUrl: 'http://localhost:8181/medusa',
  }),
};

export const sdk = initSDK<typeof sdkConfig>(sdkConfig);
