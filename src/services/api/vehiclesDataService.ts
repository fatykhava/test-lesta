import { toast } from 'react-toastify';

import { IMeta, IVehiclesList } from '@/types';

import { httpsClient } from './axiosConfig';

/**
 * Retrieves a list of vehicles from the server based on the provided step and limit.
 *
 * @param {number} step - The page number to retrieve.
 * @param {number} limit - The maximum number of vehicles to retrieve per page.
 * @return {Promise<{ data: IVehiclesList[]; meta: IMeta }>} A promise that resolves to an object containing the vehicle data and metadata.
 * @throws {Error} If there is a server error.
 */

export const getVehicles = async (step: number, limit: number) => {
  try {
    const getVehiclesByPage = await httpsClient.get<never, { data: IVehiclesList; meta: IMeta }>(
      `?application_id=${process.env.NEXT_PUBLIC_ENV_LESTA_APPLICATION_ID}&limit=${limit}&page_no=${step}&fields=name,tier,type,nation,default_profile.hp,default_profile.weight,,default_profile.speed_forward,default_profile.ammo,default_profile.gun,images.contour_icon`
    );

    return {
      data: Object.values(getVehiclesByPage.data),
      meta: getVehiclesByPage.meta
    };
  } catch (err) {
    toast.error('Server error');
  }
};
