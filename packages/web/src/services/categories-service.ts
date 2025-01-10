// packages/web/src/services/categories-service.ts
import { fetcher } from '@/lib/fetcher';
import { AxiosInstance } from 'axios';

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

  async createOne(data: { title: string; iconURL: string; roundId: number }) {
    return this.fetcher.post('/categories', {
      ...data,
    });
  }

  async editOne(id: number, name: string) {
    return this.fetcher.put(`/categories/${id}`, { id, name });
  }

  async deleteOne(categoryId: number) {
    return this.fetcher.delete(`/categories/${categoryId}`);
  }
}

export const CategoriesService = CategoriesServiceClass.getInstance(fetcher);
