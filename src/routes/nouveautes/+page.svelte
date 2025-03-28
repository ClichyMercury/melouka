<script lang=ts>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    import ProductCard from '$lib/components/ProductCard.svelte';
    
    let products: any[] = [];
    let isLoading = true;
    
    onMount(async () => {
      try {
        console.log('Chargement des nouveautés...');
        
        // Récupérer les produits les plus récents (par date de création)
        const { data: newProducts, error: productsError } = await supabase
          .from('products')
          .select(`
            id,
            name,
            price,
            creation_time,
            delivery_time,
            slug,
            created_at,
            product_images (
              id,
              image_url,
              is_main
            )
          `)
          .order('created_at', { ascending: false })
          .limit(8);
          
        if (productsError) {
          console.error('Erreur lors du chargement des produits:', productsError);
          throw productsError;
        }
        
        console.log('Nouveautés trouvées:', newProducts);
        products = newProducts || [];
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        isLoading = false;
      }
    });
  </script>
  
  <svelte:head>
    <title>Nouveautés | MELOUKA - Artisanat de tricot ivoirien</title>
    <meta name="description" content="Découvrez les dernières créations de tricot artisanal de MELOUKA. Des pièces uniques faites à la main avec passion et savoir-faire en Côte d'Ivoire.">
  </svelte:head>
  
  <!-- Hero section pour les nouveautés -->
  <div class="nouveautes-hero">
    <div class="pattern-overlay"></div>
    <div class="container mx-auto px-4 text-center">
      <h1 class="page-title">Nos Nouveautés</h1>
      <p class="page-subtitle">Découvrez nos dernières créations de tricot artisanal</p>
    </div>
  </div>
  
  <div class="py-16 bg-white">
    <div class="container mx-auto px-4">
      {#if isLoading}
        <div class="flex justify-center py-12">
          <div class="loader"></div>
        </div>
      {:else if products.length === 0}
        <div class="text-center py-12">
          <p class="text-lg text-gray-600 mb-8">Aucune nouveauté pour le moment.</p>
          <p class="text-gray-600 mb-8">Revenez bientôt pour découvrir nos dernières créations !</p>
          <a href="/produits" class="btn-primary">Voir tous les produits</a>
        </div>
      {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {#each products as product (product.id)}
            <ProductCard {product} />
          {/each}
        </div>
        
        <div class="text-center mt-16">
          <a href="/produits" class="btn-secondary">Voir tous les produits</a>
        </div>
      {/if}
    </div>
  </div>
  
  <style>
    .nouveautes-hero {
      padding-top: 6rem; /* Espace pour la navbar */
      background: linear-gradient(135deg, #B8860B 0%, #704214 60%, #3E240B 100%);
      color: white;
      text-align: center;
      padding-bottom: 5rem;
      position: relative;
      overflow: hidden;
    }
    
    .pattern-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px),
        radial-gradient(circle, rgba(255,255,255,0.05) 2px, transparent 2px);
      background-size: 20px 20px;
      background-position: 0 0, 10px 10px;
      opacity: 0.5;
      pointer-events: none;
    }
    
    .page-title {
      font-family: 'Playfair Display', serif;
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 1rem;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      position: relative;
      display: inline-block;
    }
    
    .page-title::after {
      content: '✧';
      position: absolute;
      bottom: -15px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 1.5rem;
      opacity: 0.7;
    }
    
    .page-subtitle {
      font-family: 'Poppins', sans-serif;
      font-size: 1.25rem;
      max-width: 800px;
      margin: 1.5rem auto 0;
      opacity: 0.9;
    }
    
    /* Loader */
    .loader {
      width: 48px;
      height: 48px;
      border: 5px solid rgba(184, 134, 11, 0.3);
      border-radius: 50%;
      border-top-color: #B8860B;
      animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    /* Styles pour les boutons */
    :global(.btn-primary) {
      display: inline-block;
      background-color: #B8860B;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 0.25rem;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    
    :global(.btn-primary:hover) {
      background-color: #8B6914;
      transform: translateY(-2px);
    }
    
    :global(.btn-secondary) {
      display: inline-block;
      background-color: white;
      color: #B8860B;
      padding: 0.75rem 1.5rem;
      border-radius: 0.25rem;
      font-weight: 500;
      border: 2px solid #B8860B;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    
    :global(.btn-secondary:hover) {
      background-color: #FFF8DC;
      transform: translateY(-2px);
    }
    
    @media (max-width: 768px) {
      .page-title {
        font-size: 2.5rem;
      }
      
      .page-subtitle {
        font-size: 1.1rem;
      }
    }
  </style>