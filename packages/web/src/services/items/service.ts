import { fetcher } from '@/lib/fetcher';
import { CreateItemBody } from '@/services/items/schemas';
import { AxiosInstance } from 'axios';

const itemsEndpoint = '/items';

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

  async create(data: CreateItemBody) {
    return this.fetcher.post(itemsEndpoint, data).then((res) => res.data);
  }
}

export const ItemsService = Service.getInstance(fetcher);
