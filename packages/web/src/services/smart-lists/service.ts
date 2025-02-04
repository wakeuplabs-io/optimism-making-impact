import { fetcher } from '@/lib/fetcher';
import { SmartList } from '@/types/smart-lists';
import { AxiosInstance } from 'axios';

const attributesEndpoint = '/smart-lists';

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

  async getByRoundId(roundId: number): Promise<{ smartLists: SmartList[] }> {
    return this.fetcher.get(attributesEndpoint + `/by-round/${roundId}`).then((res) => res.data.data);
  }
}

export const SmartListsService = Service.getInstance(fetcher);
