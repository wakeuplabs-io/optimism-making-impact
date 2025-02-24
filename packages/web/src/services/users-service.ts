import { fetcher } from '@/lib/fetcher';
import { AxiosInstance } from 'axios';

const usersEndpoint = '/users';

export type Editors = {
  email: string;
  role: Role;
};

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

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
      .get<{ data: { users: Editors[] } }>(usersEndpoint, { params: { role: Role.ADMIN } })
      .then((res) => res.data.data.users.map((user: Editors) => user.email));
  }
}

export const UsersService = UsersServiceClass.getInstance(fetcher);
