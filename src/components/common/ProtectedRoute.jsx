import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loading from './Loading';
import PropTypes from 'prop-types';

function ProtectedRoute({ children }) {
  const { user, isAuthChecked } = useSelector((state) => state.auth);

  if (!isAuthChecked) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
