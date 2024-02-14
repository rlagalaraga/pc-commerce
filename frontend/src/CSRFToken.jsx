const getCsrfToken = () => {
    const csrfCookie = document.cookie.split('; ')
      .find(row => row.startsWith('csrftoken='));
  
    return csrfCookie ? csrfCookie.split('=')[1] : null;
  };
  
  // Use the function to get the CSRF token
  const csrfToken = getCsrfToken();

  export default csrfToken