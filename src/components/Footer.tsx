import * as React from 'react';

export function Footer() {
  return (
    <footer className="main-footer">
      <p>
        © {new Date().getFullYear()} Powered by <strong>OpenAI</strong>.
      </p>
    </footer>
  );
}

export default Footer;
