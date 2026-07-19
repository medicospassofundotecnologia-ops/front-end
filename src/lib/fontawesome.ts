// src/lib/fontawesome.ts
import { library } from '@fortawesome/fontawesome-svg-core';
// Ícones de marca
import { faWhatsapp, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
// Ícones sólidos
import { faPhone, faEnvelope, faMapMarkerAlt, faGraduationCap, faTag } from '@fortawesome/free-solid-svg-icons';

// Adicione aqui todos os ícones que você deseja usar
library.add(
  faWhatsapp,
  faInstagram,
  faLinkedin,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faGraduationCap,
  faTag // Novo ícone para especialidades secundárias
);