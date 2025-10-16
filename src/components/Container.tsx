import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode
}

export const Container = ({children}:ContainerProps) => {
  return (
    <div className='max-w-300 mx-auto px-3'>{children}</div>
  )
}