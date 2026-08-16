import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { loginUser } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const { values, errors, isValid, handleChange } =
    useFormWithValidation();

  const { login } = useAuth();
  const navigate = useNavigate();

  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!isValid) return;

    try {
      const { token, user } = await loginUser(
        values.email,
        values.password,
      );

      login(token, user);
      navigate("/");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Algo salió mal",
      );
    }
  }

  return (
    <div className="form">
      <h1 className="form__title">Iniciar sesión</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form__input-container">
          <label className="form__label" htmlFor="email">
            Correo electrónico
          </label>

          <input
            className="form__input"
            id="email"
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={values.email || ""}
            onChange={handleChange}
            required
          />

          {errors.email && (
            <span className="form__error">{errors.email}</span>
          )}
        </div>

        <div className="form__input-container">
          <label className="form__label" htmlFor="password">
            Contraseña
          </label>

          <input
            className="form__input"
            id="password"
            name="password"
            type="password"
            placeholder="Contraseña"
            value={values.password || ""}
            onChange={handleChange}
            required
            minLength={8}
          />

          {errors.password && (
            <span className="form__error">{errors.password}</span>
          )}
        </div>

        <button
          className="form__submit-btn"
          type="submit"
          disabled={!isValid}
        >
          Iniciar sesión
        </button>

        {submitError && (
          <p className="form__error">{submitError}</p>
        )}
      </form>

      <p>
        ¿No tienes una cuenta?{" "}
        <Link to="/register">Regístrate</Link>
      </p>
    </div>
  );
}

export default LoginPage;