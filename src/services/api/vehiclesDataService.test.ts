import { toast } from 'react-toastify';
import MockAdapter from 'axios-mock-adapter';

import { getVehicles } from '@/services/api';

import { httpsClient } from './axiosConfig';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn()
  }
}));

describe('getVehicles', () => {
  let mockAxios: MockAdapter;

  beforeAll(() => {
    process.env.NEXT_PUBLIC_ENV_LESTA_APPLICATION_ID = '22716c2a0bff5e7fbced747f4c19b614';
    mockAxios = new MockAdapter(httpsClient);
  });

  afterAll(() => {
    delete process.env.NEXT_PUBLIC_ENV_LESTA_APPLICATION_ID;
    mockAxios.restore();
  });

  it('should return vehicle data and metadata', async () => {
    const step = 1;
    const limit = 10;
    const vehicleData = [
      {
        name: 'Vehicle 1',
        tier: 5,
        type: 'tank',
        nation: 'USA',
        'default_profile.hp': 1000,
        'default_profile.weight': 50,
        'default_profile.speed_forward': 50,
        'default_profile.ammo': 30,
        'default_profile.gun': 'M1 Abrams',
        'images.contour_icon': 'vehicle1.png'
      },
      {
        name: 'Vehicle 2',
        tier: 6,
        type: 'tank',
        nation: 'Germany',
        'default_profile.hp': 1200,
        'default_profile.weight': 55,
        'default_profile.speed_forward': 45,
        'default_profile.ammo': 28,
        'default_profile.gun': 'Leopard 2',
        'images.contour_icon': 'vehicle2.png'
      }
    ];
    const metadata = {
      total_count: 20,
      page_count: 2,
      current_page: 1
    };

    mockAxios
      .onGet(
        `?application_id=${process.env.NEXT_PUBLIC_ENV_LESTA_APPLICATION_ID}&limit=${limit}&page_no=${step}&fields=name,tier,type,nation,default_profile.hp,default_profile.weight,,default_profile.speed_forward,default_profile.ammo,default_profile.gun,images.contour_icon`
      )
      .reply(200, {
        data: vehicleData,
        meta: metadata
      });

    const response = await getVehicles(step, limit);
    expect(response?.data).toEqual(vehicleData);
    expect(response?.meta).toEqual(metadata);
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    const step = 1;
    const limit = 10;
    const errorMessage = 'Server error';

    mockAxios
      .onGet(
        `?application_id=${process.env.NEXT_PUBLIC_ENV_LESTA_APPLICATION_ID}&limit=${limit}&page_no=${step}&fields=name,tier,type,nation,default_profile.hp,default_profile.weight,,default_profile.speed_forward,default_profile.ammo,default_profile.gun,images.contour_icon`
      )
      .reply(500, errorMessage);

    const result = await getVehicles(step, limit);

    expect(result).toBeUndefined();
    expect(toast.error).toHaveBeenCalledWith('Server error');
  });
});
