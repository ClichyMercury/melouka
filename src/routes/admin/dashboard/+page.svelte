<script lang=ts>
 import type { User } from '@supabase/supabase-js';

    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { supabase } from '$lib/supabase';
    
    /**
   * @type {import("@supabase/auth-js").User | null}
   */
    let user: User | null = null;
    let isLoading = true;
    
    onMount(async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          return goto('/admin');
        }
        
        user = session.user;
      } catch (error) {
        console.error('Erreur de vérification de session:', error);
        goto('/admin');
      } finally {
        isLoading = false;
      }
    });
    
    async function handleSignOut() {
      try {
        await supabase.auth.signOut();
        goto('/admin');
      } catch (error) {
        console.error('Erreur de déconnexion:', error);
      }
    }
</script>
  
  <svelte:head>
    <title>Tableau de bord Admin | MELOUKA</title>
  </svelte:head>
  
  <div class="min-h-screen bg-gray-100">
    {#if isLoading}
      <div class="flex justify-center items-center h-screen">
        <div class="loader"></div>
      </div>
    {:else}
      <!-- Dashboard Header -->
      <header class="bg-white shadow-md">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 class="text-xl font-playfair font-bold text-primary">MELOUKA Admin</h1>
          </div>
          
          <div class="flex items-center gap-4">
            <span class="text-sm text-gray-600">
              {user ? user.email : ''}
            </span>
            <button 
              on:click={handleSignOut}
              class="text-sm text-red-600 hover:text-red-800"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>
      
      <!-- Main Content -->
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <a 
            href="/admin/produits"
            class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 class="text-lg font-medium mb-2">Produits</h2>
            <p class="text-gray-600">Gérer les produits, ajouter de nouveaux articles ou modifier les existants.</p>
          </a>
          
          <a 
            href="/admin/categories"
            class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 class="text-lg font-medium mb-2">Catégories</h2>
            <p class="text-gray-600">Gérer les catégories et leur organisation.</p>
          </a>
          
          <a 
            href="/admin/parametres"
            class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 class="text-lg font-medium mb-2">Paramètres</h2>
            <p class="text-gray-600">Configurer les paramètres du site et de l'application.</p>
          </a>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-lg font-medium mb-4">Guide rapide</h2>
          
          <div class="space-y-4">
            <div>
              <h3 class="font-medium text-primary">Ajouter un produit</h3>
              <p class="text-gray-600 text-sm mt-1">
                Accédez à la section Produits, cliquez sur "Ajouter un produit" et remplissez le formulaire avec les détails du produit.
              </p>
            </div>
            
            <div>
              <h3 class="font-medium text-primary">Gérer les images</h3>
              <p class="text-gray-600 text-sm mt-1">
                Pour chaque produit, vous pouvez ajouter plusieurs images. L'image marquée comme "principale" sera affichée en premier.
              </p>
            </div>
            
            <div>
              <h3 class="font-medium text-primary">Publier un produit</h3>
              <p class="text-gray-600 text-sm mt-1">
                Après avoir créé un produit, assurez-vous de le publier en activant l'option "Publié" pour qu'il soit visible sur le site.
              </p>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
  
