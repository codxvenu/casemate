import "./globals.css";
import { Inter, Geist } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import ThemeContext from "./context/ThemeContext";
export const geist = Geist({
  subsets: ['latin'],       // required
  weight: ['100','200','300','400','500','600','700','800','900'],   // import only the weights you need
  display: 'swap',          // avoids invisible text
});
export const inter = Inter({
  subsets: ['latin'],       // required
  weight: ['100','200','300','400','500','600','700','800','900'],   // import only the weights you need
  display: 'swap',          // avoids invisible text
});
// export const metadata = {
//   title: "CaseMate",
//   description: "Made By Venu",
// };

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className="light" >
      <body
        className={` antialiased`}>
          <ThemeContext>
        {children}
        <ToastContainer/>
           </ThemeContext>
      </body>
    </html>
  );
}
