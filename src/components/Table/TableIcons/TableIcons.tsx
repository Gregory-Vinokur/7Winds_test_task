import { useState } from 'react';
import NoteIcon from '../../../assets/NoteIcon.svg?react';
import TrashIcon from '../../../assets/TrashIcon.svg?react';
import styles from './TableIcons.module.scss';

type TableIconsProps = {
  level: number;
  hasChildren?: boolean;
};

const TableIcons = ({ level, hasChildren }: TableIconsProps) => {
  const [showTrash, setShowTrash] = useState(false);

  const onToggleEdit = () => {
    setShowTrash((prev) => !prev);
  };
  return (
    <div
      className={`${styles.iconsContainer} ${level === 2 && styles.secondLevel}
      ${level === 3 && styles.thirdLevel}
      `}
    >
      {hasChildren && (
        <div
          className={`${styles.lineDown} ${
            level === 2 && styles.lineDownSecondLevel
          }
          ${level === 3 && styles.lineDownThirdLevel}`}
        ></div>
      )}
      {level !== 1 && (
        <div
          className={`${styles.lineRight} ${
            level === 3 && styles.lineRightThirdLevel
          }`}
        ></div>
      )}
      <div
        className={`${styles.icons} ${showTrash && styles.showTrash}`}
        onMouseLeave={onToggleEdit}
      >
        <NoteIcon onMouseEnter={onToggleEdit} />
        {showTrash && <TrashIcon />}
      </div>
    </div>
  );
};

export default TableIcons;
