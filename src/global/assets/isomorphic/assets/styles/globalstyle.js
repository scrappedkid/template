import { createGlobalStyle } from 'styled-components'
import 'antd/dist/antd.css'

const GlobalStyles = createGlobalStyle`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 32px;
    font-weight: 700;
    color: #fff;
  }

`

export default GlobalStyles
