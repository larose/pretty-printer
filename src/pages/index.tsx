import styles from "./index.module.css";
import Layout from "../components/layouts/Layout";
import { ViewerApp } from "../components/viewer-app/ViewerApp";

const IndexPage = () => (
  <Layout title="Pretty Printer">
    <h1 className={styles.h1}>Pretty Printer</h1>
    <ViewerApp></ViewerApp>
  </Layout>
);

export default IndexPage;
