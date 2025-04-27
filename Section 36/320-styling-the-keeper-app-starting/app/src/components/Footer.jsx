import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p><b>Copyright ⓒ {year} #KeepKidding</b></p>
    </footer>
  );
}

export default Footer;
