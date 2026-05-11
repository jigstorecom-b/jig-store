import { NotFoundPage } from '@payloadcms/next/views'
import config from '@payload-config'

const NotFound = ({ params, searchParams }: any) => NotFoundPage({ config, params, searchParams, importMap: {} as any })
export default NotFound
