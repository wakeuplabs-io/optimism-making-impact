import { fetcher } from '@/lib/fetcher';
import { Round } from '@/types/rounds';
import { AxiosInstance } from 'axios';

const roundsEndpoint = '/rounds';

export class RoundsServiceClass {
  private static instance: RoundsServiceClass;
  private fetcher: AxiosInstance;

  constructor(fetcher: AxiosInstance) {
    this.fetcher = fetcher;
  }

  static getInstance(fetcher: AxiosInstance) {
    if (!RoundsServiceClass.instance) {
      RoundsServiceClass.instance = new RoundsServiceClass(fetcher);
    }
    return RoundsServiceClass.instance;
  }

  async getRounds() {
    return this.fetcher.get(roundsEndpoint).then((res) => res.data);
  }

  async createRound() {
    return this.fetcher.post(roundsEndpoint).then((res) => res.data);
  }

  async editOne(id: number, data: Partial<Round>) {
    return this.fetcher.put(roundsEndpoint + `/${id}`, { ...data }).then((res) => res.data);
  }
}

export const RoundsService = RoundsServiceClass.getInstance(fetcher);
