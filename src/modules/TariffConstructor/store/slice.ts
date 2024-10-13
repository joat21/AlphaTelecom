import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';

type Service = {
  amount?: number;
  price: number;
};

type PriceList = Record<string, Service>;

const generalPrice = 30;
const priceList: PriceList = {
  internet: {
    amount: 5,
    price: generalPrice,
  },
  minutes: {
    amount: 50,
    price: generalPrice,
  },
  sms: {
    amount: 50,
    price: generalPrice,
  },
  noLimitSocial: {
    price: 100,
  },
  noLimitVideo: {
    price: 80,
  },
  noLimitMusic: {
    price: 60,
  },
  intercityCalls: {
    price: 60,
  },
};

const getPriceDifference = (
  newValue: number | boolean,
  service: Service,
  value?: number,
): number => {
  if (typeof newValue === 'boolean') {
    return newValue ? service.price : -service.price;
  }

  if (typeof value === 'number' && typeof newValue === 'number' && service.amount) {
    const amountDifference = newValue - value;
    return (amountDifference / service.amount) * service.price;
  }

  return 0;
};

const initialState = {
  tariff: {
    basic: {
      internet: 5,
      minutes: 250,
      sms: 50,
    },
    noLimits: {
      noLimitSocial: false,
      noLimitVideo: false,
      noLimitMusic: false,
    },
    extra: {
      intercityCalls: false,
    },
  },
  price: 210,
};

export const tariffConstructorSlice = createSlice({
  name: 'tariffConstructor',
  initialState,
  reducers: {
    setInternet(state, action: PayloadAction<number>) {
      state.price += getPriceDifference(
        action.payload,
        priceList.internet,
        state.tariff.basic.internet,
      );
      state.tariff.basic.internet = action.payload;
    },

    setMinutes(state, action: PayloadAction<number>) {
      state.price += getPriceDifference(
        action.payload,
        priceList.minutes,
        state.tariff.basic.minutes,
      );
      state.tariff.basic.minutes = action.payload;
    },

    setSms(state, action: PayloadAction<number>) {
      state.price += getPriceDifference(action.payload, priceList.sms, state.tariff.basic.sms);
      state.tariff.basic.sms = action.payload;
    },

    setNoLimitSocial(state, action: PayloadAction<boolean>) {
      state.tariff.noLimits.noLimitSocial = action.payload;
      state.price += getPriceDifference(action.payload, priceList.noLimitSocial);
    },

    setNoLimitVideo(state, action: PayloadAction<boolean>) {
      state.tariff.noLimits.noLimitVideo = action.payload;
      state.price += getPriceDifference(action.payload, priceList.noLimitVideo);
    },

    setNoLimitMusic(state, action: PayloadAction<boolean>) {
      state.tariff.noLimits.noLimitMusic = action.payload;
      state.price += getPriceDifference(action.payload, priceList.noLimitMusic);
    },

    setIntercityCalls(state, action: PayloadAction<boolean>) {
      state.tariff.extra.intercityCalls = action.payload;
      state.price += getPriceDifference(action.payload, priceList.intercityCalls);
    },
  },
});

export const selectBasicServices = (state: RootState) => state.tariffConstructor.tariff.basic;
export const selectNoLimits = (state: RootState) => state.tariffConstructor.tariff.noLimits;
export const selectExtraServices = (state: RootState) => state.tariffConstructor.tariff.extra;

export const {
  setInternet,
  setMinutes,
  setSms,
  setNoLimitSocial,
  setNoLimitMusic,
  setNoLimitVideo,
  setIntercityCalls,
} = tariffConstructorSlice.actions;

export default tariffConstructorSlice.reducer;
