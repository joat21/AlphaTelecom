export const ROUTES = {
  PUBLIC: {
    BASE: '/',
    HOME: '',
    TARIFFS: 'tariffs',
    TARIFF_CONSTRUCTOR: 'tariff-constructor',
    TARIFF_OVERVIEW: 'tariffs/:id',
    FAQ: 'faq',
    CART: 'cart',
    CHANGE_TARIFF: 'change-tariff',
  },
  AUTH: {
    CLIENT: '/client-auth',
    ADMIN: '/admin-auth',
  },
  CLIENT: {
    PROFILE: 'client/profile',
  },
  ADMIN: {
    BASE: '/admin',
    HOME: '',
    TARIFFS: 'tariffs',
    TARIFF_CONSTRUCTOR: 'tariff-constructor',
    CLIENTS: 'clients',
    PRICE_LIST: 'price-list-editor',
    CLIENT_INFO: 'client-info',
  },
};
