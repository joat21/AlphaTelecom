type BasicServices = {
  internet: number;
  minutes: number;
  sms: number;
};

type UnlimitedApps = {
  unlimitedSocials: boolean;
  unlimitedVideo: boolean;
  unlimitedMusic: boolean;
};

type ExtraServices = {
  intercityCalls: boolean;
};

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
