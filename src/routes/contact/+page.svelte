<script>
    // src/routes/contact/+page.svelte
    import { onMount } from 'svelte';
    
    let nom = '';
    let email = '';
    let telephone = '';
    let sujet = '';
    let message = '';
    let formSubmitted = false;
    let submitError = false;
    
    function handleSubmit() {
      // Comme c'est un site vitrine, nous simulons l'envoi du formulaire
      // En production, vous pourriez connecter ceci à un service comme Formspree ou à une API Supabase
      if (nom && email && message) {
        formSubmitted = true;
        submitError = false;
        
        // Réinitialiser le formulaire
        nom = '';
        email = '';
        telephone = '';
        sujet = '';
        message = '';
        
        // Dans un cas réel, vous enverriez les données à un backend ici
      } else {
        submitError = true;
      }
    }
    
    function generateWhatsAppLink() {
      const baseUrl = 'https://wa.me/2250546445542'; // Remplacez par votre numéro
      const defaultMessage = encodeURIComponent('Bonjour MELOUKA, je souhaiterais en savoir plus sur vos services de tricot artisanal.');
      return `${baseUrl}?text=${defaultMessage}`;
    }
  </script>
  
  <svelte:head>
    <title>Contact | MELOUKA - Artisanat de tricot ivoirien</title>
    <meta name="description" content="Contactez MELOUKA pour toute question sur nos créations de tricot artisanal ivoirien ou pour passer une commande personnalisée.">
  </svelte:head>
  
  <!-- Hero section pour la page contact -->
  <div class="contact-hero">
    <div class="pattern-overlay"></div>
    <div class="container mx-auto px-4 text-center">
      <h1 class="page-title">Contactez-nous</h1>
      <p class="page-subtitle">Nous sommes impatients de vous entendre</p>
    </div>
  </div>
  
  <div class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="max-w-5xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Informations de contact -->
          <div class="lg:col-span-1">
            <div class="contact-info">
              <h2>Nos coordonnées</h2>
              <div class="divider"></div>
              
              <div class="contact-methods">
                <div class="contact-method">
                  <div class="method-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div class="method-details">
                    <h3>Téléphone</h3>
                    <p><a href="tel:+2250546445542">+225 05 46 44 55 42</a></p>
                  </div>
                </div>
                
                <div class="contact-method">
                  <div class="method-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div class="method-details">
                    <h3>Email</h3>
                    <p><a href="mailto:essmemaho@gmail.com">essmemaho@gmail.com</a></p>
                  </div>
                </div>
                
                <div class="contact-method">
                  <div class="method-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div class="method-details">
                    <h3>Adresse</h3>
                    <p>Cocody Angré, Abidjan<br>Côte d'Ivoire</p>
                  </div>
                </div>
                
                <div class="contact-method">
                  <div class="method-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                      <rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                      <line x1="8" y1="16" x2="16" y2="16"></line>
                      <line x1="8" y1="8" x2="10" y2="8"></line>
                    </svg>
                  </div>
                  <div class="method-details">
                    <h3>WhatsApp</h3>
                    <p>
                      <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer" class="whatsapp-link">
                        Discuter sur WhatsApp
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="social-media">
                <h3>Suivez-nous</h3>
                <div class="social-icons">
                  <!-- svelte-ignore a11y_consider_explicit_label -->
                  <a href="https://www.instagram.com/melouka_design?igsh=YzljYTk1ODg3Zg==" target="_blank" rel="noopener noreferrer" class="social-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <!-- svelte-ignore a11y_consider_explicit_label -->
                  <a href="https://www.facebook.com/profile.php?id=100088902780690" target="_blank" rel="noopener noreferrer" class="social-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <!-- svelte-ignore a11y_consider_explicit_label -->
                  <a href="https://www.tiktok.com/@melouka_m?_t=ZM-8v3jUVW9O3J&_r=1" target="_blank" rel="noopener noreferrer" class="social-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                      <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                      <path d="M15 8v7a4 4 0 0 1-4 4"></path>
                      <path d="M15 8h4"></path>
                    </svg>
                  </a>
                </div>
              </div>
              
              <div class="hours">
                <h3>Heures d'ouverture</h3>
                <ul>
                  <li><span>Lundi - Vendredi:</span> 8h30 - 18h00</li>
                  <li><span>Samedi:</span> 9h00 - 16h00</li>
                  <li><span>Dimanche:</span> Fermé</li>
                </ul>
              </div>
            </div>
          </div>
          
          <!-- Formulaire de contact -->
          <div class="lg:col-span-2">
            <div class="contact-form">
              <h2>Envoyez-nous un message</h2>
              <div class="divider"></div>
              
              {#if formSubmitted}
                <div class="success-message">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <div>
                    <h3>Message envoyé avec succès!</h3>
                    <p>Nous vous répondrons dans les plus brefs délais. Merci de nous avoir contactés!</p>
                  </div>
                </div>
              {:else}
                <form on:submit|preventDefault={handleSubmit}>
                  <div class="form-group">
                    <label for="nom">Nom complet <span class="required">*</span></label>
                    <input 
                      type="text" 
                      id="nom" 
                      bind:value={nom} 
                      placeholder="Votre nom complet"
                      required
                    />
                  </div>
                  
                  <div class="form-row">
                    <div class="form-group">
                      <label for="email">Email <span class="required">*</span></label>
                      <input 
                        type="email" 
                        id="email" 
                        bind:value={email} 
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                    
                    <div class="form-group">
                      <label for="telephone">Téléphone</label>
                      <input 
                        type="tel" 
                        id="telephone" 
                        bind:value={telephone} 
                        placeholder="+225 XX XX XX XX XX"
                      />
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label for="sujet">Sujet</label>
                    <input 
                      type="text" 
                      id="sujet" 
                      bind:value={sujet} 
                      placeholder="Sujet de votre message"
                    />
                  </div>
                  
                  <div class="form-group">
                    <label for="message">Message <span class="required">*</span></label>
                    <textarea 
                      id="message" 
                      bind:value={message} 
                      placeholder="Détaillez votre demande ici..."
                      rows="5"
                      required
                    ></textarea>
                  </div>
                  
                  {#if submitError}
                    <div class="error-message">
                      Veuillez remplir tous les champs obligatoires.
                    </div>
                  {/if}
                  
                  <button type="submit" class="submit-button">
                    Envoyer le message
                  </button>
                </form>
              {/if}
              
              <div class="form-note">
                <p>
                  <span>Note:</span> Pour une réponse plus rapide, nous vous recommandons de nous 
                  contacter directement sur WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <style>
    .contact-hero {
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
    
    h2 {
      font-family: 'Playfair Display', serif;
      font-size: 1.8rem;
      color: #2C2C2C;
      margin-bottom: 0.5rem;
    }
    
    .divider {
      width: 60px;
      height: 3px;
      background-color: #B8860B;
      margin: 1rem 0 1.5rem;
    }
    
    /* Informations de contact */
    .contact-info {
      background-color: #FFF8DC;
      border-radius: 0.5rem;
      padding: 2rem;
      height: 100%;
    }
    
    .contact-methods {
      margin-bottom: 2rem;
    }
    
    .contact-method {
      display: flex;
      align-items: flex-start;
      margin-bottom: 1.5rem;
    }
    
    .method-icon {
      width: 40px;
      height: 40px;
      background-color: #B8860B;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
      flex-shrink: 0;
    }
    
    .method-details h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem;
      color: #2C2C2C;
      margin-bottom: 0.25rem;
    }
    
    .method-details p {
      margin: 0;
      color: #6B7280;
    }
    
    .method-details a {
      color: #6B7280;
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    .method-details a:hover {
      color: #B8860B;
    }
    
    .whatsapp-link {
      display: inline-flex;
      align-items: center;
      color: #25D366 !important;
      font-weight: 500;
    }
    
    .whatsapp-link:hover {
      text-decoration: underline;
    }
    
    .social-media {
      margin-bottom: 2rem;
    }
    
    .social-media h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem;
      color: #2C2C2C;
      margin-bottom: 1rem;
    }
    
    .social-icons {
      display: flex;
      gap: 1rem;
    }
    
    .social-icon {
      width: 40px;
      height: 40px;
      background-color: white;
      color: #B8860B;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      border: 1px solid #E5E7EB;
    }
    
    .social-icon:hover {
      background-color: #B8860B;
      color: white;
      transform: translateY(-3px);
    }
    
    .hours h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem;
      color: #2C2C2C;
      margin-bottom: 1rem;
    }
    
    .hours ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .hours li {
      margin-bottom: 0.5rem;
      color: #6B7280;
    }
    
    .hours span {
      font-weight: 500;
      color: #4B5563;
    }
    
    /* Formulaire de contact */
    .contact-form {
      background-color: white;
      border-radius: 0.5rem;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      height: 100%;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    
    label {
      display: block;
      font-weight: 500;
      margin-bottom: 0.5rem;
      color: #4B5563;
    }
    
    .required {
      color: #EF4444;
    }
    
    input, textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #E5E7EB;
      border-radius: 0.375rem;
      background-color: #F9FAFB;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }
    
    input:focus, textarea:focus {
      outline: none;
      border-color: #B8860B;
      box-shadow: 0 0 0 3px rgba(184, 134, 11, 0.2);
      background-color: white;
    }
    
    .submit-button {
      display: inline-block;
      background-color: #B8860B;
      color: white;
      padding: 0.875rem 1.5rem;
      border-radius: 0.375rem;
      font-weight: 500;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 100%;
    }
    
    .submit-button:hover {
      background-color: #8B6914;
      transform: translateY(-2px);
    }
    
    .error-message {
      color: #EF4444;
      margin-bottom: 1rem;
      padding: 0.5rem;
      background-color: #FEF2F2;
      border-radius: 0.375rem;
    }
    
    .success-message {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1.5rem;
      background-color: #ECFDF5;
      border-radius: 0.5rem;
      color: #047857;
      margin-bottom: 1.5rem;
    }
    
    .success-message svg {
      flex-shrink: 0;
    }
    
    .success-message h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
    
    .success-message p {
      margin: 0;
      color: #065F46;
    }
    
    .form-note {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #E5E7EB;
    }
    
    .form-note p {
      color: #6B7280;
      font-size: 0.875rem;
      margin: 0;
    }
    
    .form-note span {
      font-weight: 500;
      color: #4B5563;
    }
    
    @media (max-width: 768px) {
      .page-title {
        font-size: 2.5rem;
      }
      
      .page-subtitle {
        font-size: 1.1rem;
      }
      
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .contact-info {
        margin-bottom: 2rem;
      }
    }
  </style>