<script lang=ts>
  import { page } from '$app/stores';
  import Logo from './Logo.svelte';
  import { onMount } from 'svelte';
  
  let scrolled = false;
  let mobileMenuOpen = false;
  
  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 20;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
  
  const toggleMobileMenu = () => {
    mobileMenuOpen = !mobileMenuOpen;
  };
  
  const navItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Femmes', path: '/categories/femmes' },
    { label: 'Hommes', path: '/categories/hommes' },
    { label: 'Enfants', path: '/categories/enfants' },
    { label: 'Accessoires', path: '/categories/accessoires' },
    { label: 'À propos', path: '/a-propos' },
  ];
</script>

<nav class={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
<div class="container mx-auto px-4 flex justify-between items-center">
  <a href="/" class="z-10">
    <Logo />
  </a>
  
  <!-- Desktop Menu -->
  <div class="hidden md:flex space-x-8">
    {#each navItems as item}
      <a 
        href={item.path}
        class="font-poppins text-sm font-medium tracking-wide hover:text-primary transition-colors duration-200"
        class:text-primary={$page.url.pathname === item.path}
        class:text-white={!scrolled && $page.url.pathname !== item.path}
      >
        {item.label}
      </a>
    {/each}
  </div>
  
  <div class="hidden md:flex items-center space-x-4">
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <a href="/produits" class={`transition-colors ${scrolled ? 'text-gray-800' : 'text-white'} hover:text-primary`}>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    </a>
    <a href="/contact" class="btn-contact">Contact</a>
  </div>
  
  <!-- Mobile Menu Button -->
  <button 
    class="md:hidden" 
    on:click={toggleMobileMenu}
    aria-label="Menu"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      class="h-6 w-6" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke={scrolled ? "currentColor" : "white"}
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
      />
    </svg>
  </button>
</div>

<!-- Mobile Menu -->
{#if mobileMenuOpen}
  <div class="absolute top-0 left-0 w-full bg-white shadow-md pt-20 pb-6 px-4 md:hidden z-0">
    <div class="flex flex-col space-y-4">
      {#each navItems as item}
        <a 
          href={item.path}
          class="font-poppins text-sm py-2 border-b border-gray-100 hover:text-primary transition-colors duration-200"
          class:text-primary={$page.url.pathname === item.path}
          on:click={() => mobileMenuOpen = false}
        >
          {item.label}
        </a>
      {/each}
      <a href="/contact" class="btn-contact text-center mt-4">Contact</a>
    </div>
  </div>
{/if}
</nav>

<style>
/* Couleurs du projet */
:global(.text-primary) {
  color: #B8860B !important; /* Or */
}
:global(.btn-contact) {
  background-color: #B8860B;
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 0.25rem;
  font-weight: 500;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  border: 2px solid #B8860B;
}
:global(.btn-contact:hover) {
  background-color: transparent;
  color: #B8860B;
}

/* Animation subtile quand on survole les liens */
a {
  position: relative;
}

/* Animation de ligne sous les liens du menu */
.hidden a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -5px;
  left: 50%;
  background-color: #B8860B;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.hidden a:hover::after {
  width: 100%;
}

/* Style spécial pour le lien actif */
.text-primary::after {
  content: '';
  position: absolute;
  width: 50% !important;
  height: 2px;
  bottom: -5px;
  left: 50%;
  background-color: #B8860B;
  transform: translateX(-50%);
}
</style>