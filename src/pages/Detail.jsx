import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Nav, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addItem } from '../store.js'
import fruit from '../db/fruit'

function Detail() {
  const { paramId } = useParams()
  const [tap, setTap] = useState(0)
  const [fade2, setFade2] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const t = setTimeout(() => setFade2('end'), 10)
    return () => {
      clearTimeout(t)
      setFade2('')
    }
  }, [])

  // 훅 호출 이후에 상품 유효성 체크
  const selproduct = fruit.find((x) => x.id === Number(paramId))
  if (!selproduct) return <div>해당 상품이 존재하지 않습니다.</div>
  const { id, imgUrl, title, content, price } = selproduct

  return (
    <div className={'container start ' + fade2}>
      <div className="row" style={{ marginBottom: '50px' }}>
        <div className="col-md-6">
          <img src={'/' + imgUrl} width="100%" alt={title} />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{title}</h4>
          <p>{content}</p>
          <p>{price}</p>
          <Button
            variant="primary"
            style={{ marginRight: '10px' }}
            onClick={() =>
              dispatch(addItem({ id, imgurl: imgUrl.replace('img/', ''), name: title, count: 1 }))
            }
          >
            주문하기
          </Button>
          <Link to="/cart">
            <Button variant="outline-success">주문상품 확인하기</Button>
          </Link>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="link0">
        {[0, 1, 2].map((n) => (
          <Nav.Item key={n}>
            <Nav.Link eventKey={'link' + n} onClick={() => setTap(n)}>
              버튼{n}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <TabContent tap={tap} />
    </div>
  )
}

function TabContent({ tap }) {
  const [fade, setFade] = useState('')
  useEffect(() => {
    const t = setTimeout(() => setFade('end'), 10)
    return () => {
      clearTimeout(t)
      setFade('')
    }
  }, [tap])
  return <div className={'start ' + fade}>{['내용0', '내용1', '내용2'][tap]}</div>
}
export default Detail
