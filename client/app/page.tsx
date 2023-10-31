import Image from 'next/image';
import HomeStyles from './styles/Home.module.scss';

import Toolbar from './components/Toolbar';
import EntryTable from './components/EntryTable';
import CategoryChart from './components/CategoryChart';
import MonthlyChart from './components/MonthlyChart';
import YearlyCategoryChart from './components/YearlyCategoryChart';

export default function Home() {
  return (
    <main className={HomeStyles.main}>
      <div className={HomeStyles.main__left}>
        <Toolbar />
        <EntryTable />
      </div>
      <div className={HomeStyles.main__right}>
        <CategoryChart />
        <MonthlyChart />
        <YearlyCategoryChart />
      </div>
    </main>
  );
}
