import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Block, ToggleSwitch } from '../../../../UI';
import { selectExtraServices, setIntercityCalls } from '../../store/slice';
export const ExtraServices: FC = () => {
  const dispatch = useDispatch();
  const { intercityCalls } = useSelector(selectExtraServices);
  return (
    <section>
      <h2>Дополнительно</h2>
      <ul>
        <li>
          <Block>
            <ToggleSwitch
              id="intercityCalls"
              name="intercityCalls"
              label="Междугородние звонки"
              isChecked={intercityCalls}
              onChange={(isChecked) => dispatch(setIntercityCalls(isChecked))}
            />
          </Block>
        </li>
      </ul>
    </section>
  );
};
