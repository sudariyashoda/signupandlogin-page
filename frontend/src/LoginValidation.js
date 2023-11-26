const Validation = (values) => {
   let errors = {};
   const email_pattern = /^\S+@\S+\.\S+$/;
   const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
 
   if (!values.email) {
     errors.email = 'Email address is required';
   } else if (!email_pattern.test(values.email)) {
     errors.email = 'Invalid email address';
   }
 
   if (!values.password) {
     errors.password = 'Password is required';
   } else if (values.password.length < 8 || !password_pattern.test(values.password)) {
     errors.password = 'Password must be at least 8 characters long and contain at least one letter and one number';
   }
 
   return errors;
 };
 
 export default Validation;
 