import { fetcher } from '@/lib/fetcher';
import { CreateAttributeBody, UpdateAttributeBody } from '@/services/attributes/schemas';
import { AxiosInstance } from 'axios';

const attributesEndpoint = '/attributes';

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

  async create(data: CreateAttributeBody) {
    return this.fetcher.post(attributesEndpoint, data).then((res) => res.data);
  }

  async update(data: UpdateAttributeBody) {
    return this.fetcher.put(attributesEndpoint, data).then((res) => res.data);
  }

  async deleteOne(attributeId: number) {
    return this.fetcher.delete(attributesEndpoint + `/${attributeId}`).then((res) => res.data);
  }
}

export const AttributesService = Service.getInstance(fetcher);
