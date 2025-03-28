// src/lib/utils/slugMapper.js

/**
 * Utilitaire pour gérer la conversion entre les slugs d'URL et les slugs de la base de données
 */

// Mappage des slugs d'URL vers les slugs de base de données
const urlToDbSlugs = {
    'femmes': 'vetements-femme',
    'hommes': 'vetements-homme',
    'enfants': 'vetements-enfant',
    'accessoires': 'accessoires'
  };
  
  // Mappage inverse (slugs de base de données vers les slugs d'URL)
  const dbToUrlSlugs: Record<string, string> = Object.entries(urlToDbSlugs).reduce(
    (acc, [urlSlug, dbSlug]) => ({
      ...acc,
      [dbSlug]: urlSlug
    }), 
    {}
  );
  
  /**
   * Convertit un slug d'URL en slug de base de données
   * @param {string} urlSlug - Le slug utilisé dans l'URL
   * @returns {string} Le slug correspondant dans la base de données ou le slug original si aucune correspondance n'est trouvée
   */
  export function urlToDbSlug(urlSlug: keyof typeof urlToDbSlugs | string) {
    return urlToDbSlugs[urlSlug as keyof typeof urlToDbSlugs] || urlSlug;
  }
  
  /**
   * Convertit un slug de base de données en slug d'URL
   * @param {string} dbSlug - Le slug utilisé dans la base de données
   * @returns {string} Le slug correspondant pour l'URL ou le slug original si aucune correspondance n'est trouvée
   */
  export function dbToUrlSlug(dbSlug: string | number) {
    return dbToUrlSlugs[dbSlug] || dbSlug;
  }
  
  /**
   * Récupère tous les slugs d'URL utilisés dans l'application
   * @returns {string[]} Un tableau de tous les slugs d'URL
   */
  export function getAllUrlSlugs() {
    return Object.keys(urlToDbSlugs);
  }
  
  /**
   * Récupère tous les slugs de base de données
   * @returns {string[]} Un tableau de tous les slugs de base de données
   */
  export function getAllDbSlugs() {
    return Object.values(urlToDbSlugs);
  }
  
  export default {
    urlToDbSlug,
    dbToUrlSlug,
    getAllUrlSlugs,
    getAllDbSlugs
  };