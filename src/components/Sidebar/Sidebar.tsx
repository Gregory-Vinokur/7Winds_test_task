import styles from './Sidebar.module.scss';
import ArrowDown from '../../assets/ArrowDownIcon.svg?react';
import ItemIcon from '../../assets/ItemIcon.svg?react';
import { MENU_ITEMS } from '../../constants/constants';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div>
          <p className={styles.title}>Название проекта</p>
          <p className={styles.subTitle}>Аббревиатура</p>
        </div>
        <ArrowDown />
      </div>
      <ul>
        {MENU_ITEMS.map((item) => (
          <li key={item} className={item === 'СМР' ? styles.active : ''}>
            <ItemIcon />
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
