import { auth } from '@clerk/nextjs';
import Header from './header';

const Navbar: React.FC = () => {
  const { userId } = auth();

  const isAuthenticated = !!userId

  return <Header isAuthenticated={isAuthenticated} />;
};

export default Navbar;
