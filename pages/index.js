import styles from '../styles/Home.module.css'

import Sidebar from '../components/sidebar'

export default function Home() {
  return (
    <>
      <Sidebar />

      <div className="container">
        <div className='alert'>
            <div className='icon'></div>
            <div>Minus 30% on the first order</div>
        </div>  

        <div className='categories'>
          
        </div>
      </div>
    </>
  )
}
