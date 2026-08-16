import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import Logo from "../../assets/logo.svg";
import "./Header.css";

function getNavLinkClass({ isActive }: { isActive: boolean }) {
  return isActive
    ? "header__nav-link header__nav-link_active"
    : "header__nav-link";
}

function Header() {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="header">
      <div className="header__inner">
        <img
          src={Logo}
          alt="Logo de Buscador de recetas"
          className="header__logo"
        />

        <nav className="header__nav">
          <NavLink to="/" className={getNavLinkClass}>
            Recetas
          </NavLink>

          <NavLink to="/favorites" className={getNavLinkClass}>
            Favoritos
          </NavLink>

          {!isAuthenticated ? (
            <>
              <NavLink to="/login" className={getNavLinkClass}>
                Iniciar sesión
              </NavLink>

              <NavLink to="/register" className={getNavLinkClass}>
                Registrarse
              </NavLink>
            </>
          ) : (
            <>
              <span className="header__user">
                {currentUser?.email}
              </span>

              <button
                type="button"
                className="header__logout"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;