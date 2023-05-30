'use client'

import { type } from 'os'
import { FieldErrors, UseFormRegister, FieldValues } from 'react-hook-form'

interface MessageInputProps {
  id: string
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  type?: string
  required?: boolean
  placeholder?: string
}

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  register,
  errors,
  type = 'text',
  required = false,
  placeholder = '',
}) => {
  return (
    <div className="relative w-full">
      <input
        className="
          w-full
          rounded-full
          bg-neutral-100
          px-4
          py-2
          font-light
          text-black
          focus:outline-none
        "
        type={type}
        id={id}
        autoComplete={id}
        placeholder={placeholder}
        {...register(id, { required })}
      />
    </div>
  )
}

export default MessageInput
