import TableCell from '../TableCell/TableCell';
import styles from './TableRow.module.scss';
import TableIcons from '../TableIcons/TableIcons';
import { useState, useEffect } from 'react';
import {
  useCreateRowMutation,
  useUpdateRowMutation,
} from '../../../store/api/index';
import { IRow } from '../../../interfaces/IRow';
import { useDispatch } from 'react-redux';
import { resetClientSideRows } from '../../../store/rowSlice/index';

type TableProps = {
  level: number;
  hasChildren?: boolean;
  row?: IRow;
  isNew?: boolean;
  parentId?: number | null;
};

const TableRow = ({
  row,
  level,
  parentId,
  isNew = false,
  hasChildren = false,
}: TableProps) => {
  const [createRow] = useCreateRowMutation();
  const [updateRow] = useUpdateRowMutation();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(isNew);
  const [rowData, setRowData] = useState({
    rowName: row?.rowName.toLocaleString() || '',
    salary: row?.salary.toLocaleString() || 0,
    equipmentCosts: row?.equipmentCosts.toLocaleString() || 0,
    overheads: row?.overheads.toLocaleString() || 0,
    estimatedProfit: row?.estimatedProfit.toLocaleString() || 0,
  });

  useEffect(() => {
    if (
      !rowData.rowName &&
      rowData.salary === 0 &&
      rowData.equipmentCosts === 0 &&
      rowData.overheads === 0 &&
      rowData.estimatedProfit === 0
    ) {
      setIsEdit(true);
    }
  }, [
    rowData.equipmentCosts,
    rowData.estimatedProfit,
    rowData.overheads,
    rowData.rowName,
    rowData.salary,
  ]);

  useEffect(() => {
    setRowData({
      rowName: row?.rowName.toLocaleString() || '',
      salary: row?.salary.toLocaleString() || 0,
      equipmentCosts: row?.equipmentCosts.toLocaleString() || 0,
      overheads: row?.overheads.toLocaleString() || 0,
      estimatedProfit: row?.estimatedProfit.toLocaleString() || 0,
    });
  }, [row]);

  const onToggleEdit = () => {
    setIsEdit(true);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const filteredValue =
      name !== 'rowName' ? value.replace(/[^0-9.]/g, '') : value;
    setRowData({
      ...rowData,
      [name]: filteredValue,
    });
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newData: IRow = {
        equipmentCosts: +rowData.equipmentCosts || 0,
        estimatedProfit: +rowData.estimatedProfit || 0,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        overheads: +rowData.overheads,
        parentId: parentId || null,
        rowName: rowData.rowName,
        salary: +rowData.salary,
        supportCosts: 0,
        total: 0,
        child: [],
      };

      if (isNew) {
        dispatch(resetClientSideRows());
        await createRow(newData);
      } else {
        await updateRow({ rID: row!.id, row: newData });
      }
      setIsEdit(false);
    }
  };

  return (
    <tr className={styles.row}>
      <TableCell>
        <TableIcons
          rId={row?.id}
          level={level}
          hasChildren={hasChildren}
          isEdit={isEdit}
        />
      </TableCell>
      <TableCell>
        {!isEdit && <span onDoubleClick={onToggleEdit}>{rowData.rowName}</span>}
        {isEdit && (
          <input
            className={`${styles.inputNumber} ${styles.inputString}`}
            name="rowName"
            value={rowData.rowName}
            onChange={onInputChange}
            onKeyDown={handleKeyPress}
          />
        )}
      </TableCell>
      <TableCell>
        {!isEdit && <span onDoubleClick={onToggleEdit}>{rowData.salary}</span>}
        {isEdit && (
          <input
            className={styles.inputNumber}
            name="salary"
            value={rowData.salary}
            onChange={onInputChange}
            onKeyDown={handleKeyPress}
          />
        )}
      </TableCell>
      <TableCell>
        {!isEdit && (
          <span onDoubleClick={onToggleEdit}>{rowData.equipmentCosts}</span>
        )}
        {isEdit && (
          <input
            className={styles.inputNumber}
            name="equipmentCosts"
            value={rowData.equipmentCosts}
            onChange={onInputChange}
            onKeyDown={handleKeyPress}
          />
        )}
      </TableCell>
      <TableCell>
        {!isEdit && (
          <span onDoubleClick={onToggleEdit}>{rowData.overheads}</span>
        )}
        {isEdit && (
          <input
            className={styles.inputNumber}
            name="overheads"
            value={rowData.overheads}
            onChange={onInputChange}
            onKeyDown={handleKeyPress}
          />
        )}
      </TableCell>
      <TableCell>
        {!isEdit && (
          <span onDoubleClick={onToggleEdit}>{rowData.estimatedProfit}</span>
        )}
        {isEdit && (
          <input
            className={styles.inputNumber}
            name="estimatedProfit"
            value={rowData.estimatedProfit}
            onChange={onInputChange}
            onKeyDown={handleKeyPress}
          />
        )}
      </TableCell>
    </tr>
  );
};

export default TableRow;
