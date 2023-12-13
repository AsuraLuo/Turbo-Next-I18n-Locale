import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs'
import { ThemeProvider } from '@emotion/react'
import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css'

import { antd } from '@/config/antd'
import { theme } from '@/config/theme'
import LocaleProvider from '@/provider/LocaleProvider'
import HttpProvider from '@/provider/HttpProvider'
import AppLayout from '@/components/AppLayout'
import GlobalStyled from '@/components/GlobalStyled'

const App = () => {
  return (
    <LocaleProvider>
      <HttpProvider>
        <StyleProvider transformers={[legacyLogicalPropertiesTransformer]}>
          <ThemeProvider theme={theme}>
            <ConfigProvider
              prefixCls={theme.namespace}
              theme={antd}
              form={{
                validateMessages: {
                  required: '${label} is a required field'
                }
              }}
            >
              <GlobalStyled />
              <AppLayout />
            </ConfigProvider>
          </ThemeProvider>
        </StyleProvider>
      </HttpProvider>
    </LocaleProvider>
  )
}

export default App
