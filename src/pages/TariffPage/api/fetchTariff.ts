import axios from 'axios';

export const fetchTariff = async (id: string) => {
  const { data } = await axios.get(
    `https://16573c0696a6082f.mokky.dev/tariffs/${id}`
  );

  return data;
};
