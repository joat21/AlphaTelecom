import axios from 'axios';

export const fetchTariffs = async () => {
  const { data } = await axios.get(
    'https://16573c0696a6082f.mokky.dev/tariffs'
  );

  return data;
};
