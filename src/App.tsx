import { Main } from './components/Main';
import { Sidebar } from './components/Sidebar';
import styles from './App.module.scss';
import { Header } from './components/Header';

function App() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Sidebar />
        <Main />
      </main>
    </>
  );
}

export default App;
