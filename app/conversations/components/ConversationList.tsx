'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FullConversationType } from '@/app/types'
import clsx from 'clsx'
import useConversation from '@/app/hooks/useConversation'

import { MdOutlineGroupAdd } from 'react-icons/md'

import ConversationBox from './ConversationBox'
import GroupChatModal from './GroupChatModal'
import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { pusherClient } from '@/app/libs/pusher'
import { find } from 'lodash'

interface ConversationListProps {
  initialItems: FullConversationType[]
  users: User[]
}

const ConversationList: React.FC<ConversationListProps> = ({ initialItems, users }) => {
  const router = useRouter()
  const session = useSession()
  const [items, setItems] = useState(initialItems)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { conversationId, isOpen } = useConversation()
  const pusherKey = useMemo(() => {
    return session.data?.user?.email
  }, [session?.data?.user?.email])

  useEffect(() => {
    if (!pusherKey) {
      return
    }

    pusherClient.subscribe(pusherKey)

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current
        }

        return [conversation, ...current]
      })
    }

    pusherClient.bind('conversation:new', newHandler)

    return () => {
      pusherClient.unsubscribe(pusherKey)
      pusherClient.unbind('conversation:new', newHandler)
    }
  })

  return (
    <>
      <GroupChatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} users={users} />
      <aside
        className={clsx(
          `
        fixed
        inset-y-0
        overflow-y-auto
        border-r
        border-gray-200
        pb-20
        lg:left-20
        lg:block
        lg:w-80
        lg:pb-0`,
          isOpen ? 'hidden' : 'left-0 block w-full',
        )}
      >
        <div className="px-5">
          <div className="mb-4 flex justify-between pt-4">
            <div className="text-2xl font-bold text-neutral-800">Messages</div>
            <div
              className="
                cursor-pointer
                rounded-full
                bg-gray-100
                p-2
                text-gray-600
                transition
                hover:opacity-75
              "
              onClick={() => setIsModalOpen(true)}
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox key={item.id} data={item} selected={item.id === conversationId} />
          ))}
        </div>
      </aside>
    </>
  )
}

export default ConversationList
