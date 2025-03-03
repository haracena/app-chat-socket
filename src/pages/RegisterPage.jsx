import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import Swal from 'sweetalert2';

const RegisterPage = () => {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
  });

  const { register } = useContext(AuthContext);

  const onChange = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { nombre, email, password } = form;
    const resp = await register(nombre, email, password);
    if (!resp.ok) {
      Swal.fire('Error', resp.msg, 'error');
    }
  };

  const todoOk = () => {
    return form.nombre.length > 0 &&
      form.email.length > 0 &&
      form.password.length > 0
      ? true
      : false;
  };

  return (
    <form
      className='login100-form validate-form flex-sb flex-w'
      onSubmit={onSubmit}
    >
      <span className='login100-form-title mb-3'>Chat - Registro</span>

      <div className='wrap-input100 validate-input mb-3'>
        <input
          className='input100'
          type='text'
          name='nombre'
          value={form.nombre}
          onChange={onChange}
          placeholder='Nombre'
        />
        <span className='focus-input100'></span>
      </div>

      <div className='wrap-input100 validate-input mb-3'>
        <input
          className='input100'
          type='email'
          name='email'
          value={form.email}
          onChange={onChange}
          placeholder='Email'
        />
        <span className='focus-input100'></span>
      </div>

      <div className='wrap-input100 validate-input mb-3'>
        <input
          className='input100'
          type='password'
          name='password'
          value={form.password}
          onChange={onChange}
          placeholder='Password'
        />
        <span className='focus-input100'></span>
      </div>

      <div className='row mb-3'>
        <div className='col text-right'>
          <Link to='/auth/login' className='txt1'>
            Ya tienes cuenta?
          </Link>
        </div>
      </div>

      <div className='container-login100-form-btn m-t-17'>
        <button
          type='submit'
          disabled={!todoOk()}
          className='login100-form-btn'
        >
          Crear cuenta
        </button>
      </div>
    </form>
  );
};

export default RegisterPage;
