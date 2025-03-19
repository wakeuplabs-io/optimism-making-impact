import { fetcher } from '@/lib/fetcher';
import { CompleteRound } from '@/types/rounds';
import { UpdateRoundBody } from '@optimism-making-impact/schemas';
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

  async getRounds(): Promise<CompleteRound[]> {
    return this.fetcher.get(roundsEndpoint).then((res) => res.data.data.rounds);
  }

  async createRound() {
    return this.fetcher.post(roundsEndpoint).then((res) => res.data);
  }

  async editOne(id: number, data: UpdateRoundBody) {
    return this.fetcher.put(roundsEndpoint + `/${id}`, { ...data }).then((res) => res.data);
  }
}

export const RoundsService = RoundsServiceClass.getInstance(fetcher);
