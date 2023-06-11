import styles from './PieChart.module.css'
import { Progress, Space } from 'antd';
const PieChart = (props) => (
  <Space>
    <Progress className={styles.pie} type="circle" strokeColor='#374552' strokeWidth='10' size={200} percent={props.value} />
  </Space>
);
export default PieChart;