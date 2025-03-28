<script lang=ts>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { supabase } from '$lib/supabase';
  
  // Vérifions d'abord si le module svelte-carousel est disponible
  // Si le composant n'est pas disponible, nous utiliserons une solution de repli
  let SvelteCarousel;
  let SvelteCarouselItem;
  let carouselImported = false;
  
  try {
    // Importation dynamique pour éviter les erreurs si le module n'est pas disponible
    onMount(async () => {
      try {
        const module = await import('svelte-carousel');
        SvelteCarousel = module.SvelteCarousel;
        SvelteCarouselItem = module.SvelteCarouselItem;
        carouselImported = true;
      } catch (error) {
        console.warn("Le module svelte-carousel n'est pas disponible:", error);
        carouselImported = false;
      }
    });
  } catch (error) {
    console.warn("Erreur lors de l'importation:", error);
  }
  
  // svelte-ignore export_let_unused
  export let data;
  
  let product: any = null;
  let selectedImage: string | null = null;
  let isLoading = true;
  
  onMount(async () => {
    try {
      const slug = $page.params.slug;
      
      console.log('Chargement du produit avec slug:', slug);
      
      const { data: productData, error } = await supabase
        .from('products')
        .select(`
          id,
          name,
          description,
          price,
          creation_time,
          delivery_time,
          payment_schedule,
          slug,
          category_id,
          product_images (
            id,
            image_url,
            is_main
          ),
          product_attributes (
            attribute_name,
            attribute_value
          )
        `)
        .eq('slug', slug)
        .single();
        
      if (error) {
        console.error('Erreur lors de la requête:', error);
        throw error;
      }
      
      // Charger la catégorie séparément pour éviter les problèmes de requête imbriquée
      if (productData && productData.category_id) {
        const { data: categoryData, error: categoryError } = await supabase
          .from('categories')
          .select('id, name, slug')
          .eq('id', productData.category_id)
          .single();
          
        if (!categoryError && categoryData) {
          productData.category = categoryData;
        }
      }
      
      product = productData;
      console.log('Produit chargé:', product);
      
      // Définir l'image sélectionnée par défaut (image principale ou première image)
      if (product && product.product_images && product.product_images.length > 0) {
        const mainImage = product.product_images.find(img => img.is_main);
        selectedImage = mainImage ? mainImage.image_url : product.product_images[0].image_url;
      }
    } catch (error) {
      console.error('Erreur lors du chargement du produit:', error);
    } finally {
      isLoading = false;
    }
  });
  
  function formatPrice(price: string | number | bigint) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(Number(price));
  }
  
  function generateWhatsAppLink() {
    const baseUrl = 'https://wa.me/2250546445542'; // Numéro WhatsApp
    
    if (!product) return baseUrl;
    
    const message = encodeURIComponent(
      `Bonjour MELOUKA,\n` +
      `Je suis intéressé(e) par le produit "${product.name}" à ${formatPrice(product.price)}.\n` +
      `Pouvez-vous me donner plus d'informations sur la disponibilité et la livraison ?`
    );
    
    return `${baseUrl}?text=${message}`;
  }
</script>

