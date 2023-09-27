import { useSelector } from 'react-redux';
import { useGetTreeRowsQuery } from '../../store/api/index';
import styles from './Table.module.scss';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { IState } from '../../interfaces/IState';
import { Fragment } from 'react';
import { IRow } from '../../interfaces/IRow';
import { calculateLevel, findDeepestId } from './Table.service';

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

export { Table };
