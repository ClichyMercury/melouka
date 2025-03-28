<script lang=ts>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    import ProductCard from '$lib/components/ProductCard.svelte';
    
    
    /**
   * @type {string | any[]}
   */
    let products: string | any[] = [];
    /**
   * @type {any[]}
   */
    let categories: any[] = [];
    /**
   * @type {null | undefined}
   */
    let selectedCategory: null | undefined = null;
    let isLoading = true;
    
    onMount(async () => {
      try {
        // Récupérer les catégories
        const { data: cats, error: catsError } = await supabase
          .from('categories')
          .select('*')
          .order('name');
          
        if (catsError) throw catsError;
        categories = cats;
        
        // Récupérer tous les produits
        await fetchProducts();
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        isLoading = false;
      }
    });
    
    async function fetchProducts(categoryId = null) {
      isLoading = true;
      
      try {
        let query = supabase
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
          .order('created_at', { ascending: false });
          
        if (categoryId) {
          query = query.eq('category_id', categoryId);
        }
        
        const { data, error } = await query;
          
        if (error) throw error;
        products = data;
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      } finally {
        isLoading = false;
      }
    }
    
    /**
   * @param {null} categoryId
   */
    function handleCategoryClick(categoryId: null | undefined) {
      selectedCategory = categoryId === selectedCategory ? null : categoryId;
      fetchProducts(selectedCategory);
    }
  </script>
  
  <svelte:head>
    <title>Tous les Produits | MELOUKA</title>
  </svelte:head>
  
  <div class="pt-24 pb-16 bg-primary text-white">
    <div class="container mx-auto px-4">
      <h1 class="section-title mt-8">Découvrez Nos Créations</h1>
      
      <!-- Filtres par catégorie -->
      <div class="mb-10 flex flex-wrap justify-center gap-4">
        <button 
          class={`px-4 py-2 rounded-full transition-colors ${selectedCategory === null ? 'bg-primary text-white' : 'bg-white text-text hover:bg-gray-100'}`}
          on:click={() => handleCategoryClick(null)}
        >
          Tous
        </button>
        
        {#each categories as category}
          <button 
            class={`px-4 py-2 rounded-full transition-colors ${selectedCategory === category.id ? 'bg-primary text-white' : 'bg-white text-text hover:bg-gray-100'}`}
            on:click={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </button>
        {/each}
      </div>
      
      {#if isLoading}
        <div class="flex justify-center py-12">
          <div class="loader"></div>
        </div>
      {:else if products.length === 0}
        <div class="text-center py-12">
          <p class="text-lg text-gray-600">Aucun produit trouvé dans cette catégorie.</p>
        </div>
      {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {#each products as product (product.id)}
            <ProductCard {product} />
          {/each}
        </div>
      {/if}
    </div>
  </div>
  
