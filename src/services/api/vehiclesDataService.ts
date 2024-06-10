import { toast } from 'react-toastify';

import { IMeta, IVehiclesList } from '@/types';

import { httpsClient } from './axiosConfig';

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
