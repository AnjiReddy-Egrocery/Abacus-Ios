import { registerPlugin } from '@capacitor/core';

export interface PhonePePlugin {
  init(options: {
    environment: string;
    merchantId: string;
    flowId: string;
    enableLogging: boolean;
  }): Promise<{ status: string }>;
  startTransaction(options: {
    request: string;
    appSchema: string;
    showLoaderFlag: boolean;
  }): Promise<{ status: string; data?: string }>;
}
export const PhonePePaymentPlugin = registerPlugin<PhonePePlugin>('PhonePePaymentSDK');