import { Switch } from 'antd';

const MaquinaSwitch = ({ estado }) => (
  <Switch 
    checkedChildren="Activated&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" 
    unCheckedChildren="Deactivated" 
    checked={estado === 1}
    onChange={() => {}}
  />
);

export default MaquinaSwitch;
