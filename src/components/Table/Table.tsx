import { useSelector } from 'react-redux';
import { useGetTreeRowsQuery } from '../../store/api/index';
import styles from './Table.module.scss';
import TableHeader from './TableHeader/TableHeader';
import TableRow from './TableRow/TableRow';
import { IState } from '../../interfaces/IState';
import { Fragment } from 'react';
import { IRow } from '../../interfaces/IRow';

const Table = () => {
  const { data: serverSideRows } = useGetTreeRowsQuery();
  const { clientSideRows } = useSelector((state: IState) => state.rows);

  const renderRows = (rows: IRow[], level: number) => {
    return rows.map((row, i) => (
      <Fragment key={row.id}>
        <TableRow
          row={row}
          level={level}
          hasChildren={
            !!row.child?.length ||
            !!clientSideRows.length ||
            i < rows.length - 1
          }
        />
        {renderRows(row.child || [], level + 1)}
      </Fragment>
    ));
  };

  function findDeepestId(row: IRow): number | undefined {
    if (row.child && row.child.length > 0) {
      return row.child[0].id;
    } else {
      return row.id;
    }
  }

  function calculateLevel(row: IRow): number {
    let level = 2;
    let currentRow = row;

    while (currentRow.child && currentRow.child.length > 0) {
      level++;
      currentRow = currentRow.child[0];
    }

    return level;
  }

  return (
    <table className={styles.table}>
      <TableHeader />
      <tbody>
        {serverSideRows && !serverSideRows.length && (
          <TableRow
            level={1}
            isNew={true}
            parentId={
              serverSideRows
                ? findDeepestId(serverSideRows[serverSideRows.length - 1] || {})
                : null
            }
          />
        )}
        {serverSideRows &&
          serverSideRows.map((row, i) => (
            <Fragment key={row.id}>
              <TableRow
                row={row}
                level={1}
                hasChildren={
                  !!serverSideRows[i].child?.length ||
                  !!clientSideRows.length ||
                  i < serverSideRows.length - 1
                }
                parentId={
                  serverSideRows
                    ? findDeepestId(
                        serverSideRows[serverSideRows.length - 1] || {}
                      )
                    : null
                }
              />
              {renderRows(row.child || [], 2)}
            </Fragment>
          ))}
        {!!clientSideRows.length && (
          <TableRow
            row={clientSideRows[0]}
            parentId={
              serverSideRows
                ? findDeepestId(serverSideRows[serverSideRows.length - 1] || {})
                : null
            }
            level={
              serverSideRows
                ? calculateLevel(
                    serverSideRows[serverSideRows.length - 1] || {}
                  )
                : 2
            }
            isNew={true}
          />
        )}
      </tbody>
    </table>
  );
};

export default Table;
