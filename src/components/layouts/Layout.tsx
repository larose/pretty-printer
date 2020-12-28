import React, { ReactNode } from "react";
import Head from "next/head";
import styles from "./layout.module.css";

type Props = {
  children?: ReactNode;
  title: string;
};

const Layout = ({ children, title }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <div className={styles.container}>
      {children}
      <footer className={styles.footer}>
        <hr />
        <div className={styles.footerText}>
          Built by <a href="https://mathieularose.com">Mathieu Larose</a> |{" "}
          <a href="https://github.com/larose/pretty-printer">About</a>
        </div>
      </footer>
    </div>
  </div>
);

export default Layout;
