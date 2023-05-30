'use client'

import { Message, User } from '@prisma/client'

interface BodyProps {
  messages?: (Message & {
    seen: User[]
    sender: User
  })[]
}

const Body: React.FC<BodyProps> = ({ messages }) => {
  return <div className="flex-1 overflow-y-auto">Body</div>
}

export default Body
