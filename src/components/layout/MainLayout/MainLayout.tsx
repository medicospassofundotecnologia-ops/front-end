// src/components/layout/MainLayout/MainLayout.tsx
import React, { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = 'Médicos Passo Fundo',
  description = 'Encontre especialistas médicos em Passo Fundo - RS. Pesquise e agende consultas online.'
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Open Graph Meta Tags para SEO e compartilhamento */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.medicospassofundo.com.br" /> {/* Atualize com o domínio real */}
        <meta property="og:image" content="https://www.medicospassofundo.com.br/images/og-image.jpg" /> {/* Crie uma imagem para isso */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://www.medicospassofundo.com.br/images/twitter-image.jpg" /> {/* Crie uma imagem para isso */}
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <Link href="/" className={styles.logoLink}>
              {/* ALTERADO: De <h1> para <div/span> para evitar duplicação de H1 */}
              <div className={styles.logo}>Médicos Passo Fundo</div>
            </Link>
            <nav className={styles.nav}>
              {/* Adicionar itens de navegação futuros aqui */}
            </nav>
          </div>
        </header>
        <main className={styles.mainContent}>
          {children}
        </main>
        <footer className={styles.footer}>
          <p>&copy; {new Date().getFullYear()} Médicos Passo Fundo. Todos os direitos reservados.</p>
          {/* Links de política de privacidade, termos de uso, etc. */}
        </footer>
      </div>
    </>
  );
};

export default MainLayout;