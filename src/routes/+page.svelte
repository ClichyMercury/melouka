<script lang=ts>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import HeroSection from '$lib/components/HeroSection.svelte';
  import ProductCard from '$lib/components/ProductCard.svelte';
  
  /**
 * @type {any[]}
 */
  let featuredProducts: any[] = [];
  /**
 * @type {any[]}
 */
  let categories: any[] = [];
  let isLoading = true;
  
  onMount(async () => {
    try {
       // Vérifiez que les variables d'environnement sont bien chargées
      console.log('PUBLIC_SUPABASE_URL disponible:', !!import.meta.env.PUBLIC_SUPABASE_URL);

      console.log('Chargement des produits en vedette...');
      
      // Récupérer les produits mis en avant (modification de is_featured à featured)
      const { data: products, error: productsError } = await supabase
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
        .eq('featured', true)  // Changé de is_featured à featured
        .limit(4);
        
      if (productsError) {
        console.error('Erreur lors du chargement des produits:', productsError);
        throw productsError;
      }
      
      console.log('Produits en vedette trouvés:', products);
      featuredProducts = products;
      
      // Récupérer les catégories
      const { data: cats, error: catsError } = await supabase
        .from('categories')
        .select('*');
        
      if (catsError) throw catsError;
      categories = cats;
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      isLoading = false;
    }
  });
</script>
  
  <svelte:head>
    <title>MELOUKA - Artisanat de tricot ivoirien</title>
  </svelte:head>

  
  
  <div class="w-full">
    <HeroSection 
    title="L'art du tricot artisanal ivoirien"
    description="Des pièces uniques faites à la main avec passion et savoir-faire."
    buttonText="Découvrir la collection"
    buttonUrl="/produits"
  />
    
    <!-- À Propos -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="section-title">Notre Savoir-Faire</h2>
          <p class="text-lg text-gray-600 mb-8">
            MELOUKA est né de la passion pour l'art du tricot, transmis de génération en génération. 
            Chaque pièce est méticuleusement confectionnée à la main, créant ainsi des vêtements et 
            accessoires uniques qui témoignent de l'artisanat ivoirien.
          </p>
          <a href="/a-propos" class="inline-block border-b-2 border-primary text-primary font-medium hover:border-opacity-70 transition-all">
            En savoir plus sur notre histoire
          </a>
        </div>
      </div>
    </section>
    
    <!-- Produits en vedette -->
    <section class="py-16 bg-secondary">
      <div class="container mx-auto px-4">
        <h2 class="section-title">Nos Créations Phares</h2>
        
        {#if isLoading}
          <div class="flex justify-center py-12">
            <div class="loader"></div>
          </div>
        {:else}
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {#each featuredProducts as product (product.id)}
              <ProductCard {product} />
            {/each}
          </div>
          
          <div class="mt-12 text-center">
            <a href="/produits" class="btn-primary">Voir tous les produits</a>
          </div>
        {/if}
      </div>
    </section>
    
    <!-- Catégories -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="section-title">Explorez nos Collections</h2>
        
        {#if isLoading}
          <div class="flex justify-center py-12">
            <div class="loader"></div>
          </div>
        {:else}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {#each categories as category (category.id)}
              <a 
                href={`/categories/${category.slug}`}
                class="category-card group"
              >
                <!-- Fond avec gradient de couleur adapté à chaque catégorie -->
                <div 
                  class="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105 rounded-lg"
                  style="background: {
                    category.slug === 'vetements-femme' ? 'linear-gradient(135deg, #F9A8D4 0%, #E879F9 100%)' : 
                    category.slug === 'vetements-homme' ? 'linear-gradient(135deg, #93C5FD 0%, #3B82F6 100%)' : 
                    category.slug === 'vetements-enfant' ? 'linear-gradient(135deg, #A7F3D0 0%, #34D399 100%)' : 
                    category.slug === 'accessoires' ? 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)' : 
                    'linear-gradient(135deg, #F3F4F6 0%, #9CA3AF 100%)'
                  };"
                >
                  <!-- Overlay texturé pour donner un aspect tricot -->
                  <div class="absolute inset-0 rounded-lg" 
                       style="background-image: radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px); 
                              background-size: 8px 8px; 
                              opacity: 0.4;"></div>
                              
                  <!-- Information de catégorie -->
                  <div class="relative z-10 p-6 text-center">
                    <h3 class="text-2xl font-playfair font-bold text-white mb-2 drop-shadow-md">
                      {category.name}
                    </h3>
                    <span class="inline-block mt-4 px-4 py-1 bg-white bg-opacity-30 backdrop-blur-sm text-white text-sm font-medium rounded-full transform transition-transform group-hover:scale-110">
                      Découvrir
                    </span>
                  </div>
                </div>
              </a>
            {/each}
          </div>
        {/if}
      </div>
    </section>
    
    <!-- Bannière de contact WhatsApp -->
    <section class="py-16 bg-primary text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-playfair font-bold mb-4">Vous avez des questions?</h2>
        <p class="mb-8 max-w-2xl mx-auto">
          N'hésitez pas à nous contacter sur WhatsApp pour toute question concernant nos produits, 
          le processus de commande ou pour des demandes personnalisées.
        </p>
        <a 
          href="https://wa.me/2250546445542?text=Bonjour%20MELOUKA,%20j'aimerais%20en%20savoir%20plus%20sur%20vos%20produits."
          class="inline-flex items-center bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M11.5 2C6.18 2 1.91 6.271 1.91 11.594c0 1.87.55 3.606 1.433 5.068l-1.433 4.232 4.477-1.414c1.354.674 2.834 1.107 4.412 1.107 5.322 0 9.591-4.28 9.591-9.588C20.4 6.276 16.83 2 11.5 2zm0 17.276c-1.714 0-3.3-.441-4.725-1.3l-.349-.214-3.44 1.067 1.074-3.303-.232-.367A7.63 7.63 0 0 1 3.22 11.594c0-4.107 3.374-7.484 7.48-7.484 2.006 0 3.856.775 5.276 2.195A7.38 7.38 0 0 1 18.88 11.59c.006 4.112-3.163 7.486-7.38 7.486z" fill-rule="nonzero"/>
          </svg>
          Contacter sur WhatsApp
        </a>
      </div>
    </section>
  </div>
  
  <style>
    .category-card {
      position: relative;
      aspect-ratio: 1/1;
      overflow: hidden;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      transition: all 0.3s ease;
    }
    
    .category-card:hover {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      transform: translateY(-5px);
    }
  </style>

