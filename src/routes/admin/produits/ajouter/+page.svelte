<script lang=ts>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { supabase } from '$lib/supabase';
    
    let categories: any[] = [];
    let isLoading = true;
    let isSaving = false;
    let successMessage = '';
    let errorMessage = '';
    
    // Formulaire
    let name = '';
    let description = '';
    let price = '';
    let categoryId = '';
    let confectionTime = '';
    let deliveryTime = '';
    let paymentSchedule = '';
    let isPublished = false;
    let isFeatured = false;
    let productAttributes = [{ name: '', value: '' }];
    let uploadedImages: any[] = [];
    let uploadProgress = 0;
    
    onMount(async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          return goto('/admin');
        }
        
        // Charger les catégories
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name');
          
        if (error) throw error;
        categories = data;
      } catch (error) {
        console.error('Erreur:', error);
        errorMessage = "Erreur lors du chargement des données.";
      } finally {
        isLoading = false;
      }
    });
    
    function addAttribute() {
      productAttributes = [...productAttributes, { name: '', value: '' }];
    }
    
    function removeAttribute(index: number) {
      productAttributes = productAttributes.filter((_, i) => i !== index);
    }
    
    async function handleImageUpload(event: Event) {
      const input = event.target as HTMLInputElement;
      const files = input?.files;
      
      if (!files || files.length === 0) return;
      
      for (const file of files) {
        if (!file.type.startsWith('image/')) {
          errorMessage = 'Veuillez sélectionner uniquement des images.';
          continue;
        }
        
        // Créer une prévisualisation
        const reader = new FileReader();
        reader.onload = (e) => {
          uploadedImages = [...uploadedImages, {
            file,
            preview: e.target?.result || '',
            name: file.name,
            isPrimary: uploadedImages.length === 0, // Premier = principal
            uploaded: false,
            url: null
          }];
        };
        reader.readAsDataURL(file);
      }
      
      // Reset l'input file
      if (event.target) {
        (event.target as HTMLInputElement).value = '';
      }
    }
    
    function removeImage(index: number) {
      const wasPrimary = uploadedImages[index].isPrimary;
      uploadedImages = uploadedImages.filter((_, i) => i !== index);
      
      // Si l'image principale a été supprimée, définir la première comme principale
      if (wasPrimary && uploadedImages.length > 0) {
        uploadedImages[0].isPrimary = true;
      }
    }
    
    function setPrimaryImage(index: number) {
      uploadedImages = uploadedImages.map((img, i) => ({
        ...img,
        isPrimary: i === index
      }));
    }
    
    async function handleSubmit() {
      try {
        errorMessage = '';
        successMessage = '';
        isSaving = true;
        
        // Validation de base
        if (!name || !price || !categoryId) {
          throw new Error('Veuillez remplir tous les champs obligatoires.');
        }
        
        // 1. Créer le produit
        const { data: product, error: productError } = await supabase
          .from('products')
          .insert([
            {
              name,
              description,
              price: parseFloat(price),
              category_id: categoryId,
              creation_time: confectionTime,
              delivery_time: deliveryTime,
              payment_schedule: paymentSchedule,
              is_published: isPublished,
              featured: isFeatured
            }
          ])
          .select()
          .single();
          
        if (productError) throw productError;
        
        // 2. Ajouter les attributs
        if (productAttributes.length > 0) {
          const validAttributes = productAttributes.filter(attr => attr.name && attr.value);
          
          if (validAttributes.length > 0) {
            const attributesToInsert = validAttributes.map(attr => ({
              product_id: product.id,
              attribute_name: attr.name,
              attribute_value: attr.value
            }));
            
            const { error: attrError } = await supabase
              .from('product_attributes')
              .insert(attributesToInsert);
              
            if (attrError) throw attrError;
          }
        }
        
        // 3. Uploader les images
        if (uploadedImages.length > 0) {
          for (let i = 0; i < uploadedImages.length; i++) {
            const img = uploadedImages[i];
            const fileExt = img.file.name.split('.').pop();
            const fileName = `${product.id}_${Date.now()}_${i}.${fileExt}`;
            
            // Upload de l'image
            const { data: fileData, error: uploadError } = await supabase.storage
              .from('product-images')
              .upload(`products/${fileName}`, img.file);
              
            if (uploadError) throw uploadError;
            
            // Obtenir l'URL publique
            const { data: urlData } = await supabase.storage
              .from('product-images')
              .getPublicUrl(`products/${fileName}`);
              
            // Enregistrer l'image dans la base de données
            const { error: imgError } = await supabase
              .from('product_images')
              .insert([
                {
                  product_id: product.id,
                  url: urlData.publicUrl,
                  is_main       : img.isPrimary
                }
              ]);
              
            if (imgError) throw imgError;
            
            // Mettre à jour la progression
            uploadProgress = ((i + 1) / uploadedImages.length) * 100;
          }
        }
        
        successMessage = 'Produit ajouté avec succès!';
        
        // Réinitialiser le formulaire après quelques secondes
        setTimeout(() => {
          goto(`/admin/produits/${product.id}/modifier`);
        }, 2000);
        
      } catch (error) {
        console.error('Erreur lors de l\'ajout du produit:', error);
        errorMessage = error instanceof Error ? error.message : 'Erreur lors de l\'ajout du produit.';
      } finally {
        isSaving = false;
      }
    }
  </script>
  
  <svelte:head>
    <title>Ajouter un Produit | MELOUKA Admin</title>
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
          <a href="/admin/produits" class="text-sm text-gray-600 hover:text-primary">
            Produits
          </a>
        </div>
      </div>
    </header>
    
    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-2xl font-playfair font-bold mb-6">Ajouter un Produit</h2>
      
      {#if isLoading}
        <div class="flex justify-center py-12">
          <div class="loader"></div>
        </div>
      {:else}
        <form on:submit|preventDefault={handleSubmit} class="bg-white rounded-lg shadow-md p-6">
          {#if successMessage}
            <div class="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
              {successMessage}
            </div>
          {/if}
          
          {#if errorMessage}
            <div class="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {errorMessage}
            </div>
          {/if}
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Informations principales -->
            <div class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                  Nom du produit *
                </label>
                <input 
                  type="text" 
                  id="name"
                  bind:value={name}
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label for="price" class="block text-sm font-medium text-gray-700 mb-1">
                  Prix (XOF) *
                </label>
                <input 
                  type="number" 
                  id="price"
                  bind:value={price}
                  min="0"
                  step="100"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie *
                </label>
                <select 
                  id="category"
                  bind:value={categoryId}
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Sélectionner une catégorie</option>
                  {#each categories as category}
                    <option value={category.id}>{category.name}</option>
                  {/each}
                </select>
              </div>
              
              <div>
                <label for="confectionTime" class="block text-sm font-medium text-gray-700 mb-1">
                  Temps de confection
                </label>
                <input 
                  type="text" 
                  id="confectionTime"
                  bind:value={confectionTime}
                  placeholder="Ex: 2-3 semaines"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label for="deliveryTime" class="block text-sm font-medium text-gray-700 mb-1">
                  Délai de livraison
                </label>
                <input 
                  type="text" 
                  id="deliveryTime"
                  bind:value={deliveryTime}
                  placeholder="Ex: 2-3 jours"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label for="paymentSchedule" class="block text-sm font-medium text-gray-700 mb-1">
                  Échéancier de paiement
                </label>
                <input 
                  type="text" 
                  id="paymentSchedule"
                  bind:value={paymentSchedule}
                  placeholder="Ex: 50% à la commande, 50% à la livraison"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="isPublished"
                    bind:checked={isPublished}
                    class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label for="isPublished" class="ml-2 block text-sm text-gray-700">
                    Publier immédiatement
                  </label>
                </div>
                
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="isFeatured"
                    bind:checked={isFeatured}
                    class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label for="isFeatured" class="ml-2 block text-sm text-gray-700">
                    Mettre en avant
                  </label>
                </div>
              </div>
            </div>
            
            <!-- Description et attributs -->
            <div class="space-y-6">
              <div>
                <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea 
                  id="description"
                  bind:value={description}
                  rows="5"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                ></textarea>
              </div>
              
              <div>
                <div class="flex justify-between items-center mb-2">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="block text-sm font-medium text-gray-700">
                    Caractéristiques du produit
                  </label>
                  <button 
                    type="button"
                    on:click={addAttribute}
                    class="text-sm text-primary hover:text-opacity-80"
                  >
                    + Ajouter
                  </button>
                </div>
                
                {#each productAttributes as attribute, i}
                  <div class="flex gap-2 mb-2">
                    <input 
                      type="text" 
                      placeholder="Nom (ex: Matière)"
                      bind:value={attribute.name}
                      class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <input 
                      type="text" 
                      placeholder="Valeur (ex: Coton)"
                      bind:value={attribute.value}
                      class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {#if i > 0 || productAttributes.length > 1}
                      <!-- svelte-ignore a11y_consider_explicit_label -->
                      <button 
                        type="button"
                        on:click={() => removeAttribute(i)}
                        class="px-2 py-2 text-red-500 hover:text-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
          </div>
          
          <!-- Images -->
          <div class="mb-8">
            <div class="flex justify-between items-center mb-2">
              <!-- svelte-ignore a11y_label_has_associated_control -->
              <label class="block text-sm font-medium text-gray-700">
                Images du produit
              </label>
              <input 
                type="file"
                id="imageUpload"
                accept="image/*"
                multiple
                on:change={handleImageUpload}
                class="hidden"
              />
              <label 
                for="imageUpload"
                class="cursor-pointer text-sm text-primary hover:text-opacity-80"
              >
                + Ajouter des images
              </label>
            </div>
            
            {#if uploadedImages.length > 0}
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                {#each uploadedImages as image, i}
                  <div class="relative border rounded-md overflow-hidden">
                    <img 
                      src={image.preview} 
                      alt={image.name}
                      class="w-full h-32 object-cover"
                    />
                    <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex flex-col justify-between p-2">
                      <div class="flex justify-end">
                        <!-- svelte-ignore a11y_consider_explicit_label -->
                        <button 
                          type="button"
                          on:click={() => removeImage(i)}
                          class="bg-white p-1 rounded-full shadow-md"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      <div class="text-center">
                        <button 
                          type="button"
                          on:click={() => setPrimaryImage(i)}
                          class={`text-xs px-2 py-1 rounded ${image.isPrimary ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
                        >
                          {image.isPrimary ? 'Image principale' : 'Définir comme principale'}
                        </button>
                      </div>
                    </div>
                  </div>
                {/each}
              </div>
            {:else}
              <div class="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <p class="text-gray-500 mb-2">Aucune image sélectionnée</p>
                <p class="text-sm text-gray-400">Formats acceptés: JPG, PNG, GIF</p>
              </div>
            {/if}
          </div>
          
          {#if isSaving && uploadProgress > 0}
            <div class="mb-6">
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-primary h-2.5 rounded-full" style="width: {uploadProgress}%"></div>
              </div>
              <p class="text-sm text-gray-500 mt-1">Upload des images: {Math.round(uploadProgress)}%</p>
            </div>
          {/if}
          
          <!-- Boutons -->
          <div class="flex justify-end space-x-4">
            <a 
              href="/admin/produits"
              class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </a>
            <button 
              type="submit"
              class="px-6 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
              disabled={isSaving}
            >
              {isSaving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      {/if}
    </div>
  </div>
  
>