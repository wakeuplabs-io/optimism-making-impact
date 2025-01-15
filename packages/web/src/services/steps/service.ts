import { fetcher } from '@/lib/fetcher';
import { CreateStepBody, UpdateStepBody } from '@/services/steps/schemas';
import { AxiosInstance } from 'axios';

const stepsEndpoint = '/steps';

export class StepsServiceClass {
  private static instance: StepsServiceClass;
  private fetcher: AxiosInstance;

  constructor(fetcher: AxiosInstance) {
    this.fetcher = fetcher;
  }

  static getInstance(fetcher: AxiosInstance) {
    if (!StepsServiceClass.instance) {
      StepsServiceClass.instance = new StepsServiceClass(fetcher);
    }
    return StepsServiceClass.instance;
  }

  async getByRoundId(roundId: number) {
    return this.fetcher.get(stepsEndpoint + `/${roundId}`).then((res) => res.data);
  }

  async create(data: CreateStepBody) {
    return this.fetcher.post(stepsEndpoint, data).then((res) => res.data);
  }

  async update(id: number, data: UpdateStepBody) {
    return this.fetcher.put(stepsEndpoint + `/${id}`, data).then((res) => res.data);
  }

  async deleteOne(id: number) {
    return this.fetcher.delete(stepsEndpoint + `/${id}`).then((res) => res.data);
  }
}

export const StepsService = StepsServiceClass.getInstance(fetcher);
