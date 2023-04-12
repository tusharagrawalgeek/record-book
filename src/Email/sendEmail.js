// import React, { useRef } from 'react';
// import emailjs from '@emailjs/browser';

// export const ContactUs = () => {
//   const form = useRef();

//   const sendEmail = (e) => {
//     e.preventDefault();
//     // emailjs.send(",);
//     emailjs.sendForm("service_i3urbym", "template_71pg1ee", form.current, 'YOUR_PUBLIC_KEY')
//       .then((result) => {
//           console.log(result.text);
//       }, (error) => {
//           console.log(error.text);
//       });
//   };
//   return(
//     <>
//     <div ref={form}>
//         Hello txt
//     </div>
//     </>
//   );
// }
// export default ContactUs;