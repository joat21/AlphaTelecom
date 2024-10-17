export interface Service {
  id: string;
  label: string;
  price: number;
  amount?: number;
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
  basicServices: BasicServices;
  unlimitedApps: UnlimitedApps;
  extraServices: ExtraServices;
  price: number;
}

export interface TariffWithImage extends Tariff {
  imageUrl: string;
}
