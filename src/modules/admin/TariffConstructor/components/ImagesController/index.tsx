import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Image, Input, message } from 'antd';

import { Loading } from '@components/Loading';

import { useUploadImageMutation } from '@services/cloudinaryApi';
import { setImageUrl } from '@store/TariffConstructor/slice';

import styles from './ImagesController.module.scss';

const placeholder =
  'https://res.cloudinary.com/dqmxjwhrm/image/upload/v1736498154/imagePlaceholder_n7dd61.png';

interface ImagesControllerProps {
  imageUrl: string;
  overviewImageUrl: string;
}

export const ImagesController: FC<ImagesControllerProps> = ({
  imageUrl,
  overviewImageUrl,
}) => {
  const dispatch = useDispatch();
  const [uploadImage] = useUploadImageMutation();
  const [messageApi, contextHolder] = message.useMessage();

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    imageType: 'cardImage' | 'overviewImage'
  ) => {
    const image = e.target.files?.[0];
    if (!image) return;

    try {
      const response = await uploadImage(image).unwrap();
      dispatch(setImageUrl({ imageUrl: response.url, imageType }));
      messageApi.success({
        content: 'Изображение загружено',
      });
    } catch (error) {
      console.error(error);
      messageApi.error({
        content: 'Произошла ошибка. Не удалось загрузить изображение',
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className={styles.wrapper}>
        <div className={styles.image}>
          <label htmlFor="imageUrl">Изображение на карточке тарифа</label>
          {imageUrl ? (
            <Image
              width={300}
              height={300}
              src={imageUrl}
              placeholder={<Loading />}
            />
          ) : (
            <Image width={300} height={300} src={placeholder} preview={false} />
          )}

          <Input
            id="imageUrl"
            name="imageUrl"
            type="file"
            onChange={(e) => handleInputChange(e, 'cardImage')}
          />
        </div>
        <div className={styles.image}>
          <label htmlFor="overviewImageUrl">
            Изображение на странице тарифа
          </label>
          {overviewImageUrl ? (
            <Image
              width={300}
              height={300}
              src={overviewImageUrl}
              placeholder={<Loading />}
            />
          ) : (
            <Image width={300} height={300} src={placeholder} preview={false} />
          )}
          <Input
            id="overviewImageUrl"
            name="overviewImageUrl"
            type="file"
            onChange={(e) => handleInputChange(e, 'overviewImage')}
          />
        </div>
      </div>
    </>
  );
};
