import { useState, useEffect } from 'react';

const usePost = (callback, bool, params) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setErrors] = useState(null);
  useEffect(() => {
    const postData = async function() {
      try {
        setLoading(true);
        console.log('post');
        const response = await callback(params);

        if (response) {
          setData(response);
        }
      } catch (error) {
        if (error.response && error.response.data.message) {
          setErrors(error.response.data.message);
        } else if (error.response && error.response.status) {
          setErrors(error.response.statusText);
        } else {
          setErrors(error);
        }
      } finally {
        setLoading(false);
      }
    };
    if (bool) {
      postData();
    }
  }, [callback, params, bool]);
  return { loading, data, error };
};

export default usePost;
