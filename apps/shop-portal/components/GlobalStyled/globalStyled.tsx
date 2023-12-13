import { css, Global } from '@emotion/react'

import { theme } from '@/config/theme'

const GlobalStyled = () => {
  const GlobalCss = css`
    ul,
    ol {
      padding: 0;
      margin: 0;

      li {
        list-style-type: none;
      }
    }

    dl,
    dd {
      margin: 0;
    }

    p {
      margin-bottom: 0;
    }

    a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    img {
      max-width: 100%;
    }

    svg {
      display: inline-block;
      vertical-align: middle;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      appearance: none;
    }

    input[type='number'] {
      -moz-appearance: textfield;
    }

    .${theme.namespace} {
      &-input-status-error:not(.${theme.namespace}-input-disabled):not(
          .${theme.namespace}-input-borderless
        ).ant-input {
        border-color: #d9d9d9;
      }

      &-select-status-error:not(.${theme.namespace}-select-disabled):not(
          .${theme.namespace}-select-customize-input
        ):not(.${theme.namespace}-pagination-size-changer) {
        .${theme.namespace}-select-selector {
          border-color: #d9d9d9;
        }
      }
    }
  `

  return <Global styles={GlobalCss} />
}

export default GlobalStyled
