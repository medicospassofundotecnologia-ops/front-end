// src/pages/busca/[term].tsx
import React, { useState, useEffect, useCallback } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DoctorCard from '@/components/specific/DoctorCard/DoctorCard';
import SearchBar from '@/components/specific/SearchBar/SearchBar';
import { Doctor } from '@/types/doctor';
import { searchDoctors } from '@/services/doctorService';
import styles from '@/styles/pages/SearchPage.module.css';

interface SearchPageProps {
  initialDoctors: Doctor[];
  totalDoctorsCount: number;
  searchTerm: string;
}

const PAGE_SIZE = 10;

const SearchPage: React.FC<SearchPageProps> = ({ initialDoctors, totalDoctorsCount, searchTerm: initialSearchTerm }) => {
  const router = useRouter();
  const [displayedDoctors, setDisplayedDoctors] = useState<Doctor[]>(initialDoctors);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(totalDoctorsCount > initialDoctors.length);
  // O estado 'isSearching' foi removido porque a busca agora é disparada via `onSearchSubmit` e `getServerSideProps`

  // Efeito para resetar os estados quando o initialSearchTerm (vindo via props) muda
  // Isso acontece quando a URL /busca/[term] muda e o componente é re-renderizado pelo Next.js
  useEffect(() => {
    setDisplayedDoctors(initialDoctors);
    setCurrentPage(1);
    setHasMore(totalDoctorsCount > initialDoctors.length);
  }, [initialSearchTerm, initialDoctors, totalDoctorsCount]);


  // Função para carregar mais médicos (usada no infinite scroll)
  const loadMoreDoctors = useCallback(() => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    setTimeout(async () => {
        try {
            // Refetch all matching doctors to simulate pagination from the full result set
            const allMatchingDoctors = await searchDoctors(initialSearchTerm);
            const nextPageStart = currentPage * PAGE_SIZE;
            const newDoctorsToDisplay = allMatchingDoctors.slice(nextPageStart, nextPageStart + PAGE_SIZE);

            setDisplayedDoctors((prevDoctors) => [...prevDoctors, ...newDoctorsToDisplay]);
            setCurrentPage((prevPage) => prevPage + 1);
            setHasMore((nextPageStart + PAGE_SIZE) < allMatchingDoctors.length);
        } catch (error) {
            console.error("Erro ao carregar mais médicos:", error);
            setHasMore(false);
        } finally {
            setIsLoadingMore(false);
        }
    }, 500);
  }, [currentPage, isLoadingMore, hasMore, initialSearchTerm]);

  // Efeito para adicionar e remover o event listener de scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500 &&
        !isLoadingMore &&
        hasMore
      ) {
        loadMoreDoctors();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreDoctors, isLoadingMore, hasMore]);


  // Handler para a submissão de busca nesta página.
  // Redireciona para a mesma página com o novo termo, o que acionará o getServerSideProps.
  const handleSearchSubmit = (term: string) => {
    if (term) {
      router.push(`/busca/${encodeURIComponent(term)}`);
    } else {
      router.push('/'); // Se o termo for vazio, volta para a homepage
    }
  };

  const displayCount = displayedDoctors.length;
  const showNoResults = displayCount === 0;

  return (
    <>
      <Head>
        <title>{`Resultados para "${initialSearchTerm}" - Médicos Passo Fundo`}</title>
        <meta name="description" content={`Médicos encontrados em Passo Fundo para "${initialSearchTerm}".`} />
        <meta property="og:title" content={`Resultados para "${initialSearchTerm}" - Médicos Passo Fundo`} />
        <meta property="og:description" content={`Médicos encontrados em Passo Fundo para "${initialSearchTerm}".`} />
        <meta property="og:image" content="https://www.medicospassofundo.com.br/images/og-search.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <section className={styles.searchPageContainer}>
        <h1 className={styles.searchTitle}>Resultados para "{initialSearchTerm}"</h1>
        <p className={styles.searchSubtitle}>Exibindo {displayCount} de {totalDoctorsCount} médicos encontrados.</p>

        {/* SearchBar na página de busca, mantendo o termo atual como valor inicial */}
        <SearchBar initialSearchTerm={initialSearchTerm} onSearchSubmit={handleSearchSubmit} placeholder="Refinar busca..." />

        {showNoResults ? (
          <div className={styles.noResults}>
            Nenhum médico encontrado para "{initialSearchTerm}".
          </div>
        ) : (
          <div className={styles.doctorsGrid}>
            {displayedDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}

        {isLoadingMore && (
          <div className={styles.loadingMore}>
            Carregando mais médicos...
          </div>
        )}

        {!hasMore && displayCount > 0 && (
          <div className={styles.endOfList}>
            Você visualizou todos os {totalDoctorsCount} médicos encontrados para "{initialSearchTerm}".
          </div>
        )}
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (context) => {
  const { term } = context.query;
  const searchTerm = Array.isArray(term) ? term[0] : (term || '');

  try {
    const allMatchingDoctors = await searchDoctors(searchTerm);
    const initialDoctors = allMatchingDoctors.slice(0, PAGE_SIZE);
    const totalDoctorsCount = allMatchingDoctors.length;

    return {
      props: {
        initialDoctors,
        totalDoctorsCount,
        searchTerm,
      },
    };
  } catch (error) {
    console.error("Falha em getServerSideProps ao buscar médicos:", error);
    return {
      props: {
        initialDoctors: [],
        totalDoctorsCount: 0,
        searchTerm,
      },
    };
  }
};

export default SearchPage;