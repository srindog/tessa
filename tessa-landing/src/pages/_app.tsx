import { Windmill } from '@windmill/react-ui';
import { AppProps } from 'next/app';

import '../styles/main.css';
import tessaTheme from '../themes/tessaTheme';

const App = ({ Component, pageProps }: AppProps) => (
  <Windmill theme={tessaTheme}>
    <Component {...pageProps} />
  </Windmill>
);

export default App;
