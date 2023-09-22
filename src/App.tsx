import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Sidebar from './components/Sidebar/Sidebar';
import styles from './App.module.scss';

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
