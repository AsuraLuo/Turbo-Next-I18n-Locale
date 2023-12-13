import { Provider } from 'use-http'
import type { FC } from 'react'
import type { FetchProviderProps } from 'use-http'

import { useCookie } from '@/hooks/Cookie'

const HttpProvider: FC<FetchProviderProps> = ({ children }) => {
  const { cookie } = useCookie()
  const isDev: boolean = import.meta.env.DEV
  const baseURL: string = isDev
    ? `${import.meta.env.REACT_APP_HOST_URL}/api`
    : import.meta.env.REACT_APP_API_URL

  const apiOptions: any = {
    cachePolicy: 'network-only',
    timeout: 60 * 1000,
    responseType: 'json',
    interceptors: {
      request: async ({ options }: any) => {
        const locale: string = cookie.getItem('locale_code')

        return {
          ...options,
          headers: {
            Accept: 'application/json',
            'Accept-Language': locale,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            ...options.headers
          }
        }
      },
      response: async ({ response }: any) => {
        return response
      }
    },
    onError: (error: any) => {
      const Console = console
      Console.log(error)
    }
  }

  return (
    <Provider url={baseURL} options={apiOptions}>
      {children}
    </Provider>
  )
}

export default HttpProvider
