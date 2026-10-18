import { useNavigate } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'

const Header = () => {
  const navigate = useNavigate()
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={() => navigate('/')}>과일농장</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => navigate('/')}>홈으로</Nav.Link>
          <Nav.Link onClick={() => navigate('/detail/1')}>상세페이지</Nav.Link>
          <Nav.Link onClick={() => navigate('/cart')}>장바구니</Nav.Link>
          <Nav.Link onClick={() => navigate('/about')}>회사소개</Nav.Link>
          <Nav.Link onClick={() => navigate('/board')}>게시판</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
export default Header
