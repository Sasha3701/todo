import type { PropsWithChildren } from "react";
import { Typography } from "antd";

import styles from "./styles.module.css";

export const Layout = ({ children }: PropsWithChildren) => (
  <main className={styles.container}>
    <section className={styles.section}>
      <Typography.Title className={styles.title} level={2}>
        Todos
      </Typography.Title>
      {children}
    </section>
  </main>
);
