// src/components/specific/DoctorCard/DoctorCard.tsx
import React from 'react';
import Link from 'next/link';
import { track } from '@vercel/analytics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Doctor } from '@/types/doctor';
import styles from './DoctorCard.module.css';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const { street, complement, neighborhood, zipCode } = doctor.address;
  const formattedAddress = `${street}${complement ? ` - ${complement}` : ''} - ${neighborhood} - ${zipCode}`;

  const getWhatsappLink = (phoneNumber: string) => {
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    const message = `Olá! Encontrei o contato do(a) *${doctor.fullName}* pelo site *Médicos Passo Fundo* e gostaria de agendar uma consulta.`;
    return `https://wa.me/${cleanedNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className={styles.doctorCardWrapper}>
      <Link
        href={`/medicos/${doctor.slugUrl}`}
        passHref
        className={styles.cardLink}
        onClick={() => track('doctor_card_click', {
          doctor_name: doctor.fullName,
          specialty: doctor.mainProfessionalTitle,
        })}
      >
        <div className={styles.doctorCard}>
          <div className={styles.imageWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={doctor.photoUrl}
              alt={`Foto de ${doctor.fullName}`}
              className={styles.doctorImage}
            />
          </div>
          <div className={styles.infoContainer}>
            <h2 className={styles.doctorName}>{doctor.fullName}</h2>
            <p className={styles.doctorSpecialty}>{doctor.mainProfessionalTitle}</p>
            <p className={styles.doctorLocation}>{formattedAddress}</p>
            <p className={styles.doctorDescription}>{doctor.shortDescription}</p>
            <span className={styles.viewProfileButton}>Ver perfil completo</span>
          </div>
        </div>
      </Link>
      <div className={styles.socialLinks}>
        {doctor.contacts.whatsapp && (
          <a
            href={getWhatsappLink(doctor.contacts.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappIcon}
            aria-label={`WhatsApp de ${doctor.fullName}`}
            onClick={() => track('whatsapp_click', {
              doctor_name: doctor.fullName,
              specialty: doctor.mainProfessionalTitle,
              source: 'card',
            })}
          >
            <FontAwesomeIcon icon={faWhatsapp} size="2x" />
          </a>
        )}
        {doctor.contacts.instagram && (
          <a
            href={doctor.contacts.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.instagramIcon}
            aria-label={`Instagram de ${doctor.fullName}`}
            onClick={() => track('instagram_click', {
              doctor_name: doctor.fullName,
              specialty: doctor.mainProfessionalTitle,
              source: 'card',
            })}
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;