<svelte:head>
  {#if product}
    <title>{product.name} | MELOUKA</title>
    <meta name="description" content={product.description} />
  {:else}
    <title>Chargement du produit... | MELOUKA</title>
  {/if}
</svelte:head>

<div class="pt-24 pb-16 bg-secondary">
  <div class="container mx-auto px-4">
    {#if isLoading}
      <div class="flex justify-center py-20">
        <div class="loader"></div>
      </div>
    {:else if !product}
      <div class="py-20 text-center">
        <h1 class="text-2xl font-playfair mb-4">Produit non trouvé</h1>
        <p class="text-gray-600 mb-8">Le produit que vous recherchez n'existe pas ou a été supprimé.</p>
        <a href="/produits" class="btn-primary">Voir tous les produits</a>
      </div>
    {:else}
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0">
          <!-- Images du produit (mobile) -->
          <div class="block md:hidden w-full">
            {#if product.product_images && product.product_images.length > 0}
              <!-- Solution de secours si svelte-carousel n'est pas disponible -->
              {#if !carouselImported}
                <div class="relative w-full h-[60vh]">
                  <img 
                    src={selectedImage || product.product_images[0].image_url} 
                    alt={product.name} 
                    class="w-full h-full object-cover"
                  />
                </div>
              {:else}
                <svelte:component this={SvelteCarousel} autoplay={true} pauseOnFocus={true} arrows={true}>
                  {#each product.product_images as image}
                    <svelte:component this={SvelteCarouselItem}>
                      <img 
                        src={image.image_url} 
                        alt={product.name} 
                        class="w-full h-[60vh] object-cover"
                      />
                    </svelte:component>
                  {/each}
                </svelte:component>
              {/if}
            {:else}
              <div class="w-full h-[60vh] flex items-center justify-center bg-gray-200">
                <span class="text-gray-400">Aucune image</span>
              </div>
            {/if}
          </div>
          
          <!-- Galerie d'images (desktop) -->
          <div class="hidden md:block md:col-span-2 lg:col-span-3">
            <div class="grid grid-cols-5 h-full">
              <!-- Miniatures -->
              <div class="hidden lg:flex flex-col gap-4 p-4 border-r border-gray-100">
                {#if product.product_images && product.product_images.length > 0}
                  {#each product.product_images as image}
                    <button 
                      class={`w-full aspect-square border-2 transition-colors ${selectedImage === image.image_url ? 'border-primary' : 'border-transparent hover:border-gray-300'}`}
                      on:click={() => selectedImage = image.image_url}
                    >
                      <img 
                        src={image.image_url} 
                        alt={product.name} 
                        class="w-full h-full object-cover"
                      />
                    </button>
                  {/each}
                {/if}
              </div>
              
              <!-- Image principale -->
              <div class="col-span-5 lg:col-span-4">
                {#if selectedImage}
                  <img 
                    src={selectedImage} 
                    alt={product.name} 
                    class="w-full h-full object-contain"
                  />
                {:else if product.product_images && product.product_images.length > 0}
                  <img 
                    src={product.product_images[0].image_url} 
                    alt={product.name} 
                    class="w-full h-full object-contain"
                  />
                {:else}
                  <div class="w-full h-full flex items-center justify-center bg-gray-200">
                    <span class="text-gray-400">Aucune image</span>
                  </div>
                {/if}
              </div>
            </div>
          </div>
          
          <!-- Détails du produit -->
          <div class="md:col-span-2 p-8">
            <div class="mb-2">
              {#if product.category}
                <a href={`/categories/${product.category.slug}`} class="text-sm text-gray-500 hover:text-primary">
                  {product.category.name}
                </a>
              {/if}
            </div>
            
            <h1 class="text-3xl font-playfair font-bold mb-4">{product.name}</h1>
            
            <div class="text-2xl font-medium text-primary mb-6">
              {formatPrice(product.price)}
            </div>
            
            <div class="border-t border-b border-gray-200 py-6 my-6">
              <p class="whitespace-pre-line text-gray-700 mb-4">
                {product.description || "Aucune description disponible pour ce produit."}
              </p>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-1">Temps de confection</h3>
                <p>{product.creation_time || "Non spécifié"}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-1">Délai de livraison</h3>
                <p>{product.delivery_time || "Non spécifié"}</p>
              </div>
              {#if product.payment_schedule}
                <div class="sm:col-span-2">
                  <h3 class="text-sm font-medium text-gray-500 mb-1">Échéancier de paiement</h3>
                  <p>{product.payment_schedule}</p>
                </div>
              {/if}
            </div>
            
            {#if product.product_attributes && product.product_attributes.length > 0}
              <div class="mb-8">
                <h3 class="text-sm font-medium text-gray-500 mb-2">Caractéristiques</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  {#each product.product_attributes as attribute}
                    <div>
                      <span class="text-sm text-gray-500">{attribute.attribute_name}: </span>
                      <span>{attribute.attribute_value}</span>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
            
            <a 
              href={generateWhatsAppLink()}
              class="w-full bg-primary text-white py-3 flex items-center justify-center font-medium text-center rounded-md hover:bg-opacity-90 transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M11.5 2C6.18 2 1.91 6.271 1.91 11.594c0 1.87.55 3.606 1.433 5.068l-1.433 4.232 4.477-1.414c1.354.674 2.834 1.107 4.412 1.107 5.322 0 9.591-4.28 9.591-9.588C20.4 6.276 16.83 2 11.5 2zm0 17.276c-1.714 0-3.3-.441-4.725-1.3l-.349-.214-3.44 1.067 1.074-3.303-.232-.367A7.63 7.63 0 0 1 3.22 11.594c0-4.107 3.374-7.484 7.48-7.484 2.006 0 3.856.775 5.276 2.195A7.38 7.38 0 0 1 18.88 11.59c.006 4.112-3.163 7.486-7.38 7.486z" fill-rule="nonzero"/>
              </svg>
              Commander sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  /* Classes utilitaires propres au projet */
  :global(.bg-primary) {
    background-color: #B8860B !important;
  }
  
  :global(.text-primary) {
    color: #B8860B !important;
  }
  
  :global(.border-primary) {
    border-color: #B8860B !important;
  }
  
  :global(.bg-secondary) {
    background-color: #FFF8DC !important;
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
</style>