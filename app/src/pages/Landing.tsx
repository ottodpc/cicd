import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { isAuthenticated } from "../utils/localStorage";

const Landing: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col items-center"
      data-testid="landing-page"
    >
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Simplifiez votre quotidien
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Une application de gestion de tâches simple et élégante. Organisez
          votre journée et restez productif.
        </p>
        <div className="mt-10">
          {isAuthenticated() ? (
            <Link to="/todos">
              <Button dataTestId="go-to-todos-button">Mes Todos</Button>
            </Link>
          ) : (
            <div className="space-x-4">
              <Link to="/login">
                <Button variant="secondary" dataTestId="landing-login-button">
                  Connexion
                </Button>
              </Link>
              <Link to="/register">
                <Button dataTestId="landing-register-button">
                  Inscription
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-blue-500 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900">
              Organisation Simple
            </h3>
            <p className="mt-2 text-gray-600">
              Gérez facilement vos tâches quotidiennes avec notre interface
              intuitive.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-blue-500 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900">Ajout Rapide</h3>
            <p className="mt-2 text-gray-600">
              Créez de nouvelles tâches en quelques secondes pour ne jamais
              perdre une idée.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-blue-500 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900">Satisfaction</h3>
            <p className="mt-2 text-gray-600">
              Ressentez la satisfaction de cocher vos tâches terminées et
              d'atteindre vos objectifs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
