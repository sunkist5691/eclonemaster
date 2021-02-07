import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    // 만약 유저가 로그인이 되어있다면, homepage 로 redirecting 을 해라
    if (user && user.token) history.push("/");
  }, [user, history]); // 에러를 방지하기 위해 user 와 history 를 디펜던시로 사용했다

  const dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/history");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // authenticate 하는 동안 로딩아이콘 보여주고,
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      // this createOrUpdateUser function will receive a token from firebase once when user logged in.
      // this function will send token information in header object to the backend.
      // since this function is returning a axios call, it needs to be resolved using .then or .catch methods.
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          // 유저의 role 에 따라 role 에 맞는 페이지로 redirect 을 시킨다
          roleBasedRedirect(res);
        })
        .catch((error) =>
          console.log("CREATE OR UPDATE RES IS NOT RESPONDING", error)
        );

      // history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      // authenticate 에 실패 했으니, loading state 을 false 로 업데이트
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            // 유저의 role 에 따라 role 에 맞는 페이지로 redirect 을 시킨다
            roleBasedRedirect(res);
          })
          .catch((error) =>
            console.log("CREATE OR UPDATE RES IS NOT RESPONDING", error)
          );
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          type='email'
          className='form-control'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Your Email'
          autoFocus
        />
      </div>
      <div className='form-group'>
        <input
          type='password'
          className='form-control'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Your Password'
          autoFocus
        />
      </div>
      <br />
      {/* type, shape, block, size 는  antd 의 attribute design option */}
      <Button
        onClick={handleSubmit}
        type='primary'
        className='mb-3'
        block
        shape='round'
        icon={<MailOutlined />}
        size='large'
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    // className 을 이렇게 짓는 이유는 bootstrap 때문이다
    // className 을 어떻게 짓냐에 따라 css 가 작동된다
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}
          {loginForm()}
          <Button
            onClick={googleLogin}
            type='danger'
            className='mb-3'
            block
            shape='round'
            icon={<GoogleOutlined />}
            size='large'
          >
            Login with Google
          </Button>

          <Link to='/forgot/password' className='float-right text-danger'>
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
