import Footer from './Footer'
import Header from './Header'

const LayoutWrapper = ({ children }) => {
  return (
    <div className="relative flex h-screen flex-col justify-between font-sans">
      <Header />
      <main className="mb-auto">{children}</main>
      <Footer />
    </div>
  )
}
export default LayoutWrapper
