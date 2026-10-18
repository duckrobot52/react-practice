import { useNavigate } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

const Product = ({ fruit }) => {
  const { id, title, price, imgUrl, content } = fruit
  const navigate = useNavigate()
  return (
    <div className="col-md-4" style={{ marginBottom: '50px' }}>
      <Nav.Link onClick={() => navigate('/detail/' + id)} className="c1">
        <img src={import.meta.env.BASE_URL + imgUrl} width="80%" alt={title} />
        <h5 style={{ marginTop: '10px' }}>{title}</h5>
        <p>{content}</p>
        <span>{price}</span>
      </Nav.Link>
    </div>
  )
}
export default Product
