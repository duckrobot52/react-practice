import { Outlet } from 'react-router-dom'

const AboutLayout = () => (
  <div style={{ textAlign: 'center' }}>
    <h4>회사정보</h4>
    <Outlet />
  </div>
)
export default AboutLayout
