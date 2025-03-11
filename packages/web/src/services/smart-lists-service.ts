import { fetcher } from '@/lib/fetcher';
import { SmartListFilter } from '@/types/smart-lists';
import { AxiosInstance } from 'axios';

const smartListFiltersEndpoint = '/smart-lists';

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

  async getByCategoryId(categoryId: number): Promise<{ smartListFilters: SmartListFilter[] }> {
    return this.fetcher.get(smartListFiltersEndpoint + `/by-category/${categoryId}`).then((res) => res.data.data);
  }
}

export const SmartListsFiltersService = Service.getInstance(fetcher);
