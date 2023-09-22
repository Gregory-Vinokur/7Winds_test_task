import styles from './TableCell.module.scss';

type TableCellProps = {
  children: React.ReactNode;
};

const TableCell = ({ children }: TableCellProps) => {
  return <td className={styles.cell}>{children}</td>;
};

export default TableCell;
