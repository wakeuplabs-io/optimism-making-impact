import { fetcher } from '@/lib/fetcher';
import { CreateCardBody } from '@/services/cards/schemas';
import { AxiosInstance } from 'axios';

const cardsEndpoint = '/cards';

export class CardsServiceClass {
  private static instance: CardsServiceClass;
  private fetcher: AxiosInstance;

  constructor(fetcher: AxiosInstance) {
    this.fetcher = fetcher;
  }

  static getInstance(fetcher: AxiosInstance) {
    if (!CardsServiceClass.instance) {
      CardsServiceClass.instance = new CardsServiceClass(fetcher);
    }
    return CardsServiceClass.instance;
  }

  async create(data: CreateCardBody) {
    return this.fetcher.post(cardsEndpoint, data).then((res) => res.data);
  }
}

export const CardsService = CardsServiceClass.getInstance(fetcher);
