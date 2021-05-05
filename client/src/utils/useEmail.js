import { useState, useEffect } from "react";

function useEmail(email, delay) {
  const [emailValid, setEmailValid] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      const isMatch = regex.test(email);
      if (isMatch) {
        fetch("/api/checkemailexist", {
          method: "POST",
          body: JSON.stringify({ email: email }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => {
            return resp.json();
          })
          .then((result) => {
            console.log(result);
            if (result.length !== 0) {
              return setEmailValid(false);
            }
            return setEmailValid(true);
          });
      }
    }, delay);

    return function cleanup() {
      clearTimeout(handler);
      setEmailValid(null);
    };
  }, [email, delay]);

  return emailValid;
}

export default useEmail;
