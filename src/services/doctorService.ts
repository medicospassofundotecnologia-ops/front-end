// src/services/doctorService.ts
import { Doctor } from '@/types/doctor';
import allDoctorsData from '@/data/doctors.json'; // Importa os dados mockados
import { normalizeString } from '@/lib/utils'; // Importa a nova função utilitária

/**
 * Simula a busca de todos os médicos.
 * No futuro, esta função fará uma requisição HTTP para a API.
 * @returns Promise<Doctor[]> Uma promessa que resolve com uma lista de médicos.
 */
export async function fetchAllDoctors(): Promise<Doctor[]> {
  // Simulação de delay para emular uma chamada de rede
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(allDoctorsData as Doctor[]); // Cast para Doctor[] para garantir tipo
    }, 500); // 500ms de delay
  });
}

/**
 * Simula a busca de um médico específico pelo seu slug.
 * No futuro, esta função fará uma requisição HTTP para a API com o slug.
 * @param slug O slug URL do médico.
 * @returns Promise<Doctor | null> Uma promessa que resolve com o médico encontrado ou null.
 */
export async function fetchDoctorBySlug(slug: string): Promise<Doctor | null> {
  // Simulação de delay para emular uma chamada de rede
  return new Promise((resolve) => {
    setTimeout(() => {
      const doctor = allDoctorsData.find((d) => d.slugUrl === slug);
      resolve(doctor ? (doctor as Doctor) : null); // Cast para Doctor ou null
    }, 500); // 500ms de delay
  });
}

/**
 * Simula a busca e filtragem de médicos por nome ou especialidade,
 * desconsiderando acentuação e case-sensitive.
 * No futuro, esta função fará uma requisição HTTP para a API com os parâmetros de busca.
 * Para o MVP, filtra os dados locais (`allDoctorsData`).
 *
 * @param searchTerm O termo de busca (nome do médico ou especialidade).
 * @returns Promise<Doctor[]> Uma promessa que resolve com a lista de médicos filtrados.
 */
export async function searchDoctors(searchTerm: string): Promise<Doctor[]> {
  return new Promise((resolve) => {
    // Adicionado um pequeno delay para simular uma chamada de rede, mesmo com dados locais.
    setTimeout(() => {
      const doctorsToFilter = allDoctorsData as Doctor[]; // Base de dados local completa

      // Se o termo de busca estiver vazio, retorna todos os médicos
      if (!searchTerm) {
        resolve(doctorsToFilter);
        return;
      }

      // Normaliza o termo de busca UMA VEZ para comparação
      const normalizedSearchTerm = normalizeString(searchTerm);

      const filtered = doctorsToFilter.filter(doctor => {
        // Normaliza os campos do médico antes de comparar
        const normalizedFullName = normalizeString(doctor.fullName);
        const normalizedMainProfessionalTitle = normalizeString(doctor.mainProfessionalTitle);

        // Verifica se o termo de busca normalizado está presente no nome ou especialidade principal normalizados
        if (
          normalizedFullName.includes(normalizedSearchTerm) ||
          normalizedMainProfessionalTitle.includes(normalizedSearchTerm)
        ) {
          return true;
        }

        // Verifica nas especialidades secundárias, normalizando cada uma
        if (doctor.secondarySpecialties && doctor.secondarySpecialties.length > 0) {
          return doctor.secondarySpecialties.some(specialty =>
            normalizeString(specialty).includes(normalizedSearchTerm)
          );
        }

        return false;
      });
      resolve(filtered);
    }, 300); // 300ms de delay para a busca
  });
}

// Futuramente, quando a API estiver pronta, as funções poderiam ser assim:
/*
import { Doctor } from '@/types/doctor';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

export async function fetchAllDoctors(): Promise<Doctor[]> {
  const response = await fetch(`${API_BASE_URL}/doctors`);
  if (!response.ok) {
    throw new Error('Falha ao buscar todos os médicos');
  }
  const data: Doctor[] = await response.json();
  return data;
}

export async function fetchDoctorBySlug(slug: string): Promise<Doctor | null> {
  const response = await fetch(`${API_BASE_URL}/doctors/${slug}`);
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error(`Falha ao buscar médico com slug: ${slug}`);
  }
  const data: Doctor = await response.json();
  return data;
}

// Versão futura de searchDoctors com API.
// Note que não precisaria de `allDoctors` como parâmetro, pois a API traria os dados já filtrados.
export async function searchDoctors(searchTerm: string): Promise<Doctor[]> {
  const queryParams = new URLSearchParams();
  if (searchTerm) {
    queryParams.append('q', searchTerm); // 'q' como parâmetro de busca genérico na API
  }
  const response = await fetch(`${API_BASE_URL}/doctors?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error('Falha ao buscar médicos');
  }
  const data: Doctor[] = await response.json();
  return data;
}
*/