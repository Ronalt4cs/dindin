import Image from 'next/image'
import Logo from '../assets/logo.svg'

export default function Header() {
  return (
    <header className="flex items-center py-10 pl-24">
      <Image src={Logo} alt="Logo" width={169} height={45} />
    </header>
  )
}
