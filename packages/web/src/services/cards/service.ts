import { fetcher } from '@/lib/fetcher';
import { UpdateCardBody } from '@/services/cards/schemas';
import { CreateCardBody } from '@optimism-making-impact/schemas';
import { AxiosInstance } from 'axios';

const cardsEndpoint = '/cards';

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

  async create(data: CreateCardBody) {
    return this.fetcher.post(cardsEndpoint, data).then((res) => res.data);
  }

  async update(cardId: number, data: UpdateCardBody) {
    return this.fetcher.put(cardsEndpoint + `/${cardId}`, data).then((res) => res.data);
  }

  async deleteOne(cardId: number) {
    return this.fetcher.delete(cardsEndpoint + `/${cardId}`).then((res) => res.data);
  }
}

export const CardsService = Service.getInstance(fetcher);
