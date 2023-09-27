import styles from './TableCell.module.scss';
import { TableCellProps } from './TableCell.types';

const TableCell = ({ children }: TableCellProps) => {
  return <td className={styles.cell}>{children}</td>;
};

export { TableCell };
