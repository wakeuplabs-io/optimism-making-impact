import { fetcher } from '@/lib/fetcher';
import { Category } from '@optimism-making-impact/schemas';
import { AxiosInstance, AxiosResponse } from 'axios';

const categoriesEndpoint = '/categories';

class CategoriesServiceClass {
  private static instance: CategoriesServiceClass;
  private fetcher: AxiosInstance;

  constructor(fetcher: AxiosInstance) {
    this.fetcher = fetcher;
  }

  static getInstance(fetcher: AxiosInstance) {
    if (!CategoriesServiceClass.instance) {
      CategoriesServiceClass.instance = new CategoriesServiceClass(fetcher);
    }
    return CategoriesServiceClass.instance;
  }

  async getAll() {
    return this.fetcher.get(categoriesEndpoint).then((res) => res.data);
  }

  async getAllByRound(roundId: number) {
    return this.fetcher.get(categoriesEndpoint + `?roundId=${roundId}`).then((res) => res.data);
  }

  async createOne(data: { name: string; icon: string; roundId: number }): Promise<AxiosResponse<Category>> {
    return this.fetcher
      .post('/categories', {
        ...data,
      })
      .then((res) => res.data);
  }

  async editOne(id: number, name: string, icon: string) {
    return this.fetcher.put(`/categories/${id}`, { name, icon });
  }

  async deleteOne(categoryId: number) {
    return this.fetcher.delete(`/categories/${categoryId}`);
  }
}

export const CategoriesService = CategoriesServiceClass.getInstance(fetcher);
