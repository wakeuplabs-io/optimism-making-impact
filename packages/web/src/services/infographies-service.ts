import { fetcher } from '@/lib/fetcher';
import { BulkUpdateInfographyBody } from '@optimism-making-impact/schemas';
import { AxiosInstance } from 'axios';

const infographiesEndpoint = '/infographies';

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

  async updateBulk(data: BulkUpdateInfographyBody) {
    return this.fetcher.put(infographiesEndpoint + `/bulk`, data).then((res) => res.data);
  }

  async deleteOne(id: number) {
    return this.fetcher.delete(infographiesEndpoint + `/${id}`).then((res) => res.data);
  }
}

export const InfographiesService = InfographiesServiceClass.getInstance(fetcher);
