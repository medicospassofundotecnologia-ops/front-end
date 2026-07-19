// src/types/doctor.d.ts
export interface Doctor {
  id: string;
  fullName: string;
  slugUrl: string;
  mainProfessionalTitle: string;
  secondarySpecialties: string[];
  crm: string;
  photoUrl: string;
  shortDescription: string;
  contacts: {
    mainPhone: string;
    whatsapp: string;
    email: string;
    instagram?: string;
    linkedin?: string;
  };
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    latitude: string;
    longitude: string;
    complement?: string;
    observations?: string;
  };
  academicBackground: string[];
  seoKeywords: string[];
  lastUpdated: string; // ISO 8601 string
  status: 'ativo' | 'inativo' | 'pendente';
}