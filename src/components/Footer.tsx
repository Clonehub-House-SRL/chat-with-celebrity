import * as React from 'react';
import css from './Footer.module.css';

export function Footer() {
  return (
    <footer className={css.mainFooter}>
      <p>
        © {new Date().getFullYear()} Powered by <strong>OpenAI</strong>.
      </p>
    </footer>
  );
}

export default Footer;
