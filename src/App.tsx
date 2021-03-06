import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { HomePage } from './components/Home.page';
import { SuperHeroesPage } from './components/SuperHeroes.page';
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page';
import { RQSuperHeroPage } from './components/RQSuperHero.page';
import { RQParallelQueriesPage } from './components/RQParallelQueries.page';
import { RQDynamicParallelQueriesPage } from './components/RQDynamicParallelQueries.page';
import { RQDependantQueries } from './components/RQDependantQueries.page';
import { RQPaginatedQueriesPage } from './components/RQPaginatedQueries.page';
import { RQInfiniteQueriesPage } from './components/RQInfiniteQueries.page';

import './App.css';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/super-heroes'>Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/super-heroes' element={<SuperHeroesPage />} />
            <Route path='/rq-infinite' element={<RQInfiniteQueriesPage />} />
            <Route path='/rq-paginated' element={<RQPaginatedQueriesPage />} />
            <Route path='/rq-parallel' element={<RQParallelQueriesPage />} />
            <Route
              path='/rq-dynamic-parallel'
              element={<RQDynamicParallelQueriesPage heroIds={[1, 3]} />}
            />
            <Route
              path='/rq-dependant'
              element={<RQDependantQueries email='vishwas@example.com' />}
            />
            <Route
              path='/rq-super-heroes/:heroId'
              element={<RQSuperHeroPage />}
            />
            <Route path='/rq-super-heroes' element={<RQSuperHeroesPage />} />
            <Route path='/' element={<HomePage />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
};
