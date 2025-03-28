<script lang=ts>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { supabase } from '$lib/supabase';
  import ProductCard from '$lib/components/ProductCard.svelte';
  
  let category: { id: any; name: any; description: any; slug: string; } | null = null;
  let products: string | any[] = [];
  let isLoading = true;
  let error: string | null = null;
  
  // Définir les couleurs de fond en fonction de la catégorie
  $: categoryColor = getCategoryColor(category?.slug);
  
  function getCategoryColor(slug: string | undefined) {
    if (!slug) return 'linear-gradient(135deg, #FFF8DC 0%, #F3F4F6 100%)';
    
    const colorMap: Record<string, string> = {
      'vetements-femme': 'linear-gradient(135deg, #F9A8D4 0%, #E879F9 100%)', 
      'vetements-homme': 'linear-gradient(135deg, #93C5FD 0%, #3B82F6 100%)',
      'vetements-enfant': 'linear-gradient(135deg, #A7F3D0 0%, #34D399 100%)',
      'accessoires': 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)'
    };
    
    return colorMap[slug] || 'linear-gradient(135deg, #FFF8DC 0%, #F3F4F6 100%)';
  }
  
  onMount(async () => {
    try {
      const slug = $page.params.slug;
      
      // Tableau de correspondance pour les slugs
      const slugMap: Record<string, string> = {
        'femmes': 'vetements-femme',
        'hommes': 'vetements-homme',
        'enfants': 'vetements-enfant',
        'accessoires': 'accessoires'
      };
      
      // Utiliser le slug mappé s'il existe, sinon utiliser le slug original
      const searchSlug = slugMap[slug] || slug;
      
      console.log('Recherche de la catégorie avec slug:', searchSlug);
      
      // Récupérer la catégorie
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', searchSlug)
        .single();
      
      if (categoryError) {
        console.error('Erreur catégorie:', categoryError);
        throw categoryError;
      }
      
      if (!categoryData) {
        throw new Error(`Aucune catégorie trouvée avec le slug: ${searchSlug}`);
      }
      
      category = categoryData;
      console.log('Catégorie trouvée:', category);
      
      // Récupérer les produits de cette catégorie
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select(`
          id,
          name,
          price,
          creation_time,
          delivery_time,
          slug,
          product_images (
            id,
            image_url,
            is_main
          )
        `)
        .eq('category_id', category?.id);
      
      if (productsError) {
        console.error('Erreur produits:', productsError);
        throw productsError;
      }
      
      products = productsData || [];
      console.log('Produits trouvés:', products);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      isLoading = false;
    }
  });
</script>
  
<svelte:head>
  {#if category}
    <title>{category.name} | MELOUKA</title>
  {:else}
    <title>Catégorie | MELOUKA</title>
  {/if}
</svelte:head>

<!-- Hero de catégorie personnalisé avec la couleur correspondante -->
<div class="category-hero" style="background: {categoryColor}">
  <div class="container mx-auto px-4 py-16 text-center">
    {#if isLoading}
      <div class="loader-container">
        <div class="loader"></div>
      </div>
    {:else if category}
      <h1 class="category-title">{category.name}</h1>
      {#if category.description}
        <p class="category-description">{category.description}</p>
      {/if}
    {:else}
      <h1 class="category-title">Catégorie non trouvée</h1>
    {/if}
  </div>
  
  <!-- Motif texturé pour évoquer le tricot -->
  <div class="pattern-overlay"></div>
</div>
  
<div class="py-16 bg-white">
  <div class="container mx-auto px-4">
    {#if isLoading}
      <div class="flex justify-center py-12">
        <div class="loader"></div>
      </div>
    {:else if !category}
      <div class="py-16 text-center">
        <p class="text-gray-600 mb-8">La catégorie que vous recherchez n'existe pas ou a été supprimée.</p>
        <a href="/produits" class="btn-primary">Voir tous les produits</a>
      </div>
    {:else}
      {#if products.length === 0}
        <div class="text-center py-12">
          <p class="text-lg text-gray-600">Aucun produit trouvé dans cette catégorie.</p>
          <a href="/produits" class="btn-secondary mt-6">Voir tous les produits</a>
        </div>
      {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {#each products as product (product.id)}
            <ProductCard {product} />
          {/each}
        </div>
      {/if}
    {/if}
  </div>
</div>

<style>
  .category-hero {
    padding-top: 6rem; /* Espace pour la navbar */
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
      radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px),
      radial-gradient(circle, rgba(255,255,255,0.1) 2px, transparent 2px);
    background-size: 20px 20px;
    background-position: 0 0, 10px 10px;
    opacity: 0.5;
    pointer-events: none;
  }
  
  .category-title {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    font-weight: bold;
    color: white;
    margin-bottom: 1rem;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  
  .category-description {
    font-family: 'Poppins', sans-serif;
    font-size: 1.1rem;
    color: white;
    max-width: 800px;
    margin: 0 auto;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  }
  
  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }
  
  .loader {
    width: 48px;
    height: 48px;
    border: 5px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #B8860B;
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  /* Styles pour les boutons */
  :global(.btn-primary) {
    background-color: #B8860B;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.25rem;
    display: inline-block;
    font-weight: 500;
    transition: all 0.3s ease;
  }
  
  :global(.btn-primary:hover) {
    background-color: #8B6914;
    transform: translateY(-2px);
  }
  
  :global(.btn-secondary) {
    background-color: white;
    color: #B8860B;
    padding: 0.75rem 1.5rem;
    border-radius: 0.25rem;
    display: inline-block;
    font-weight: 500;
    border: 2px solid #B8860B;
    transition: all 0.3s ease;
  }
  
  :global(.btn-secondary:hover) {
    background-color: #FFF8DC;
    transform: translateY(-2px);
  }
</style>