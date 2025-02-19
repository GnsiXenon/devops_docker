import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function colonnevertebrale() {
  return (
    <>
    <main className='grid grid-cols-1 min-h-screen content-between'>
      <Header />
      <div className="flex flex-col items-center p-24">
        <h1 className='text-5xl mb-40'>
          Bienvenue à Nantes Ynov Campus !
        </h1>
        <div className='flex space-x-40 text-gray'>
          <div className='grid justify-items-center'>
            <div className='mb-4'>
              Envie de tester votre connaissance du campus?
            </div>
            <Link href='/game' className='border-4 rounded-lg border-blue p-2 w-fit hover:border-grayblue hover:animate-pulse'>
              Accédez à notre jeu
            </Link>
          </div>
          <div className='grid justify-items-center'>
            <div className='mb-4'>
              Besoin d'une salle?
            </div>
            <Link href='/dispo' className='border-4 rounded-lg border-blue p-2 w-fit hover:border-grayblue hover:animate-pulse'>
              Accédez au répertoire des salles
            </Link>
          </div>
        </div>
      </div>
      <Footer/>
      </main></>
  )
}
