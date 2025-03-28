<script lang=ts>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { supabase } from '$lib/supabase';
    
    let products: any[] = [];
    let categories: any[] = [];
    let isLoading = true;
    let searchTerm = '';
    let categoryFilter: null = null;
    
    onMount(async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          return goto('/admin');
        }
        
        // Charger les catégories
        const { data: catsData, error: catsError } = await supabase
          .from('categories')
          .select('*')
          .order('name');
          
        if (catsError) throw catsError;
        categories = catsData;
        
        // Charger les produits
        await fetchProducts();
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        isLoading = false;
      }
    });
    
    async function fetchProducts() {
      isLoading = true;
      
      try {
        let query = supabase
          .from('products')
          .select(`
            id,
            name,
            price,
            is_published,
            slug,
            created_at,
            category:categories(id, name)
          `)
          .order('created_at', { ascending: false });
          
        if (searchTerm) {
          query = query.ilike('name', `%${searchTerm}%`);
        }
        
        if (categoryFilter) {
          query = query.eq('category_id', categoryFilter);
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
    
    function formatDate(dateString: string | number | Date) {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date);
    }
    
    function formatPrice(price: string | number | bigint) {
      return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(Number(price));
    }
    
    async function togglePublished(productId: any, currentStatus: any) {
      try {
        const { error } = await supabase
          .from('products')
          .update({ is_published: !currentStatus })
          .eq('id', productId);
          
        if (error) throw error;
        
        // Mise à jour locale
        products = products.map(p => {
          if (p.id === productId) {
            return { ...p, is_published: !currentStatus };
          }
          return p;
        });
      } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
      }
    }
    
    async function deleteProduct(productId: any) {
      if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.')) {
        return;
      }
      
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', productId);
          
        if (error) throw error;
        
        // Mise à jour locale
        products = products.filter(p => p.id !== productId);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
    
    function handleSearch() {
      fetchProducts();
    }
    
    function handleCategoryFilter(catId: null) {
      categoryFilter = catId === categoryFilter ? null : catId;
      fetchProducts();
    }
  </script>
  
  <svelte:head>
    <title>Gestion des Produits | MELOUKA Admin</title>
  </svelte:head>
  
  <div class="min-h-screen bg-gray-100">
    <!-- Dashboard Header -->
    <header class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 class="text-xl font-playfair font-bold text-primary">MELOUKA Admin</h1>
        </div>
        
        <div class="flex items-center gap-4">
          <a href="/admin/dashboard" class="text-sm text-gray-600 hover:text-primary">
            Dashboard
          </a>
          <a 
            href="/admin/produits/ajouter"
            class="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-opacity-90 transition-colors"
          >
            Ajouter un produit
          </a>
        </div>
      </div>
    </header>
    
    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-2xl font-playfair font-bold mb-6">Gestion des Produits</h2>
      
      <!-- Filtres -->
      <div class="bg-white p-4 rounded-lg shadow-md mb-6">
    
        <div class="flex flex-col md:flex-row md:items-center gap-4">
        <!-- Recherche -->
        <div class="flex-grow">
          <div class="relative">
            <input 
              type="text"
              bind:value={searchTerm}
              placeholder="Rechercher un produit..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              on:keydown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <!-- Filtre par catégorie -->
        <div class="flex flex-wrap gap-2">
          <button 
            class={`px-3 py-1 text-sm rounded-full ${categoryFilter === null ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            on:click={() => handleCategoryFilter(null)}
          >
            Toutes
          </button>
          
          {#each categories as category}
            <button 
              class={`px-3 py-1 text-sm rounded-full ${categoryFilter === category.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              on:click={() => handleCategoryFilter(category.id)}
            >
              {category.name}
            </button>
          {/each}
        </div>
      </div>
    </div>
    
    <!-- Liste des produits -->
    {#if isLoading}
      <div class="flex justify-center py-12">
        <div class="loader"></div>
      </div>
    {:else if products.length === 0}
      <div class="bg-white p-8 rounded-lg shadow-md text-center">
        <p class="text-gray-600 mb-4">Aucun produit trouvé avec les filtres actuels.</p>
        <a href="/admin/produits/ajouter" class="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
          Ajouter un produit
        </a>
      </div>
    {:else}
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 text-left">
                <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
                <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              {#each products as product (product.id)}
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="font-medium text-gray-900">{product.name}</div>
                    <div class="text-sm text-gray-500">{product.slug}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {product.category ? product.category.name : '-'}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {formatPrice(product.price)}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(product.created_at)}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <button 
                      class={`px-2 py-1 text-xs rounded-full ${product.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                      on:click={() => togglePublished(product.id, product.is_published)}
                    >
                      {product.is_published ? 'Publié' : 'Brouillon'}
                    </button>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex items-center space-x-2">
                      <a href={`/admin/produits/${product.id}/modifier`} class="text-indigo-600 hover:text-indigo-900">
                        Modifier
                      </a>
                      <button 
                        class="text-red-600 hover:text-red-900"
                        on:click={() => deleteProduct(product.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {/if}
  </div>
</div>
