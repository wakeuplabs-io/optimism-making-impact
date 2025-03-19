import { fetcher } from '@/lib/fetcher';
import { CompleteStep, Step } from '@/types/steps';
import { CreateStepBody, UpdateStepBody } from '@optimism-making-impact/schemas';
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

  async getOne(stepId: number): Promise<CompleteStep> {
    return this.fetcher.get(stepsEndpoint + `/${stepId}`).then((res) => res.data.data);
  }

  async getByCategoryId(categoryId: number): Promise<Step[]> {
    return this.fetcher.get(stepsEndpoint + `?categoryId=${categoryId}`).then((res) => res.data.data.steps);
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
