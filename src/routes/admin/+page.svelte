<script lang=ts>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { supabase } from '$lib/supabase';
    
    let email = '';
    let password = '';
    let errorMessage = '';
    let isLoading = false;
    
    onMount(async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        goto('/admin/dashboard');
      }
    });
    
    async function handleLogin() {
      errorMessage = '';
      isLoading = true;
      
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) throw error;
        
        goto('/admin/dashboard');
      } catch (error) {
        console.error('Erreur de connexion:', error);
        errorMessage = 'Email ou mot de passe incorrect';
      } finally {
        isLoading = false;
      }
    }
  </script>
  
  <svelte:head>
    <title>Connexion Admin | MELOUKA</title>
  </svelte:head>
  
  <div class="min-h-screen flex items-center justify-center bg-secondary px-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-playfair font-bold text-primary">MELOUKA</h1>
        <p class="text-gray-600 mt-2">Interface d'administration</p>
      </div>
      
      <form on:submit|preventDefault={handleLogin} class="space-y-6">
        {#if errorMessage}
          <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
            {errorMessage}
          </div>
        {/if}
        
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            id="email"
            bind:value={email}
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
          <input 
            type="password" 
            id="password"
            bind:value={password}
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>
        
        <button 
          type="submit"
          class="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          disabled={isLoading}
        >
          {isLoading ? 'Connexion en cours...' : 'Se connecter'}
        </button>
      </form>
    </div>
  </div>