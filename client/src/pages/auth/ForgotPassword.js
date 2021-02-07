import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    // 만약 유저가 로그인이 되어있다면, homepage 로 redirecting 을 해라
    if (user && user.token) history.push("/");
  }, [user, history]); // 에러를 방지하기 위해 user 와 history 를 디펜던시로 사용했다

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      // when user click 'Forgot Password' button, they are moving into this url automatically.
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL, //login page url 로 보낸다
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Check your email for password reset link");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.log("ERROR MSG IN FORGOT PASSWORD: ", error);
      });
  };
  return (
    <div className='container col-md-6 offset-md-3 p-5'>
      {loading ? (
        <h4 className='text-danger'>Loading</h4>
      ) : (
        <h4>Forgot Password</h4>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          className='form-control'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Type your email'
          autoFocus
        />
        <br />
        <button className='btn btn-raised' disabled={!email}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
