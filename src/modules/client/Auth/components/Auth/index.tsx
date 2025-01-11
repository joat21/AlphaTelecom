import { FC, useState } from 'react';

import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton, Modal } from 'antd';

import PhoneForm from '../PhoneForm';
import VerificationCodeForm from '../VerificationCodeForm';

import styles from './Auth.module.scss';

export const Auth: FC = () => {
  const [isPhoneSubmitted, setIsPhoneSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isPhoneSubmitted ? (
        <VerificationCodeForm />
      ) : (
        <PhoneForm setIsPhoneSubmitted={setIsPhoneSubmitted} />
      )}
      <FloatButton
        icon={<QuestionCircleOutlined />}
        type="primary"
        tooltip={'Как это работает?'}
        style={{ insetInlineEnd: 54 }}
        onClick={() => setIsModalOpen(true)}
      />
      <Modal
        open={isModalOpen}
        title="Как авторизоваться в системе?"
        onCancel={() => setIsModalOpen(false)}
        footer={false}
      >
        <ol className={styles['modal-content']}>
          <li>
            После ввода номера телефона на сайте вас перенаправит в
            Telegram-бота.
          </li>
          <li>
            <p>В Telegram-боте:</p>
            <ul className={styles.steps}>
              <li>Напишите команду /start.</li>
              <li>Нажмите на кнопку "Поделиться контактом".</li>
              <li>
                Подтвердите, что вы хотите поделиться своим номером телефона.
              </li>
            </ul>
          </li>
          <li>После этого бот отправит вам код подтверждения.</li>
          <li>Сохраните этот код и вернитесь на сайт.</li>
          <li>Введите полученный код в соответствующее поле.</li>
        </ol>
      </Modal>
    </>
  );
};
