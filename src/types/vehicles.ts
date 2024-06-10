export interface IVehicles {
  images: {
    contour_icon: string;
  };
  name: string;
  nation: string;
  tier: number;
  type: string;
  default_profile: {
    hp: number;
    weight: number;
    speed_forward: number;
    ammo: {
      damage: number[];
    }[];
    gun: {
      dispersion: number;
      aim_time: number;
      fire_rate: number;
    };
  };
}

export interface IVehiclesList {
  [key: number]: IVehicles;
}
