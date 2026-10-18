import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function MainLayout() {
  return (
    <div className="App">
      <Header />
      {/* 여기 안에 라우트별 페이지가 바뀌어 들어옴 */}
      <Outlet />
      <Footer />
    </div>
  )
}
export default MainLayout
