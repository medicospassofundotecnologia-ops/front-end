// src/pages/medicos/[slug].tsx (Conteúdo atualizado com SSR)
import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import DoctorDetail from '@/components/specific/DoctorDetail/DoctorDetail';
import { Doctor } from '@/types/doctor';
import styles from '@/styles/pages/DoctorDetail.module.css';
import { fetchDoctorBySlug } from '@/services/doctorService';

interface DoctorPageProps {
  doctor: Doctor | null;
}

const DoctorPage: React.FC<DoctorPageProps> = ({ doctor }) => {
  if (!doctor) {
    return (
      <>
        <Head>
          <title>Médico Não Encontrado</title>
          <meta name="description" content="O médico solicitado não foi encontrado." />
          <meta property="og:title" content="Médico Não Encontrado" />
          <meta property="og:description" content="A página do médico que você procurou não foi encontrada." />
          <meta property="og:type" content="website" />
        </Head>
        <div className={styles.notFoundContainer}>
          <h1 className={styles.notFoundTitle}>Médico Não Encontrado</h1>
          <p className={styles.notFoundText}>Desculpe, mas não conseguimos encontrar o perfil do médico solicitado.</p>
          <a href="/" className={styles.backButton}>Voltar para a lista de médicos</a>
        </div>
      </>
    );
  }

  const metaDescription = doctor.shortDescription.length > 155
    ? doctor.shortDescription.slice(0, 152) + '...'
    : doctor.shortDescription;

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: doctor.fullName,
    description: doctor.shortDescription,
    medicalSpecialty: doctor.mainProfessionalTitle,
    image: doctor.photoUrl,
    telephone: doctor.contacts.mainPhone,
    email: doctor.contacts.email,
    url: `https://medicospassofundo.com.br/medicos/${doctor.slugUrl}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${doctor.address.street}${doctor.address.complement ? ` - ${doctor.address.complement}` : ''}`,
      addressLocality: doctor.address.city,
      addressRegion: doctor.address.state,
      addressCountry: 'BR',
    },
    ...(doctor.contacts.instagram && { sameAs: [doctor.contacts.instagram] }),
  };

  return (
    <>
      <Head>
        <title>{`${doctor.fullName} - ${doctor.mainProfessionalTitle} em ${doctor.address.city}`}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`https://medicospassofundo.com.br/medicos/${doctor.slugUrl}`} />
        <meta property="og:title" content={`${doctor.fullName} - ${doctor.mainProfessionalTitle}`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={doctor.photoUrl} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`https://medicospassofundo.com.br/medicos/${doctor.slugUrl}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <div className={styles.doctorDetailPage}>
        <DoctorDetail doctor={doctor} />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<DoctorPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const doctor = await fetchDoctorBySlug(slug);

  if (!doctor) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      doctor,
    },
  };
};

export default DoctorPage;