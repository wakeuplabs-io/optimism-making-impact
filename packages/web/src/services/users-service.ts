import { fetcher } from '@/lib/fetcher';
import { AxiosInstance } from 'axios';

const usersEndpoint = '/users';

class UsersServiceClass {
  private static instance: UsersServiceClass;
  private fetcher: AxiosInstance;

  constructor(fetcher: AxiosInstance) {
    this.fetcher = fetcher;
  }

  static getInstance(fetcher: AxiosInstance) {
    if (!UsersServiceClass.instance) {
      UsersServiceClass.instance = new UsersServiceClass(fetcher);
    }
    return UsersServiceClass.instance;
  }

  async grantAdmin(data: { email: string }) {
    return this.fetcher.post('/grant-admin-role', {
      ...data,
    });
  }

  async revokeAdmin(data: { email: string }) {
    return this.fetcher.post('/revoke-admin-role', {
      ...data,
    });
  }

  async getEditors() {
    return this.fetcher.get(usersEndpoint, { params: { role: 'admin' } }).then((res) => res.data);
  }
}

export const UsersService = UsersServiceClass.getInstance(fetcher);
