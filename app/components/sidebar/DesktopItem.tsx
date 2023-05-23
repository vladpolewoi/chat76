'use client'

import clsx from 'clsx'
import Link from 'next/link'

interface DesktopItemProps {
  href: string
  label: string
  icon: any
  active?: boolean
  onClick?: () => void
}

const DesktopItem: React.FC<DesktopItemProps> = ({ href, label, icon: Icon, active, onClick }) => {
  function handleClick() {
    if (onClick) {
      return onClick()
    }
  }
  return (
    <li onClick={handleClick}>
      <Link
        className={clsx(
          `
          group
          flex
          gap-x-3
          rounded-md
          p-3
          text-sm
          font-semibold
          leading-6
          text-gray-500
          hover:bg-gray-100
          hover:text-black
        `,
          active && 'bg-gray-100 text-black',
        )}
        href={href}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  )
}

export default DesktopItem
