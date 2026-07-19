// src/components/specific/SearchBar/SearchBar.tsx
import React, { useState, useEffect, KeyboardEvent } from 'react';
import styles from './SearchBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importar FontAwesome
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Ícone de busca

interface SearchBarProps {
  /** O termo de busca inicial para popular o campo. */
  initialSearchTerm?: string;
  /** Função de callback para ser chamada quando o termo de busca é SUBMETIDO. */
  onSearchSubmit: (term: string) => void;
  /** Placeholder opcional para o campo de busca. */
  placeholder?: string;
}

/**
 * Componente de barra de busca reutilizável para filtrar médicos por nome ou especialidade.
 * A busca é disparada ao clicar no botão de busca ou pressionar Enter.
 * Inclui responsividade e acessibilidade.
 */
const SearchBar: React.FC<SearchBarProps> = ({
  initialSearchTerm = '', // Valor inicial do input
  onSearchSubmit,
  placeholder = 'Buscar médicos por nome ou especialidade...',
}) => {
  const [inputValue, setInputValue] = useState(initialSearchTerm);

  // Efeito para atualizar o inputValue se initialSearchTerm mudar (ex: navegação entre /busca/termos)
  useEffect(() => {
    setInputValue(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchSubmit(inputValue.trim()); // Trim para remover espaços em branco
    }
  };

  const handleSearchClick = () => {
    onSearchSubmit(inputValue.trim()); // Trim para remover espaços em branco
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // Adiciona o listener para a tecla Enter
        aria-label="Buscar médicos por nome ou especialidade"
        role="searchbox"
      />
      <button
        type="button" // Importante para não submeter formulários sem querer
        className={styles.searchButton}
        onClick={handleSearchClick}
        aria-label="Botão de busca"
      >
        <FontAwesomeIcon icon={faSearch} /> {/* Ícone de busca */}
      </button>
    </div>
  );
};

export default SearchBar;