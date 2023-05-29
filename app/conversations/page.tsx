'use client'

import clsx from 'clsx'
import useConversation from '@/app/hooks/useConversation'

import EmptyState from '@/app/components/EmptyState'

interface pageProps {}

const Home: React.FC<pageProps> = ({}) => {
  const { isOpen } = useConversation()

  return (
    <div className={clsx('h-full lg:block lg:pl-80', isOpen ? 'block' : 'hidden')}>
      <EmptyState />
    </div>
  )
}

export default Home
