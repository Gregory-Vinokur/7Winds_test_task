import Table from '../Table/Table';
import styles from './Main.module.scss';

const Main = () => {
  return (
    <div className={styles.content}>
      <div className={styles.contentHeader}>
        <p>Строительно-монтажные работы</p>
      </div>
      <Table />
    </div>
  );
};

export default Main;
