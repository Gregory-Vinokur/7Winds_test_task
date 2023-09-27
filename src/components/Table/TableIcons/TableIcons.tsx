import { useState } from 'react';
import NoteIcon from '../../../assets/NoteIcon.svg?react';
import TrashIcon from '../../../assets/TrashIcon.svg?react';
import styles from './TableIcons.module.scss';
import { useRemoveRowMutation } from '../../../store/api/index';
import { useDispatch } from 'react-redux';
import { createEmptyRow } from '../../../store/rowSlice/index';
import { TableIconsProps } from './TableIcons.types';

const TableIcons = ({ level, rId, hasChildren, isEdit }: TableIconsProps) => {
  const [showTrash, setShowTrash] = useState(false);
  const [deleteRow] = useRemoveRowMutation();
  const dispatch = useDispatch();

  const onToggleEdit = () => {
    setShowTrash((prev) => !prev);
  };

  const handleDeleteRow = async () => {
    if (rId) {
      deleteRow(rId);
    }
  };

  const handleCreateEmptyRow = () => {
    if (isEdit) {
      return;
    }
    const newRow = {
      child: [],
      equipmentCosts: 0,
      estimatedProfit: 0,
      machineOperatorSalary: 0,
      mainCosts: 0,
      materials: 0,
      mimExploitation: 0,
      overheads: 0,
      rowName: '',
      salary: 0,
      supportCosts: 0,
      total: 0,
    };
    dispatch(createEmptyRow(newRow));
  };

  return (
    <div
      className={`${styles.iconsContainer} ${level === 2 && styles.secondLevel}
      ${level >= 3 && styles.thirdLevel}
      `}
    >
      {hasChildren && (
        <div
          className={`${styles.lineDown} ${
            level === 2 && styles.lineDownSecondLevel
          }
          ${level >= 3 && styles.lineDownThirdLevel}`}
        ></div>
      )}
      {level !== 1 && (
        <div
          className={`${styles.lineRight} ${
            level >= 3 && styles.lineRightThirdLevel
          }`}
        ></div>
      )}
      <div
        className={`${styles.icons} ${showTrash && styles.showTrash}`}
        onMouseLeave={onToggleEdit}
      >
        <NoteIcon onClick={handleCreateEmptyRow} onMouseEnter={onToggleEdit} />
        {showTrash && <TrashIcon onClick={handleDeleteRow} />}
      </div>
    </div>
  );
};

export { TableIcons };
