type BasicServices = {
  internet: number;
  minutes: number;
  sms: number;
};

type Nolimits = {
  noLimitSocial: boolean;
  noLimitVideo: boolean;
  noLimitMusic: boolean;
};

type ExtraServices = {
  intercityCalls: boolean;
};

export interface Tariff {
  basic: BasicServices;
  noLimits: Nolimits;
  extra: ExtraServices;
  price: number;
}
