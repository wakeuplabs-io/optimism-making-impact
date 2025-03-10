import { fetcher } from '@/lib/fetcher';
import { CreateItemBody, UpdateItemBody } from '@optimism-making-impact/schemas';
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

  async update(itemId: number, data: UpdateItemBody) {
    return this.fetcher.put(itemsEndpoint + `/${itemId}`, data).then((res) => res.data);
  }

  async deleteOne(itemId: number) {
    return this.fetcher.delete(itemsEndpoint + `/${itemId}`).then((res) => res.data);
  }
}

export const ItemsService = Service.getInstance(fetcher);
