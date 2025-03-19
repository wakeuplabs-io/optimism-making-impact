import { userSchema, ValidateRequest, ValidationResponse } from './schemas';
import { fetcher } from '@/lib/fetcher';
import { AxiosInstance } from 'axios';

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

  async validate(data: ValidateRequest): Promise<ValidationResponse> {
    try {
      const response = await this.fetcher.post(validateEndpoint, data);
      const user = userSchema.parse(response.data.data);

      return { status: 'success', user };
    } catch (err) {
      console.error(err);
      return { status: 'error', user: null };
    }
  }
}

export const AuthService = Service.getInstance(fetcher);
