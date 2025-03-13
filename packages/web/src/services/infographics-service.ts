import { fetcher } from '@/lib/fetcher';
import { CreateInfographicBody, UpdateInfographicBody } from '@optimism-making-impact/schemas';
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

  async create(data: CreateInfographicBody) {
    return this.fetcher.post(infographicsEndpoint, data).then((res) => res.data);
  }

  async update(id: number, data: UpdateInfographicBody) {
    return this.fetcher.put(`${infographicsEndpoint}/${id}`, data).then((res) => res.data);
  }

  async deleteOne(id: number) {
    return this.fetcher.delete(infographicsEndpoint + `/${id}`).then((res) => res.data);
  }
}

export const InfographicsService = InfographicsServiceClass.getInstance(fetcher);
