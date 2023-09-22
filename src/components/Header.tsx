import { Logo } from './Logo'

export const Header = () => {
  return (
    <header className='shadow m-10"'>
      <div className="container">
        <div className='inline-flex'>
          <Logo />
        </div>
        <div className='inline-flex flex-wrap text-right'>
          <h1 className='main-title'>Natural Disaster</h1>
          <h2 className='flex'>Report about the disaster to inform other people in adwance</h2>
        </div>
      </div>
    </header>
  )
}
