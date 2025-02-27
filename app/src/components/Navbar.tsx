import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearAuth, getUser } from "../utils/localStorage";
import { deleteUserAccount } from "../services/auth.service";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = getUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer votre compte? Cette action est irréversible."
      )
    ) {
      try {
        await deleteUserAccount(user.userId);
        clearAuth();
        navigate("/register");
      } catch (error) {
        console.error("Failed to delete account:", error);
      }
    }
  };

  return (
    <nav className="bg-white shadow-sm" data-testid="navbar">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-500">
              TodoApp
            </Link>
          </div>

          {user ? (
            <div className="flex items-center">
              <Link
                to="/todos"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-500"
                data-testid="nav-todos"
              >
                Mes Todos
              </Link>
              <Link
                to="/todos/create"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-500"
                data-testid="nav-create-todo"
              >
                Créer Todo
              </Link>

              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    id="user-menu"
                    aria-expanded="false"
                    onClick={toggleMenu}
                    data-testid="nav-user-menu"
                  >
                    <span className="sr-only">Ouvrir le menu utilisateur</span>
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                  </button>
                </div>

                {isMenuOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={handleLogout}
                      data-testid="nav-logout"
                    >
                      Déconnexion
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      role="menuitem"
                      onClick={handleDeleteAccount}
                      data-testid="nav-delete-account"
                    >
                      Supprimer le compte
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <Link
                to="/login"
                className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-500"
                data-testid="nav-login"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="ml-4 px-3 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600"
                data-testid="nav-register"
              >
                Inscription
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
