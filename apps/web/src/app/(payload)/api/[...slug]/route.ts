// @ts-ignore - @payloadcms/next/routes subpath types are not declared, runtime works fine
import { REST_DELETE, REST_GET, REST_PATCH, REST_POST, REST_OPTIONS } from '@payloadcms/next/routes'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export const GET     = REST_GET(config)
export const POST    = REST_POST(config)
export const DELETE  = REST_DELETE(config)
export const PATCH   = REST_PATCH(config)
export const OPTIONS = REST_OPTIONS(config)

