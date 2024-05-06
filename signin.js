const signUpForm = document.querySelector('.sign-up-container form');
const signInForm = document.querySelector('.sign-in-container form');

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevents the default form submission
    // Add your code here to handle the sign-up form submission
    // For example, you could validate the form inputs and send an AJAX request to the server
    console.log('Sign up form submitted');
});

signInForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevents the default form submission
    // Add your code here to handle the sign-in form submission
    // For example, you could validate the form inputs and send an AJAX request to the server
    console.log('Sign in form submitted');
});
