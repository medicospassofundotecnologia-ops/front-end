// src/components/specific/DoctorDetail/DoctorDetail.tsx
import React from 'react';
import { track } from '@vercel/analytics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope, faMapMarkerAlt, faGraduationCap, faTag } from '@fortawesome/free-solid-svg-icons';
import { Doctor } from '@/types/doctor';
import styles from './DoctorDetail.module.css';

interface DoctorDetailProps {
  doctor: Doctor;
}

const DoctorDetail: React.FC<DoctorDetailProps> = ({ doctor }) => {
  const { street, complement, neighborhood, zipCode, city, state } = doctor.address;
  const formattedAddress = `${street}${complement ? ` - ${complement}` : ''} - ${neighborhood} - ${zipCode}, ${city} - ${state}`;

  const getWhatsappLink = (phoneNumber: string) => {
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    const message = `Olá! Encontrei o contato do(a) *${doctor.fullName}* pelo site *Médicos Passo Fundo* e gostaria de agendar uma consulta.`;
    return `https://wa.me/${cleanedNumber}?text=${encodeURIComponent(message)}`;
  };

  const trackingProps = {
    doctor_name: doctor.fullName,
    specialty: doctor.mainProfessionalTitle,
    source: 'profile',
  };

  return (
    <div className={styles.doctorDetailContainer}>
      <div className={styles.headerSection}>
        <div className={styles.profileImageWrapper}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={doctor.photoUrl}
            alt={`Foto de ${doctor.fullName}`}
            className={styles.profileImage}
          />
        </div>
        <div className={styles.profileInfo}>
          <h1 className={styles.doctorName}>{doctor.fullName}</h1>
          <h2 className={styles.doctorSpecialty}>{doctor.mainProfessionalTitle}</h2>

          {doctor.secondarySpecialties && doctor.secondarySpecialties.length > 0 && (
            <p className={styles.secondarySpecialties}>
              <FontAwesomeIcon icon={faTag} className={styles.icon} /> Outras especialidades: {doctor.secondarySpecialties.join(', ')}
            </p>
          )}

          <p className={styles.doctorCrm}>CRM: {doctor.crm}</p>
          <p className={styles.shortDescription}>{doctor.shortDescription}</p>

          <div className={styles.contactLinks}>
            {doctor.contacts.mainPhone && (
              <a
                href={`tel:${doctor.contacts.mainPhone.replace(/\D/g, '')}`}
                className={styles.contactItem}
                aria-label={`Ligar para ${doctor.fullName}`}
                onClick={() => track('phone_click', trackingProps)}
              >
                <FontAwesomeIcon icon={faPhone} className={styles.icon} />
                <span>{doctor.contacts.mainPhone}</span>
              </a>
            )}
            {doctor.contacts.whatsapp && (
              <a
                href={getWhatsappLink(doctor.contacts.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactItem}
                aria-label={`WhatsApp de ${doctor.fullName}`}
                onClick={() => track('whatsapp_click', trackingProps)}
              >
                <FontAwesomeIcon icon={faWhatsapp} className={styles.icon} />
                <span>Enviar mensagem</span>
              </a>
            )}
            {doctor.contacts.email && (
              <a
                href={`mailto:${doctor.contacts.email}`}
                className={styles.contactItem}
                aria-label={`Email para ${doctor.fullName}`}
                onClick={() => track('email_click', trackingProps)}
              >
                <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                <span>{doctor.contacts.email}</span>
              </a>
            )}
            {doctor.contacts.instagram && (
              <a
                href={doctor.contacts.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactItem}
                aria-label={`Instagram de ${doctor.fullName}`}
                onClick={() => track('instagram_click', trackingProps)}
              >
                <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
                <span>Instagram</span>
              </a>
            )}
            {doctor.contacts.linkedin && (
              <a
                href={doctor.contacts.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactItem}
                aria-label={`LinkedIn de ${doctor.fullName}`}
                onClick={() => track('linkedin_click', trackingProps)}
              >
                <FontAwesomeIcon icon={faLinkedin} className={styles.icon} />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.sectionIcon} /> Endereço
        </h3>
        <p className={styles.addressText}>{formattedAddress}</p>
        {doctor.address.observations && (
          <p className={styles.addressObservations}>({doctor.address.observations})</p>
        )}
      </div>

      {doctor.academicBackground && doctor.academicBackground.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <FontAwesomeIcon icon={faGraduationCap} className={styles.sectionIcon} /> Formação Acadêmica
          </h3>
          <ul className={styles.academicList}>
            {doctor.academicBackground.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DoctorDetail;
