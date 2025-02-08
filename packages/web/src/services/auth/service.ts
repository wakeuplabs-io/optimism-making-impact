import { fetcher } from '@/lib/fetcher';
import { AxiosInstance } from 'axios';
import { ValidateRequest, ValidateResponse } from './schemas';

const validateEndpoint = '/auth/validate';

class Service {
  private static instance: Service;
  private fetcher: AxiosInstance;

  constructor(fetcher: AxiosInstance) {
    this.fetcher = fetcher;
  }

  static getInstance(fetcher: AxiosInstance) {
    if (!Service.instance) {
      Service.instance = new Service(fetcher);
    }
    return Service.instance;
  }

  // TODO: IMPROVE RESPONSE TYPING
  async validate(data: ValidateRequest): Promise<{ status: 'success'; user: ValidateResponse } | { status: 'error' }> {
    try {
      const response = await this.fetcher.post(validateEndpoint, data);
      return {
        status: 'success',
        user: response.data.data,
      };
    } catch {
      return {
        status: 'error',
      };
    }
  }
}

export const AuthService = Service.getInstance(fetcher);
