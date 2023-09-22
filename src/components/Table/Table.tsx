import styles from './Table.module.scss';
import TableHeader from './TableHeader/TableHeader';
import TableRow from './TableRow/TableRow';

const Table = () => {
  return (
    <table className={styles.table}>
      <TableHeader />
      <tbody>
        <TableRow level={1} hasChildren={true} />
        <TableRow level={2} hasChildren={true} />
        <TableRow level={3} hasChildren={true} />
        <TableRow level={3} />
      </tbody>
    </table>
  );
};

export default Table;
