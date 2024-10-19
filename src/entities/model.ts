export interface Service {
  id: string;
  label: string;
  price: number;
  amount?: number;
}

export interface BasicService extends Service {
  // id: keyof BasicServices;
  values: number[];
  amount: number;
  measureUnit: string;
}

export interface UnlimitedApp extends Service {
  // id: keyof UnlimitedApps;
}

export interface ExtraService extends Service {
  // id: keyof ExtraServices;
}

export interface BasicServices {
  internet: number;
  minutes: number;
  sms: number;
}

export interface UnlimitedApps {
  unlimitedSocials: boolean;
  unlimitedVideo: boolean;
  unlimitedMusic: boolean;
}

export interface ExtraServices {
  intercityCalls: boolean;
}

export interface Tariff {
  id: number;
  title: string;
  basicServices: Record<string, number>;
  unlimitedApps: Record<string, boolean>;
  extraServices: Record<string, boolean>;
  price: number;
}

export interface TariffWithImage extends Tariff {
  imageUrl: string;
}
