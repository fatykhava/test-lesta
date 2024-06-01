import { httpsClient } from './axiosConfig';

export class VehiclesDataService {
  public static async getVehicles(step: number) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const auth = await httpsClient.post<never, any>('/vehicles' + step);

      return auth;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(err);
    }
  }
}
