import { fetcher } from '@/lib/fetcher';
import { CreateSmartListBody } from '@/services/smart-lists/schemas';
import { AxiosInstance } from 'axios';

const smartListsEndpoint = '/smart-lists';

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

  async create(data: CreateSmartListBody) {
    return this.fetcher.post(smartListsEndpoint, data).then((res) => res.data);
  }
}

export const SmartListsService = Service.getInstance(fetcher);
