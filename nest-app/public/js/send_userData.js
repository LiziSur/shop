const submitForm = (formId, url) => {
  const form = document.getElementById(formId);
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(JSON.stringify(data));

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then((responseData) => {
      console.log("Service response:", responseData);
      if (responseData && responseData.userId) {
        console.log('logged in');
        localStorage.setItem('userId', responseData.userId);
        window.location.replace("https://clothing-shop-5n2c.onrender.com");
      }
    }).catch((error) => {
      console.error("Error:", error);
    });
  });
};

submitForm('loginForm', 'https://clothing-shop-5n2c.onrender.com/user/login');
submitForm('signUpForm', 'https://clothing-shop-5n2c.onrender.com/user/signUp');