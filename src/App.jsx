import { useState } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import data from './db/fruit'
import data2 from './db/veggie'
import Product from './components/Product'
import Title from './components/Title'
import Title2 from './components/Title2'
import ComVeggie from './components/ComVeggie'

const inputStyle = { padding: '10px', marginLeft: '10px', borderRadius: '4px', border: '1px solid #ccc' }
const sorters = {
  name: (a, b) => (a.title > b.title ? 1 : -1),
  low: (a, b) => a.price - b.price,
  high: (a, b) => b.price - a.price,
}

// 메인 페이지 (MainLayout의 Outlet 자리에 index 라우트로 들어감)
function App() {
  const [fruit, setFruit] = useState(data)
  const [veggie, setVeggie] = useState(data2)
  const [count, setCount] = useState(1)
  const [input, setInput] = useState('')

  // +3개 상품 더 보기 : json을 axios로 가져오기 (1회 → veggie2, 2회 → veggie3, 3회 → 알림)
  const loadMore = () => {
    if (count >= 3) return alert('더이상 상품이 없습니다.')
    axios.get(`${import.meta.env.BASE_URL}react-data/veggie${count + 1}.json`).then((result) => {
      setVeggie([...veggie, ...result.data])
      setCount(count + 1)
    })
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="slider"></div>
      <Title />
      <div className="container">
        <div className="row">
          <div className="col-md-6" style={{ textAlign: 'left' }}>
            <input
              placeholder="상품명을 입력하세요"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              style={{ ...inputStyle, width: '250px', marginRight: '10px' }}
            />
          </div>
          <div className="col-md-6" style={{ textAlign: 'right' }}>
            <select
              value=""
              onChange={(e) => sorters[e.target.value] && setFruit([...fruit].sort(sorters[e.target.value]))}
              style={{ ...inputStyle, width: '150px' }}
            >
              <option value="">정렬 선택</option>
              <option value="low">낮은 가격순</option>
              <option value="high">높은 가격순</option>
              <option value="name">이름순</option>
            </select>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '30px' }}>
        <div className="row">
          {fruit
            .filter((item) => item.title.toLowerCase().includes(input.toLowerCase()))
            .map((ele) => (
              <Product fruit={ele} key={ele.id} />
            ))}
        </div>
      </div>

      <div className="container">
        <Title2 />
        <Button variant="outline-success" onClick={loadMore}>
          + 3개 상품 더 보기
        </Button>
      </div>
      <div className="container" style={{ marginTop: '30px' }}>
        <div className="row">
          {veggie.map((ele) => (
            <ComVeggie veggie={ele} key={ele.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default App
