import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import config from '@payload-config'

export const generateMetadata = ({ params, searchParams }: any) =>
  generatePageMetadata({ config, params, searchParams })

const Page = ({ params, searchParams }: any) => RootPage({ config, params, searchParams, importMap: {} as any })
export default Page
