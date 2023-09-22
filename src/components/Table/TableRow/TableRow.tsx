import TableCell from '../TableCell/TableCell';
import styles from './TableRow.module.scss';
import TableIcons from './../TableIcons/TableIcons';
import { useState } from 'react';

type TableProps = {
  level: number;
  hasChildren?: boolean;
};

const TableRow = ({ level, hasChildren = false }: TableProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const onToggleEdit = () => {
    setIsEdit(true);
  };
  return (
    <tr className={styles.row}>
      <TableCell>
        <TableIcons level={level} hasChildren={hasChildren} />
      </TableCell>
      <TableCell>
        {!isEdit && (
          <span onDoubleClick={onToggleEdit}>Южная строительная площадка</span>
        )}
        {isEdit && (
          <input
            className={`${styles.inputNumber} ${styles.inputString}`}
            value={'Южная строительная площадка'}
          />
        )}
      </TableCell>
      <TableCell>
        {!isEdit && <span onDoubleClick={onToggleEdit}>20348</span>}
        {isEdit && <input className={styles.inputNumber} value={20348} />}
      </TableCell>
      <TableCell>
        {!isEdit && <span onDoubleClick={onToggleEdit}>1750</span>}
        {isEdit && <input className={styles.inputNumber} value={1750} />}
      </TableCell>
      <TableCell>
        {!isEdit && <span onDoubleClick={onToggleEdit}>108.7</span>}
        {isEdit && <input className={styles.inputNumber} value={108.7} />}
      </TableCell>
      <TableCell>
        {!isEdit && <span onDoubleClick={onToggleEdit}>1209122.5</span>}
        {isEdit && <input className={styles.inputNumber} value={1209122.5} />}
      </TableCell>
    </tr>
  );
};

export default TableRow;
