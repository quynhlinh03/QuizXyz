import { Progress } from 'antd';
const ProgressBar = (props) => (
  <>
    <Progress percent={props.value} showInfo={false} />
  </>
);
export default ProgressBar;