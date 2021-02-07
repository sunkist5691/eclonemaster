import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    // 만약 유저가 로그인이 되어있다면, homepage 로 redirecting 을 해라
    if (user && user.token) history.push("/");
  }, [user, history]); // 에러를 방지하기 위해 user 와 history 를 디펜던시로 사용했다

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      // when user click 'Register' button, they will get the email and when the user click the link in email,
      // they will move to this 'url = process.env.REACT_APP_REGISTER_REDIRECT_URL'.
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration.`
    );
    // save user email in local storage
    localStorage.setItem("emailForRegisteration", email);
    // clear state
    setEmail("");
  };
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        className='form-control'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Your email'
        autoFocus
      />
      <br />
      <button type='submit' className='btn btn-raised'>
        Register
      </button>
    </form>
  );

  return (
    // className 을 이렇게 짓는 이유는 bootstrap 때문이다
    // className 을 어떻게 짓냐에 따라 css 가 작동된다
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
