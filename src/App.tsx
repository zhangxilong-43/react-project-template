import * as lessStyles from '@/App.less';
import chart from '@/assets/imgs/chart.svg';
import order from '@/assets/imgs/order.png';
import avatartion from '@/assets/imgs/avatartion.png';
import flower from '@/assets/imgs/flowr.png';
import memberList from './json/mock.json';
import { useEffect, useState } from 'react';

function App() {
  const [num, setNum] = useState(99);
  const [ count, setCounts ] = useState('')
  const onChange = (e: any) => {
    setCounts(e.target.value)
  }
  console.log('memberList', memberList)

  return <div className={lessStyles['lessBox']}>
    <div className={lessStyles['box']}>
      <p onClick={() => setNum(88)}>Hello East_Whitefrefrefre</p>
      <img src={chart} alt="小于10kb的图片" />
      <img src={order} alt="大于于10kb的图片" />
      <img src={avatartion} alt="大于于10kb的图片" />
      <img src={flower} alt="大于于10kb的图片" />
      <div className={lessStyles['smallImg']}>小图片背景</div> 
      <div className={lessStyles['bigImg']}>大图片背景</div> 
      {
        memberList.map((item) => (
          <ul>
            <li>{item.name}: {item.age}</li>
            <li>-------------------------------------------{num}-----{item.age}</li>
          </ul>
        ))
      }
      <div>
        <p>受控组件</p>
        <input type="text" value={count} onChange={onChange} />
        <br />
        <p>非受控组件</p>
        <input type="text" />
    </div>
    </div>
  </div>
}

// console.log('NODE_ENV', process.env.NODE_ENV)
// console.log('BASE_ENV', process.env.BASE_ENV)
// console.log("process.env", process.env);

export default App
