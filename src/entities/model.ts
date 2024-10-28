export interface ServiceData {
  id: string;
  label: string;
}

export interface BasicServiceData extends ServiceData {
  measureUnit: string;
}

export interface UnlimitedAppData extends ServiceData {
  imageUrl: string;
}

export interface ExtraServiceData extends ServiceData {
  imageUrl: string;
}

export interface ConfigService {
  id: string;
  price: number;
}

export interface ConfigBasicService extends ConfigService {
  values: number[];
  amount: number;
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

export interface ServicesDataState {
  basicServicesData: Record<string, BasicServiceData>;
  unlimitedAppsData: Record<string, UnlimitedAppData>;
  extraServicesData: Record<string, ExtraServiceData>;
}
