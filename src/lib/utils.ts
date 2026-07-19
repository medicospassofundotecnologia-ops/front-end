// src/lib/utils.ts

/**
 * Normaliza uma string para busca, removendo acentos,
 * caracteres especiais e convertendo para minúsculas.
 *
 * @param str A string a ser normalizada.
 * @returns A string normalizada.
 */
export function normalizeString(str: string): string {
  if (!str) return '';
  return str
    .normalize('NFD') // Normaliza para decompor caracteres acentuados em caractere base + diacrítico
    .replace(/[\u0300-\u036f]/g, '') // Remove todos os diacríticos (acentos)
    .toLowerCase(); // Converte para minúsculas
}