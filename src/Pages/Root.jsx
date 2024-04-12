import {Outlet} from "react-router-dom"
import { Navbar } from '../Components/Navbar'
import { Footer } from '../Components/Footer'


function Root() {
  return (
    <>
      <Navbar />
      <Outlet/>
      <Footer />
    </>
  )
}
export default Root
