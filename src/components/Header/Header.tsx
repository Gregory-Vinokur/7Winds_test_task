import styles from './Header.module.scss';
import MenuIcon from '../../assets/MenuIcon.svg?react';
import MoveBackIcon from '../../assets/MoveBackIcon.svg?react';

const Header = () => {
  return (
    <header className={styles.header}>
      <MenuIcon />
      <MoveBackIcon />
      <ul>
        <li className={styles.active}>Просмотр</li>
        <li>Управление</li>
      </ul>
    </header>
  );
};

export default Header;
