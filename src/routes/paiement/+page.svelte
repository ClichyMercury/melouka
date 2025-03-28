<script>
    // src/routes/paiement/+page.svelte
  </script>
  
  <svelte:head>
    <title>Modalités de Paiement | MELOUKA - Artisanat de tricot ivoirien</title>
    <meta name="description" content="Découvrez nos modalités de paiement pour vos commandes de tricot artisanal MELOUKA. Paiement en deux versements pour faciliter vos achats.">
  </svelte:head>
  
  <!-- Hero section pour le paiement -->
  <div class="paiement-hero">
    <div class="pattern-overlay"></div>
    <div class="container mx-auto px-4 text-center">
      <h1 class="page-title">Modalités de Paiement</h1>
      <p class="page-subtitle">Simple, sécurisé et adapté à vos besoins</p>
    </div>
  </div>
  
  <div class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto">
        <div class="prose prose-lg">
          <div class="section-container">
            <h2>Notre système de paiement en deux versements</h2>
            <div class="divider"></div>
            <p>
              Chez MELOUKA, nous comprenons l'importance de la flexibilité et de la confiance dans le processus d'achat.
              C'est pourquoi nous avons mis en place un système de paiement en deux versements qui vous permet de sécuriser
              votre commande tout en conservant une tranquillité d'esprit.
            </p>
            
            <div class="payment-cards">
              <div class="payment-card">
                <div class="card-header">
                  <span class="card-icon">1</span>
                  <h3>Premier versement</h3>
                </div>
                <div class="card-content">
                  <p>
                    <strong>50% du montant total</strong> est à régler avant le début de la confection.
                    Ce premier versement nous permet de :
                  </p>
                  <ul>
                    <li>Valider votre commande</li>
                    <li>Acheter les matériaux nécessaires</li>
                    <li>Réserver votre place dans notre planning de production</li>
                  </ul>
                  <p>Ce versement initial confirme votre engagement et lance le processus de création.</p>
                </div>
              </div>
              
              <div class="connector">
                <div class="connector-line"></div>
              </div>
              
              <div class="payment-card">
                <div class="card-header">
                  <span class="card-icon">2</span>
                  <h3>Second versement</h3>
                </div>
                <div class="card-content">
                  <p>
                    <strong>50% restants</strong> à régler une fois la confection terminée, avant l'expédition ou la livraison.
                    Ce second versement :
                  </p>
                  <ul>
                    <li>Valide votre satisfaction quant au produit final</li>
                    <li>Confirme l'expédition ou la livraison</li>
                    <li>Finalise votre transaction en toute sécurité</li>
                  </ul>
                  <p>Nous vous enverrons des photos du produit fini avant de demander ce dernier versement.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="section-container">
            <h2>Moyens de paiement acceptés</h2>
            <div class="divider"></div>
            
            <div class="payment-methods">
              <div class="method">
                <div class="method-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                    <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                    <line x1="2" y1="10" x2="22" y2="10"></line>
                  </svg>
                </div>
                <h3>Mobile Money</h3>
                <p>Orange Money, MTN Money, Moov Money</p>
              </div>
              
              <div class="method">
                <div class="method-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                    <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                    <path d="M3 10h18"></path>
                  </svg>
                </div>
                <h3>Virement bancaire</h3>
                <p>Coordonnées bancaires communiquées lors de la commande</p>
              </div>
              
              <div class="method">
                <div class="method-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                    <path d="M17 9V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                    <rect x="9" y="9" width="12" height="10" rx="2"></rect>
                  </svg>
                </div>
                <h3>Espèces</h3>
                <p>Disponible uniquement pour les livraisons en personne à Abidjan</p>
              </div>
              
              <div class="method">
                <div class="method-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                    <path d="M12 14c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"></path>
                    <path d="M12 14v4"></path>
                    <path d="M12 6v4"></path>
                  </svg>
                </div>
                <h3>Western Union / MoneyGram</h3>
                <p>Pour les commandes internationales</p>
              </div>
            </div>
          </div>
          
          <div class="section-container">
            <h2>Questions fréquentes sur le paiement</h2>
            <div class="divider"></div>
            
            <div class="faq-container">
              <div class="faq-item">
                <h3>Que se passe-t-il si je ne suis pas satisfait(e) du produit final ?</h3>
                <p>
                  Votre satisfaction est notre priorité. Avant de vous demander le second versement, nous vous envoyons des photos
                  du produit fini. Si celui-ci ne correspond pas à vos attentes, nous discuterons ensemble des ajustements possibles.
                  Nous ne procéderons à l'envoi qu'après votre validation.
                </p>
              </div>
              
              <div class="faq-item">
                <h3>Est-il possible de payer en une seule fois ?</h3>
                <p>
                  Oui, si vous préférez régler l'intégralité de votre commande en une seule fois, c'est tout à fait possible.
                  Faites-nous simplement part de votre préférence lors de votre commande sur WhatsApp.
                </p>
              </div>
              
              <div class="faq-item">
                <h3>Comment puis-je obtenir une facture pour mon achat ?</h3>
                <p>
                  Une facture détaillée vous sera envoyée par WhatsApp ou par email après votre paiement final.
                  N'hésitez pas à nous préciser si vous avez besoin d'informations spécifiques sur celle-ci.
                </p>
              </div>
              
              <div class="faq-item">
                <h3>Proposez-vous un système de paiement échelonné pour les grosses commandes ?</h3>
                <p>
                  Pour les commandes importantes (au-delà de 100 000 FCFA), nous pouvons envisager un échéancier de paiement
                  personnalisé. Contactez-nous directement pour discuter des options.
                </p>
              </div>
            </div>
          </div>
          
          <div class="secure-payment">
            <div class="secure-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3>Paiements sécurisés</h3>
            <p>
              Tous vos paiements sont traités de manière sécurisée. Nous ne stockons aucune information 
              bancaire et utilisons exclusivement des moyens de paiement fiables et reconnus.
            </p>
          </div>
          
          <div class="cta-container">
            <a href="https://wa.me/2250546445542" class="cta-button" target="_blank" rel="noopener noreferrer">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M11.5 2C6.18 2 1.91 6.271 1.91 11.594c0 1.87.55 3.606 1.433 5.068l-1.433 4.232 4.477-1.414c1.354.674 2.834 1.107 4.412 1.107 5.322 0 9.591-4.28 9.591-9.588C20.4 6.276 16.83 2 11.5 2zm0 17.276c-1.714 0-3.3-.441-4.725-1.3l-.349-.214-3.44 1.067 1.074-3.303-.232-.367A7.63 7.63 0 0 1 3.22 11.594c0-4.107 3.374-7.484 7.48-7.484 2.006 0 3.856.775 5.276 2.195A7.38 7.38 0 0 1 18.88 11.59c.006 4.112-3.163 7.486-7.38 7.486z" fill-rule="nonzero"/>
              </svg>
              Passer commande sur WhatsApp
            </a>
            <a href="/produits" class="cta-button-alt">
              Voir nos produits
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <style>
    .paiement-hero {
      padding-top: 6rem; /* Espace pour la navbar */
      background: linear-gradient(135deg, #B8860B 0%, #704214 60%, #3E240B 100%);
      color: white;
      text-align: center;
      padding-bottom: 5rem;
      position: relative;
      overflow: hidden;
    }
    
    .pattern-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px),
        radial-gradient(circle, rgba(255,255,255,0.05) 2px, transparent 2px);
      background-size: 20px 20px;
      background-position: 0 0, 10px 10px;
      opacity: 0.5;
      pointer-events: none;
    }
    
    .page-title {
      font-family: 'Playfair Display', serif;
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 1rem;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
    
    .page-subtitle {
      font-family: 'Poppins', sans-serif;
      font-size: 1.25rem;
      max-width: 800px;
      margin: 0 auto;
      opacity: 0.9;
    }
    
    .section-container {
      margin-bottom: 3rem;
    }
    
    .divider {
      width: 60px;
      height: 3px;
      background-color: #B8860B;
      margin: 1rem 0 1.5rem;
    }
    
    h2 {
      font-family: 'Playfair Display', serif;
      font-size: 2rem;
      color: #2C2C2C;
      margin-bottom: 0.5rem;
    }
    
    .payment-cards {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      margin: 2.5rem 0;
    }
    
    .payment-card {
      background-color: #FFF8DC;
      border-radius: 0.5rem;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
    
    .card-header {
      background-color: #B8860B;
      color: white;
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .card-icon {
      width: 40px;
      height: 40px;
      background-color: white;
      color: #B8860B;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.25rem;
    }
    
    .card-header h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      margin: 0;
    }
    
    .card-content {
      padding: 1.5rem;
    }
    
    .card-content p {
      margin-top: 0;
    }
    
    .connector {
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .connector-line {
      height: 100%;
      width: 2px;
      background-color: #B8860B;
      position: relative;
    }
    
    .connector-line::before, .connector-line::after {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: #B8860B;
      border-radius: 50%;
      left: 50%;
      transform: translateX(-50%);
    }
    
    .connector-line::before {
      top: 0;
    }
    
    .connector-line::after {
      bottom: 0;
    }
    
    .payment-methods {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;
    }
    
    .method {
      background-color: white;
      border: 1px solid #E5E7EB;
      border-radius: 0.5rem;
      padding: 1.5rem;
      text-align: center;
      transition: all 0.3s ease;
    }
    
    .method:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
      border-color: #B8860B;
    }
    
    .method-icon {
      width: 50px;
      height: 50px;
      background-color: #FFF8DC;
      color: #B8860B;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
    }
    
    .method h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem;
      color: #2C2C2C;
      margin-bottom: 0.5rem;
    }
    
    .method p {
      font-size: 0.9rem;
      color: #6B7280;
      margin: 0;
    }
    
    .faq-container {
      margin: 2rem 0;
    }
    
    .faq-item {
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #E5E7EB;
    }
    
    .faq-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    
    .faq-item h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.3rem;
      color: #2C2C2C;
      margin-bottom: 0.75rem;
    }
    
    .secure-payment {
      background-color: #FFF8DC;
      border-radius: 0.5rem;
      padding: 2rem;
      text-align: center;
      margin: 3rem 0;
    }
    
    .secure-icon {
      width: 60px;
      height: 60px;
      background-color: #B8860B;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
    }
    
    .secure-payment h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      color: #2C2C2C;
      margin-bottom: 0.75rem;
    }
    
    .cta-container {
      margin-top: 3rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
    }
    
    .cta-button, .cta-button-alt {
      display: inline-flex;
      align-items: center;
      padding: 0.875rem 1.75rem;
      border-radius: 0.25rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      transition: all 0.3s ease;
      text-decoration: none;
    }
    
    .cta-button {
      background-color: #25D366; /* Couleur WhatsApp */
      color: white;
    }
    
    .cta-button:hover {
      background-color: #20BD5C;
      transform: translateY(-2px);
    }
    
    .cta-button-alt {
      background-color: white;
      color: #B8860B;
      border: 2px solid #B8860B;
    }
    
    .cta-button-alt:hover {
      background-color: #FFF8DC;
      transform: translateY(-2px);
    }
    
    @media (max-width: 768px) {
      .page-title {
        font-size: 2.5rem;
      }
      
      .page-subtitle {
        font-size: 1.1rem;
      }
      
      .payment-methods {
        grid-template-columns: 1fr;
      }
      
      .cta-container {
        flex-direction: column;
      }
      
      .cta-button, .cta-button-alt {
        width: 100%;
        justify-content: center;
      }
    }
  </style>