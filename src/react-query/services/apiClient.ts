import axios, { AxiosInstance } from 'axios';

class ApiClient {
  private endpoint: string;
  private client: AxiosInstance;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.client = axios.create({
      baseURL: this.endpoint,
    });
  }

  async getAll<T>(): Promise<T[]> {
    const response = await this.client.get<T[]>('');
    return response.data;
  }

  async post<T>(data: T): Promise<T> {
    const response = await this.client.post<T>('', data);
    return response.data;
  }

}

export default ApiClient;
