import { fetcher } from '@/lib/fetcher';
import { AxiosInstance } from 'axios';

const usersEndpoint = '/users';

type User = {
  createdAt: string;
  email: string;
  updatedAt: string;
  whiteListed: boolean;
};

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
    return this.fetcher.post(`${usersEndpoint}/grant-admin-role`, {
      ...data,
    });
  }

  async revokeAdmin(data: { email: string }) {
    return this.fetcher.post(`${usersEndpoint}/revoke-admin-role`, {
      ...data,
    });
  }

  async getEditors() {
    return this.fetcher
      .get<{ data: { users: User[] } }>(usersEndpoint, { params: { role: 'admin' } })
      .then((res) => res.data.data.users.map((user: User) => user.email));
  }
}

export const UsersService = UsersServiceClass.getInstance(fetcher);
