import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(localStorage.getItem("emailForRegisteration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !password) {
      // toast.error 덕분에 error message 를 화면에 표시한다
      //
      toast.error("Email and password is required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        // window.location.href 는 현재 내가 있는 웹사이트 전체 주소를 가져온다
        window.location.href
      );

      // emailVerified 라는 property 가 true 로 전달이 된다면,
      if (result.user.emailVerified) {
        // remove user email from local storage
        localStorage.removeItem("emailForRegistration");
        // get user id token from firebase, and firebase will keep track of the current user
        await auth.currentUser.updatePassword(password);
        const idTokenResult = await auth.currentUser.getIdTokenResult();
        // redux store

        createOrUpdateUser(idTokenResult.token)
          .then((res) =>
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            })
          )
          .catch((error) =>
            console.log("CREATE OR UPDATE RES IS NOT RESPONDING", error)
          );
        // redirect
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type='email' className='form-control' value={email} disabled />
      <input
        type='password'
        className='form-control'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
        autoFocus
      />
      <button type='submit' className='btn btn-raised'>
        Complete Registeration
      </button>
    </form>
  );

  return (
    // className 을 이렇게 짓는 이유는 bootstrap 때문이다
    // className 을 어떻게 짓냐에 따라 css 가 작동된다
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
