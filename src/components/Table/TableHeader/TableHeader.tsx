import styles from './TableHeader.module.scss';

const TableHeader = () => {
  return (
    <thead>
      <tr className={styles.tableHeader}>
        <th>Уровень</th>
        <th>Наименование работ</th>
        <th>Основная з/п</th>
        <th>Оборудование</th>
        <th>Накладные расходы</th>
        <th>Сметная прибыль</th>
      </tr>
    </thead>
  );
};

export { TableHeader };
