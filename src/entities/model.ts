export interface ServiceData {
  id: string;
  label: string;
}

export interface BasicServiceData extends ServiceData {
  measureUnit: string;
}

export interface UnlimitedAppData extends ServiceData {
  imageUrl: string;
  labelForTariffOverview: string;
}

export interface ExtraServiceData extends ServiceData {
  imageUrl: string;
  labelForTariffOverview: string;
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

export enum UserRole {
  CLIENT = 'client',
  ADMIN = 'admin',
}

export interface Remainder {
  id: number;
  internet: number;
  minutes: number;
  sms: number;
}
