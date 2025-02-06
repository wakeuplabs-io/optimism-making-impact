import { fetcher } from '@/lib/fetcher';
import { AxiosInstance } from 'axios';
import { LoginRequest } from './schemas';

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
  async validate(data: LoginRequest) {
    return this.fetcher.post(validateEndpoint, data).then((rest) => rest.data);
  }
}

export const AuthService = Service.getInstance(fetcher);
