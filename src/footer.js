// import React from 'react';
// import { Link } from 'react-router-dom';
// import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
// import EmailIcon from '@mui/icons-material/Email';
// import StorefrontIcon from '@mui/icons-material/Storefront';

// import './footer.css'
// const Footer = () => {
//     return (
//         <div id="FooterContainer">
//             <div id="divFooter">
//                 <Link  to={'/homePage'} color="inherit" underline="hover"  className='link'>
//                     Home
//                 </Link>
//                 <Link to={'/login'} color="inherit" underline="hover" sx={{ marginX: 2 }}  className='link'>
//                     Login
//                 </Link>
//                 <Link to={'/signIn'} color="inherit" underline="hover" className='link'>
//                     Sign In
//                 </Link>
//             </div>
//             <div id='data'>
//                 <p className='dataItem'> <StorefrontIcon /> 42 Souzane Dr. Monsey NY</p>
//                 <p className='dataItem'><PhoneInTalkIcon /> 845-585-5896</p>
//                 <p className='dataItem'><EmailIcon />TheKidsShoppe@gmail.com</p>
//                 <p className='dataItem'>© 2024 The Kids Shoppe.</p>
//             </div>
//         </div>
//     );
// };



// export default Footer;





import React from 'react';
import { Link } from 'react-router-dom';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import EmailIcon from '@mui/icons-material/Email';
import StorefrontIcon from '@mui/icons-material/Storefront';

import './footer.css';

const Footer = () => {
    return (
        <div id="FooterContainer">
            <div id="divFooter">
                <Link to={'/homePage'} color="inherit" underline="hover" className='link'>
                    Home
                </Link>
                <Link to={'/login'} color="inherit" underline="hover" sx={{ marginX: 2 }} className='link'>
                    Login
                </Link>
                <Link to={'/signIn'} color="inherit" underline="hover" className='link'>
                    Sign In
                </Link>
            </div>
            <div id='data'>
                <p className='dataItem'> <StorefrontIcon /> 42 Souzane Dr. Monsey NY</p>
                <p className='dataItem'><PhoneInTalkIcon /> 845-585-5896</p>
                <p className='dataItem'><EmailIcon />TheKidsShoppe@gmail.com</p>
                <p className='dataItem'>© 2024 The Kids Shoppe.</p>
            </div>
        </div>
    );
};

export default Footer;
