import { fetcher } from '@/lib/fetcher';
import { AxiosInstance } from 'axios';

const keywordsEndpoint = '/keywords';

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

  async getByStepId(stepId: number) {
    return this.fetcher.get(keywordsEndpoint + `/${stepId}`).then((res) => res.data);
  }
}

export const KeywordsService = Service.getInstance(fetcher);
