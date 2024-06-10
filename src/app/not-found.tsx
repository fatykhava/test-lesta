import type { Metadata, NextPage } from 'next';

const FourOfFourPage: NextPage = () => {
  return <h1>404</h1>;
};

export default FourOfFourPage;

export const metadata: Metadata = {
  title: {
    template: `%s | FATYKHAVA | Lesta test task`,
    default: '404'
  }
};
