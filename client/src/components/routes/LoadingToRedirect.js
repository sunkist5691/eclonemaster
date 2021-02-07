import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      // currentCount 는 현재 initially 전달된 값을 자동적으로 부여받는다
      // currentCount 는 5 로 시작값을 받고 decrement 를 시전
      setCount((currentCount) => --currentCount);
    }, 1000);

    // redirect once count is equal to 0
    count === 0 && history.push("/");
    console.log("COUNT:", count);
    // every seconds, this clearInterval() function executed,
    // and useEffect kept running since the dependency array is at 'count'.
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div className='container p-5 text-center'>
      <p>Redirecting you in {count} seconds</p>
    </div>
  );
};

export default LoadingToRedirect;
