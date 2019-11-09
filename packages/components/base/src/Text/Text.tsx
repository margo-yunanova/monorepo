import * as React from 'react'

interface Props {
  is?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  className?: string
  children?: React.ReactNode
}

export const Text = ({ is = 'span', children, ...restProps }: Props) => React.createElement(is, restProps, children)