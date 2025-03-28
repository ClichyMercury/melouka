<script lang=ts>
    const currentYear = new Date().getFullYear();
    
    const footerLinks = [
      {
        title: 'Boutique',
        links: [
          { label: 'Nouveautés', url: '/nouveautes' },
          { label: 'Femmes', url: '/categories/femmes' },
          { label: 'Hommes', url: '/categories/hommes' },
          { label: 'Enfants', url: '/categories/enfants' },
          { label: 'Accessoires', url: '/categories/accessoires' }
        ]
      },
      {
        title: 'Informations',
        links: [
          { label: 'À propos', url: '/a-propos' },
          { label: 'Livraison', url: '/livraison' },
          { label: 'Paiement', url: '/paiement' },
          { label: 'Contact', url: '/contact' }
        ]
      },
      {
        title: 'Suivez-nous',
        social: true,
        links: [
          { label: 'Instagram', url: 'https://www.instagram.com/melouka_design?igsh=YzljYTk1ODg3Zg==' },
          { label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100088902780690' },
          { label: 'TikTok', url: 'https://www.tiktok.com/@melouka_m?_t=ZM-8v3jUVW9O3J&_r=1' },
          { label: 'WhatsApp', url: 'https://wa.me/2250546445542' }
        ]
      }
    ];
  </script>
  
  <footer class="bg-white pt-16 pb-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 class="font-playfair text-xl font-semibold mb-6">MELOUKA</h3>
          <p class="text-sm text-gray-600 mb-6">
            L'artisanat ivoirien de tricot à votre portée. Des pièces uniques et élégantes faites à la main avec amour et passion.
          </p>
        </div>
        
        {#each footerLinks as section}
          <div>
            <h3 class="font-playfair text-lg font-semibold mb-6">{section.title}</h3>
            <ul class="space-y-3">
              {#each section.links as link}
                <li>
                  <a 
                    href={link.url} 
                    class="text-sm text-gray-600 hover:text-primary transition-colors duration-200"
                    target={section.social ? "_blank" : ""}
                    rel={section.social ? "noopener noreferrer" : ""}
                  >
                    {link.label}
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
      
      <div class="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-sm text-gray-500 mb-4 md:mb-0">
          &copy; {currentYear} MELOUKA. Tous droits réservés.
        </p>
        <div class="flex space-x-4">
          <a href="/mentions-legales" class="text-sm text-gray-500 hover:text-primary">Mentions légales</a>
          <a href="/conditions-generales" class="text-sm text-gray-500 hover:text-primary">CGV</a>
          <a href="/confidentialite" class="text-sm text-gray-500 hover:text-primary">Confidentialité</a>
        </div>
      </div>
    </div>
  </footer>