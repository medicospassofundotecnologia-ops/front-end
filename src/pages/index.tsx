// src/pages/index.tsx
import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DoctorCard from '@/components/specific/DoctorCard/DoctorCard';
import SearchBar from '@/components/specific/SearchBar/SearchBar';
import { Doctor } from '@/types/doctor';
import { searchDoctors } from '@/services/doctorService';
import styles from '@/styles/pages/Home.module.css';

interface DoctorsPageProps {
  highlightedDoctors: Doctor[];
}

const HIGHLIGHTED_DOCTORS_COUNT = 10;

const DoctorsPage: React.FC<DoctorsPageProps> = ({ highlightedDoctors }) => {
  const router = useRouter();

  // Handler para a submissão de busca na Homepage.
  // Redireciona para a página de busca com o termo.
  const handleSearchSubmit = (term: string) => {
    if (term) { // Redireciona apenas se houver um termo de busca válido
      router.push(`/busca/${encodeURIComponent(term)}`);
    }
  };

  return (
    <>
      <Head>
        <title>Médicos em Passo Fundo - Encontre seu especialista</title>
        <meta name="description" content="Encontre os melhores médicos especialistas em Passo Fundo, RS. Pesquise por nome ou especialidade e agende sua consulta." />
        {/* Meta tags Open Graph para compartilhamento */}
        <meta property="og:title" content="Médicos em Passo Fundo - Encontre seu especialista" />
        <meta property="og:description" content="Encontre os melhores médicos especialistas em Passo Fundo, RS. Pesquise por nome ou especialidade e agende sua consulta." />
        <meta property="og:image" content="https://www.medicospassofundo.com.br/images/og-home.jpg" />
        {/* Meta tag para responsividade */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <section className={styles.doctorsListSection}>
        <h1 className={styles.pageTitle}>Encontre seu Médico em Passo Fundo</h1>
        <p className={styles.pageSubtitle}>Descubra profissionais qualificados e agende sua consulta.</p>

        {/* SearchBar na homepage que redireciona */}
        <SearchBar onSearchSubmit={handleSearchSubmit} placeholder="Buscar médico ou especialidade..." />

        <h2 className={styles.highlightedDoctorsTitle}>Médicos em Destaque</h2>
        <p className={styles.highlightedDoctorsSubtitle}>Conheça alguns dos profissionais mais procurados em Passo Fundo.</p>

        {highlightedDoctors.length === 0 ? (
          <div className={styles.noResults}>
            Nenhum médico em destaque para exibir no momento.
          </div>
        ) : (
          <div className={styles.doctorsGrid}>
            {highlightedDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<DoctorsPageProps> = async () => {
  const allDoctors = await searchDoctors('');
  const highlightedDoctors = allDoctors.slice(0, HIGHLIGHTED_DOCTORS_COUNT);

  return {
    props: {
      highlightedDoctors,
    },
  };
};

export default DoctorsPage;