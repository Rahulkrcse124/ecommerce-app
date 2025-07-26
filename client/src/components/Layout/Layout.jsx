import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";


const Layout = ({children,title,description,keywords,author}) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords}/>
          <meta name="author" content={author} />
          <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      {/* <ToastContainer position="top-center" />       */}
      <Footer />
    </>
  );
};

Layout.defaultProps= {
  title:"Ecommerce App - Shop Now",
  description:'Mern Stack Project',
  keywords:'Mern react,node,mongodb,express',
  author:"Rahul Kumar"
}

export default Layout;
