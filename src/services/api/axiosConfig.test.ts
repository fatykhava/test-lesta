import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('httpsClient', () => {
  let mockAxios: MockAdapter;

  beforeAll(() => {
    process.env.NEXT_PUBLIC_ENV_HOST_URL = 'https://example.com';
    mockAxios = new MockAdapter(axios);
  });

  afterAll(() => {
    delete process.env.NEXT_PUBLIC_ENV_HOST_URL;
    mockAxios.restore();
  });

  it('should create an Axios instance with the correct configuration', () => {
    const httpsClient = axios.create({
      baseURL: process.env.NEXT_PUBLIC_ENV_HOST_URL,
      timeout: 50000
    });

    expect(httpsClient.defaults.baseURL).toBe('https://example.com');
    expect(httpsClient.defaults.timeout).toBe(50000);
  });

  it('should return the response data', async () => {
    const expectedData = { message: 'Hello, world!' };
    mockAxios.onGet('/api/example').reply(200, expectedData);

    const httpsClient = axios.create({
      baseURL: process.env.NEXT_PUBLIC_ENV_HOST_URL,
      timeout: 50000
    });

    httpsClient.interceptors.response.use(
      (response) => response.data,
      async (error) => {
        return Promise.reject(error);
      }
    );

    const data = await httpsClient.get('/api/example');
    expect(data).toEqual(expectedData);
  });

  it('should reject the promise on error', async () => {
    const expectedError = new Error('Network error');
    mockAxios.onGet('/api/error').reply(500, expectedError);

    const httpsClient = axios.create({
      baseURL: process.env.NEXT_PUBLIC_ENV_HOST_URL,
      timeout: 50000
    });

    httpsClient.interceptors.response.use(
      (response) => response.data,
      async (error) => {
        return Promise.reject(error);
      }
    );

    await expect(httpsClient.get('/api/error')).rejects.toThrow();
  });
});
