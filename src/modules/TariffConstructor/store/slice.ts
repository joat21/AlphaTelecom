import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { Tariff } from '../../../entities/model';

interface TariffConstructorState {
  tariff: Tariff;
}

type Service = {
  amount?: number;
  price: number;
};

type PriceList = Record<string, Service>;

const priceList: PriceList = {
  internet: {
    amount: 5,
    price: 30,
  },
  minutes: {
    amount: 50,
    price: 30,
  },
  sms: {
    amount: 50,
    price: 30,
  },
  unlimitedSocials: {
    price: 100,
  },
  unlimitedVideo: {
    price: 80,
  },
  unlimitedMusic: {
    price: 60,
  },
  intercityCalls: {
    price: 60,
  },
};

const getPriceDifference = (
  newValue: number | boolean,
  service: Service,
  value?: number
): number => {
  if (typeof newValue === 'boolean') {
    return newValue ? service.price : -service.price;
  }

  if (
    typeof value === 'number' &&
    typeof newValue === 'number' &&
    service.amount
  ) {
    const amountDifference = newValue - value;
    return (amountDifference / service.amount) * service.price;
  }

  return 0;
};

const initialState: TariffConstructorState = {
  tariff: {
    id: 0,
    title: 'constructor',
    basicServices: {
      internet: 5,
      minutes: 250,
      sms: 50,
    },
    unlimitedApps: {
      unlimitedSocials: false,
      unlimitedVideo: false,
      unlimitedMusic: false,
    },
    extraServices: {
      intercityCalls: false,
    },
    price: 210,
  },
};

export const tariffConstructorSlice = createSlice({
  name: 'tariffConstructor',
  initialState,
  reducers: {
    setInternet(state, action: PayloadAction<number>) {
      state.tariff.price += getPriceDifference(
        action.payload,
        priceList.internet,
        state.tariff.basicServices.internet
      );
      state.tariff.basicServices.internet = action.payload;
    },

    setMinutes(state, action: PayloadAction<number>) {
      state.tariff.price += getPriceDifference(
        action.payload,
        priceList.minutes,
        state.tariff.basicServices.minutes
      );
      state.tariff.basicServices.minutes = action.payload;
    },

    setSms(state, action: PayloadAction<number>) {
      state.tariff.price += getPriceDifference(
        action.payload,
        priceList.sms,
        state.tariff.basicServices.sms
      );
      state.tariff.basicServices.sms = action.payload;
    },

    setUnlimitedSocials(state, action: PayloadAction<boolean>) {
      state.tariff.unlimitedApps.unlimitedSocials = action.payload;
      state.tariff.price += getPriceDifference(
        action.payload,
        priceList.unlimitedSocials
      );
    },

    setUnlimitedVideo(state, action: PayloadAction<boolean>) {
      state.tariff.unlimitedApps.unlimitedVideo = action.payload;
      state.tariff.price += getPriceDifference(
        action.payload,
        priceList.unlimitedVideo
      );
    },

    setUnlimitedMusic(state, action: PayloadAction<boolean>) {
      state.tariff.unlimitedApps.unlimitedMusic = action.payload;
      state.tariff.price += getPriceDifference(
        action.payload,
        priceList.unlimitedMusic
      );
    },

    setIntercityCalls(state, action: PayloadAction<boolean>) {
      state.tariff.extraServices.intercityCalls = action.payload;
      state.tariff.price += getPriceDifference(
        action.payload,
        priceList.intercityCalls
      );
    },
  },
});

export const selectBasicSbasicServicesServices = (state: RootState) =>
  state.tariffConstructor.tariff.basicServices;
export const selectUnlimitedApps = (state: RootState) =>
  state.tariffConstructor.tariff.unlimitedApps;
export const selectExtraServices = (state: RootState) =>
  state.tariffConstructor.tariff.extraServices;
export const selectPrice = (state: RootState) =>
  state.tariffConstructor.tariff.price;

export const {
  setInternet,
  setMinutes,
  setSms,
  setUnlimitedSocials,
  setUnlimitedMusic,
  setUnlimitedVideo,
  setIntercityCalls,
} = tariffConstructorSlice.actions;

export default tariffConstructorSlice.reducer;
