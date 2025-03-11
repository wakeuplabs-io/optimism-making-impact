import { fetcher } from '@/lib/fetcher';
import { BulkUpdateInfographicBody } from '@optimism-making-impact/schemas';
import { AxiosInstance } from 'axios';

const infographicsEndpoint = '/infographics';

export class InfographicsServiceClass {
  private static instance: InfographicsServiceClass;
  private fetcher: AxiosInstance;

  constructor(fetcher: AxiosInstance) {
    this.fetcher = fetcher;
  }

  static getInstance(fetcher: AxiosInstance) {
    if (!InfographicsServiceClass.instance) {
      InfographicsServiceClass.instance = new InfographicsServiceClass(fetcher);
    }
    return InfographicsServiceClass.instance;
  }

  async updateBulk(data: BulkUpdateInfographicBody) {
    return this.fetcher.put(infographicsEndpoint + `/bulk`, data).then((res) => res.data);
  }

  async deleteOne(id: number) {
    return this.fetcher.delete(infographicsEndpoint + `/${id}`).then((res) => res.data);
  }
}

export const InfographicsService = InfographicsServiceClass.getInstance(fetcher);
