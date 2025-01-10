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
    CLIENT: '/auth/client',
    ADMIN: '/auth/admin',
  },
  CLIENT: {
    PROFILE: 'client/profile',
  },
  ADMIN: {
    BASE: '/admin',
    HOME: '',
    TARIFFS: 'tariffs',
    TARIFF_CONSTRUCTOR: 'tariff-constructor',
    TARIFF_OVERVIEW: 'tariffs/:id',
    CLIENTS: 'clients',
    PRICE_LIST: 'price-list-editor',
    CLIENT_INFO: 'clients/:id',
  },
};
