import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>GraphQL Practice</h1>
        <p className={styles.description}>
          Next.js App Router with TypeScript and GraphQL
        </p>
      </main>
    </div>
  );
}
