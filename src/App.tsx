import * as lessStyles from '@/App.less';

function App() {
  return <div className={lessStyles['lessBox']}>
    <div className={lessStyles['box']}>
      Hello East_White
    </div>
  </div>
}

// console.log('NODE_ENV', process.env.NODE_ENV)
// console.log('BASE_ENV', process.env.BASE_ENV)
// console.log("process.env", process.env);

export default App
