import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addCount, decreaseCount, deleteItem, sortName } from '../store.js'

const imgStyle = { border: '1px solid #ddd', width: '100px', height: '80px', cursor: 'pointer' }
const mid = { verticalAlign: 'middle', textAlign: 'center' }

function Cart() {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12" style={{ textAlign: 'center' }}>
          <h5 style={{ padding: '50px' }}>장바구니</h5>
          <Table>
            <thead>
              <tr>
                <th>id</th>
                <th>상품이미지</th>
                <th>상품명</th>
                <th>수량</th>
                <th>변경하기</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(({ id, imgurl, name, count }) => (
                <tr key={id}>
                  <td style={mid}>{id}</td>
                  <td>
                    <Link to={`/detail/${id}`}>
                      <img src={`/img/${imgurl}`} style={imgStyle} alt={name} />
                    </Link>
                  </td>
                  <td style={mid}>{name}</td>
                  <td style={mid}>{count}</td>
                  <td style={mid}>
                    <Button onClick={() => dispatch(addCount(id))} variant="outline-success" style={{ marginRight: '10px' }}> + </Button>
                    <Button onClick={() => dispatch(decreaseCount(id))} variant="outline-warning" style={{ marginRight: '10px' }}> - </Button>
                    <Button onClick={() => dispatch(deleteItem(id))} variant="outline-danger"> 상품삭제 </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="outline-primary" onClick={() => dispatch(sortName())}> 이름순정렬 </Button>
        </div>
      </div>
    </div>
  )
}
export default Cart
