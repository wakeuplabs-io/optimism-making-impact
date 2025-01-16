import { fetcher } from '@/lib/fetcher';
import { CreateInfographyBody, UpdateInfographyBody } from '@/services/infogrpahies/schemas';
import { AxiosInstance } from 'axios';

const stepsEndpoint = '/infographies';

export class InfographiesServiceClass {
  private static instance: InfographiesServiceClass;
  private fetcher: AxiosInstance;

  constructor(fetcher: AxiosInstance) {
    this.fetcher = fetcher;
  }

  static getInstance(fetcher: AxiosInstance) {
    if (!InfographiesServiceClass.instance) {
      InfographiesServiceClass.instance = new InfographiesServiceClass(fetcher);
    }
    return InfographiesServiceClass.instance;
  }

  async create(data: CreateInfographyBody) {
    return this.fetcher.post(stepsEndpoint, data).then((res) => res.data);
  }

  async update(id: number, data: UpdateInfographyBody) {
    return this.fetcher.put(stepsEndpoint + `/${id}`, data).then((res) => res.data);
  }

  async deleteOne(id: number) {
    return this.fetcher.delete(stepsEndpoint + `/${id}`).then((res) => res.data);
  }
}

export const InfographiesService = InfographiesServiceClass.getInstance(fetcher);
