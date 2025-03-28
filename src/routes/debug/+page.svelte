<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  
  let connectionStatus = "Vérification de la connexion...";
  let tablesInfo = {};
  let error = null;
  let sampleCategory = null;
  let sampleProduct = null;
  let sampleImage = null;
  
  onMount(async () => {
    try {
      // Vérifier la connexion
      const { data: connectionTest, error: connectionError } = await supabase.from('categories').select('count');
      
      if (connectionError) {
        connectionStatus = "Échec de la connexion";
        error = connectionError;
        return;
      }
      
      connectionStatus = "Connexion réussie à Supabase";
      
      // Vérifier si les tables existent et contiennent des données
      const tables = ['categories', 'products', 'product_images'];
      
      for (const table of tables) {
        const { count, error: countError } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true });
        
        tablesInfo[table] = {
          exists: !countError,
          count: count,
          error: countError ? countError.message : null
        };
      }

      // Récupérer un exemple de chaque type de données
      const { data: catData } = await supabase.from('categories').select('*').limit(1).single();
      sampleCategory = catData;
      
      const { data: prodData } = await supabase.from('products').select('*').limit(1).single();
      sampleProduct = prodData;
      
      const { data: imgData } = await supabase.from('product_images').select('*').limit(1).single();
      sampleImage = imgData;
    } catch (e) {
      error = e;
      connectionStatus = "Erreur lors de la vérification";
    }
  });
</script>

<div class="container p-4">
  <h1 class="text-2xl font-bold mb-4">Diagnostic de la connexion</h1>
  
  <div class="mb-4 p-4 border rounded">
    <h2 class="font-bold">Statut de la connexion:</h2>
    <p>{connectionStatus}</p>
    
    {#if error}
      <div class="mt-2 p-2 bg-red-100 rounded">
        <h3 class="font-bold text-red-700">Erreur:</h3>
        <pre class="text-sm">{JSON.stringify(error, null, 2)}</pre>
      </div>
    {/if}
  </div>
  
  <div class="mb-4 p-4 border rounded">
    <h2 class="font-bold">Information sur les tables:</h2>
    {#each Object.entries(tablesInfo) as [table, info]}
      <div class="mt-2 p-2 border-b">
        <h3 class="font-bold">{table}:</h3>
        <p>Existe: {info.exists ? 'Oui' : 'Non'}</p>
        {#if info.exists}
          <p>Nombre d'enregistrements: {info.count}</p>
        {:else}
          <p class="text-red-600">Erreur: {info.error}</p>
        {/if}
      </div>
    {/each}
  </div>
  
  <div class="mb-4 p-4 border rounded">
    <h2 class="font-bold">Variables d'environnement:</h2>
    <p>URL Supabase: {import.meta.env.VITE_SUPABASE_URL ? '✓ Définie' : '✗ Non définie'}</p>
    <p>Clé Anon Supabase: {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✓ Définie' : '✗ Non définie'}</p>
  </div>

  {#if sampleCategory}
    <div class="mb-4 p-4 border rounded">
      <h2 class="font-bold">Exemple de catégorie:</h2>
      <pre class="text-sm">{JSON.stringify(sampleCategory, null, 2)}</pre>
    </div>
  {/if}

  {#if sampleProduct}
    <div class="mb-4 p-4 border rounded">
      <h2 class="font-bold">Exemple de produit:</h2>
      <pre class="text-sm">{JSON.stringify(sampleProduct, null, 2)}</pre>
    </div>
  {/if}

  {#if sampleImage}
    <div class="mb-4 p-4 border rounded">
      <h2 class="font-bold">Exemple d'image:</h2>
      <pre class="text-sm">{JSON.stringify(sampleImage, null, 2)}</pre>
    </div>
  {/if}
</div>