<script>
    // src/lib/components/Logo.svelte
    
    // Chemin vers l'image du logo
    const logoPath = "/images/logo_wbg.png";
    
    // Vous pouvez définir les dimensions du logo
    export let height = "100px"; // Hauteur par défaut 
  </script>
  
  <div class="flex items-center">
    <img 
      src={logoPath} 
      alt="MELOUKA - Artisanat de tricot ivoirien" 
      style="height: {height}; width: auto;"
      class="logo-image"
    />
  </div>
  
  <style>
    .logo-image {
      object-fit: contain;
      /* Ajouter une transition douce au survol */
      transition: transform 0.3s ease;
    }
    
    .logo-image:hover {
      transform: scale(1.05);
    }
  </style>