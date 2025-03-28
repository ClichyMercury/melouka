<script>
    // src/routes/livraison/+page.svelte
  </script>
  
  <svelte:head>
    <title>Livraison | MELOUKA - Artisanat de tricot ivoirien</title>
    <meta name="description" content="Découvrez les modalités de livraison pour vos commandes de tricot artisanal MELOUKA. Livraison disponible en Côte d'Ivoire et à l'international.">
  </svelte:head>
  
  <!-- Hero section pour la livraison -->
  <div class="livraison-hero">
    <div class="pattern-overlay"></div>
    <div class="container mx-auto px-4 text-center">
      <h1 class="page-title">Livraison</h1>
      <p class="page-subtitle">Comment recevoir vos créations MELOUKA</p>
    </div>
  </div>
  
  <div class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto">
        <div class="prose prose-lg">
          <div class="section-container">
            <h2>Notre processus de livraison</h2>
            <div class="divider"></div>
            <p>
              Chez MELOUKA, nous proposons un service de livraison personnalisé pour tous vos achats de tricot artisanal. 
              Notre objectif est de vous offrir une expérience d'achat flexible et adaptée à vos besoins.
            </p>
            
            <div class="process-steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h3>Commande sur WhatsApp</h3>
                  <p>
                    Après avoir choisi vos articles sur notre site, contactez-nous directement sur WhatsApp. 
                    Nous discuterons ensemble des détails de votre commande, des personnalisations éventuelles et confirmerons la disponibilité.
                  </p>
                </div>
              </div>
              
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h3>Délais de confection</h3>
                  <p>
                    Nos créations sont faites à la main avec soin. Selon le produit choisi, le délai de confection peut varier :
                  </p>
                  <ul>
                    <li>Accessoires simples : 1 à 3 jours</li>
                    <li>Vêtements légers : 3 à 7 jours</li>
                    <li>Pièces complexes : 7 à 14 jours</li>
                  </ul>
                  <p>Les délais exacts sont indiqués sur chaque fiche produit.</p>
                </div>
              </div>
              
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h3>Options de livraison</h3>
                  <p>
                    Nous proposons plusieurs options de livraison :
                  </p>
                  <ul>
                    <li><strong>Livraison à Abidjan</strong> : 1 à 2 jours ouvrables après confection</li>
                    <li><strong>Livraison dans les autres villes de Côte d'Ivoire</strong> : 2 à 4 jours ouvrables après confection</li>
                    <li><strong>Livraison internationale</strong> : 5 à 10 jours ouvrables après confection (selon le pays)</li>
                  </ul>
                </div>
              </div>
              
              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h3>Paiement et suivi</h3>
                  <p>
                    Les modalités de paiement et les frais de livraison seront discutés lors de votre commande sur WhatsApp.
                    Une fois votre commande expédiée, nous vous fournirons un numéro de suivi (si disponible) et resterons en contact
                    jusqu'à la réception de votre colis.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="section-container">
            <h2>Tarifs de livraison</h2>
            <div class="divider"></div>
            <p>
              Les frais de livraison varient selon votre localisation :
            </p>
            
            <div class="tarifs-grid">
              <div class="tarif-card">
                <h3>Abidjan</h3>
                <p class="price">1 000 - 2 500 FCFA</p>
                <p class="detail">Selon le quartier</p>
              </div>
              
              <div class="tarif-card">
                <h3>Autres villes de Côte d'Ivoire</h3>
                <p class="price">3 000 - 5 000 FCFA</p>
                <p class="detail">Selon la distance</p>
              </div>
              
              <div class="tarif-card">
                <h3>International</h3>
                <p class="price">Sur devis</p>
                <p class="detail">Contactez-nous pour un tarif personnalisé</p>
              </div>
            </div>
            
            <p class="note">
              <strong>Note</strong> : Pour les commandes d'un montant supérieur à 50 000 FCFA, la livraison est offerte à Abidjan.
            </p>
          </div>
          
          <div class="section-container">
            <h2>Questions fréquentes</h2>
            <div class="divider"></div>
            
            <div class="faq-container">
              <div class="faq-item">
                <h3>Puis-je suivre ma commande ?</h3>
                <p>
                  Oui, nous vous fournirons des mises à jour régulières sur l'état de votre commande via WhatsApp, 
                  de la confection jusqu'à la livraison.
                </p>
              </div>
              
              <div class="faq-item">
                <h3>Que faire en cas de problème avec ma livraison ?</h3>
                <p>
                  Contactez-nous immédiatement sur WhatsApp au numéro figurant sur notre site. Nous ferons tout notre possible 
                  pour résoudre rapidement le problème.
                </p>
              </div>
              
              <div class="faq-item">
                <h3>Puis-je changer l'adresse de livraison après avoir passé ma commande ?</h3>
                <p>
                  Oui, tant que votre commande n'a pas été expédiée. Informez-nous simplement via WhatsApp de votre nouvelle adresse.
                </p>
              </div>
            </div>
          </div>
          
          <div class="cta-container">
            <a href="https://wa.me/2250546445542" class="cta-button" target="_blank" rel="noopener noreferrer">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M11.5 2C6.18 2 1.91 6.271 1.91 11.594c0 1.87.55 3.606 1.433 5.068l-1.433 4.232 4.477-1.414c1.354.674 2.834 1.107 4.412 1.107 5.322 0 9.591-4.28 9.591-9.588C20.4 6.276 16.83 2 11.5 2zm0 17.276c-1.714 0-3.3-.441-4.725-1.3l-.349-.214-3.44 1.067 1.074-3.303-.232-.367A7.63 7.63 0 0 1 3.22 11.594c0-4.107 3.374-7.484 7.48-7.484 2.006 0 3.856.775 5.276 2.195A7.38 7.38 0 0 1 18.88 11.59c.006 4.112-3.163 7.486-7.38 7.486z" fill-rule="nonzero"/>
              </svg>
              Nous contacter sur WhatsApp
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
    .livraison-hero {
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
    
    .process-steps {
      margin: 2rem 0;
    }
    
    .step {
      display: flex;
      margin-bottom: 2rem;
      position: relative;
    }
    
    .step::after {
      content: '';
      position: absolute;
      top: 60px;
      left: 20px;
      width: 2px;
      height: calc(100% - 40px);
      background-color: rgba(184, 134, 11, 0.2);
      z-index: 1;
    }
    
    .step:last-child::after {
      display: none;
    }
    
    .step-number {
      width: 40px;
      height: 40px;
      background-color: #B8860B;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.25rem;
      margin-right: 1.5rem;
      flex-shrink: 0;
      position: relative;
      z-index: 2;
    }
    
    .step-content {
      flex-grow: 1;
    }
    
    .step-content h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      color: #2C2C2C;
      margin-bottom: 0.75rem;
    }
    
    .tarifs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;
    }
    
    .tarif-card {
      background-color: #FFF8DC;
      border-radius: 0.5rem;
      padding: 1.5rem;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
    
    .tarif-card h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.3rem;
      color: #2C2C2C;
      margin-bottom: 1rem;
    }
    
    .price {
      font-size: 1.5rem;
      font-weight: bold;
      color: #B8860B;
      margin-bottom: 0.5rem;
    }
    
    .detail {
      font-size: 0.9rem;
      color: #6B7280;
    }
    
    .note {
      background-color: #FFF8DC;
      padding: 1rem;
      border-left: 4px solid #B8860B;
      margin: 2rem 0;
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
      
      .step {
        flex-direction: column;
      }
      
      .step-number {
        margin-bottom: 1rem;
        margin-right: 0;
      }
      
      .step::after {
        display: none;
      }
      
      .tarifs-grid {
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