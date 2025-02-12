import PropTypes from 'prop-types';



const NavLink = ({ to, children, className = "", isButton = false, onNavigate, currentPath }) => (
  <button
    onClick={() => onNavigate?.(to)}
    className={`
      ${className}
      ${isButton ? '' : 'hover:bg-indigo-500'}
      ${currentPath === to ? 'bg-indigo-500' : ''}
      px-3 py-2 rounded-md text-sm font-medium transition duration-150
    `}
  >
    {children}
  </button>
);

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isButton: PropTypes.bool,
  onNavigate: PropTypes.func,
  currentPath: PropTypes.string
};

// Navigation Component
export const Navigation = ({
  isAuthenticated = false,
  onNavigate = () => {},
  currentPath = "/"
}) => {
  return (
    <div>
      <div className="hidden md:block">
        <div className="ml-10 flex items-center space-x-4">
          {isAuthenticated && (
            <NavLink to="/"
              className="text-indigo-600"
              onNavigate={onNavigate}
              currentPath={currentPath}
            >
              Home
            </NavLink>
          )}
          {isAuthenticated ? (
            <NavLink
              to="/logout"
              className="bg-red-500 hover:bg-red-600 text-indigo-600"
              isButton
              onNavigate={onNavigate}
              currentPath={currentPath}
            >
              Logout
            </NavLink>
          ) : (
            <div className="flex space-x-4">
              {/*<NavLink*/}
              {/*  to="/login"*/}
              {/*  className="text-indigo-600"*/}
              {/*  onNavigate={onNavigate}*/}
              {/*  currentPath={currentPath}*/}
              {/*>*/}
              {/*  Login*/}
              {/*</NavLink>*/}
              {/*<NavLink*/}
              {/*  to="/register"*/}
              {/*  className="bg-white text-indigo-600 hover:bg-indigo-100"*/}
              {/*  isButton*/}
              {/*  onNavigate={onNavigate}*/}
              {/*  currentPath={currentPath}*/}
              {/*>*/}
              {/*  Register*/}
              {/*</NavLink>*/}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Define PropTypes outside the main component
Navigation.propTypes = {
  isAuthenticated: PropTypes.bool, // Boolean to track if user is authenticated
  onNavigate: PropTypes.func, // Function to handle navigation
  currentPath: PropTypes.string, // Current active route for styling
};

export default Navigation;