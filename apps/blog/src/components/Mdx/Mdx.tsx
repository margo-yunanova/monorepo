import type { ImageProps } from 'next/image'
import Image from 'next/image'
import { useMDXComponent } from 'next-contentlayer/hooks'
import InstagramPost from '../InstagramPost'
import { ExternalLink } from '../ExternalLink'

interface MdxProps {
  code: string
}

const components = { Image: (props: ImageProps) => <Image {...props} />, InstagramPost, a: ExternalLink }

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return (
    <article className="prose lg:prose-xl">
      <Component components={components} />
    </article>
  )
}
