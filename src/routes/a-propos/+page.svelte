<script>
  // src/routes/a-propos/+page.svelte
  import { onMount } from 'svelte';
  
  let visible = false;
  
  onMount(() => {
    // Animation d'entrée des sections
    setTimeout(() => {
      visible = true;
    }, 100);
  });
</script>
  
<svelte:head>
  <title>À propos de MELOUKA | Artisanat de tricot ivoirien</title>
  <meta name="description" content="Découvrez l'histoire de MELOUKA, marque d'artisanat de tricot ivoirien fondée sur la passion et le savoir-faire.">
</svelte:head>

<!-- Hero section -->
<div class="about-hero">
  <div class="pattern-overlay"></div>
  <div class="container mx-auto px-4 text-center">
    <h1 class="about-title">À propos de MELOUKA</h1>
    <p class="about-subtitle">L'art du tricot ivoirien, une maille à la fois</p>
  </div>
</div>
  
<div class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <div class="max-w-3xl mx-auto mt-4">
      <div class="prose prose-lg {visible ? 'visible' : ''}">
        <div class="section-container">
          <h2>Notre Histoire</h2>
          <div class="divider"></div>
          <p>
            MELOUKA est né d'une passion profonde pour l'art du tricot, transmis de génération en génération en Côte d'Ivoire. 
            Notre fondatrice, <span class="highlight">Essime Maho</span>, a appris cet art délicat auprès de sa grand-mère dès son plus jeune âge.
          </p>
          
          <p>
            Ce qui a commencé comme un simple passe-temps est devenu une véritable passion, puis une entreprise dédiée 
            à la création de vêtements et d'accessoires uniques qui célèbrent à la fois la tradition du tricot et les 
            tendances contemporaines.
          </p>
        </div>
          
        <div class="section-container">
          <h2>Notre Philosophie</h2>
          <div class="divider"></div>
          <p>
            Chez MELOUKA, nous croyons que chaque pièce raconte une histoire. Nos créations sont bien plus que de 
            simples vêtements - elles sont l'expression d'un savoir-faire artisanal authentique, mêlant l'héritage 
            culturel ivoirien et le design moderne.
          </p>
          
          <p>
            Nous nous engageons à :
          </p>
          <ul class="values-list">
            <li>
              <span class="value-icon">✧</span>
              <span>Créer des pièces uniques faites à la main avec amour et attention</span>
            </li>
            <li>
              <span class="value-icon">✧</span>
              <span>Utiliser des matériaux de qualité pour assurer confort et durabilité</span>
            </li>
            <li>
              <span class="value-icon">✧</span>
              <span>Proposer des créations qui valorisent l'artisanat ivoirien</span>
            </li>
            <li>
              <span class="value-icon">✧</span>
              <span>Offrir un service personnalisé à chacun de nos clients</span>
            </li>
          </ul>
        </div>
          
        <div class="section-container">
          <h2>Notre Processus de Création</h2>
          <div class="divider"></div>
          <div class="process-grid">
            <div class="process-step">
              <div class="step-number">1</div>
              <h3>Inspiration</h3>
              <p>Nous nous inspirons des tendances, de la culture ivoirienne et des besoins de nos clients.</p>
            </div>
            <div class="process-step">
              <div class="step-number">2</div>
              <h3>Design</h3>
              <p>Chaque pièce commence par une esquisse et un choix minutieux des couleurs et textures.</p>
            </div>
            <div class="process-step">
              <div class="step-number">3</div>
              <h3>Création</h3>
              <p>Nos artisans tricotent à la main chaque pièce avec patience et savoir-faire.</p>
            </div>
            <div class="process-step">
              <div class="step-number">4</div>
              <h3>Finition</h3>
              <p>Chaque détail est soigneusement vérifié pour garantir une qualité irréprochable.</p>
            </div>
          </div>
          
          <p>
            Cette approche artisanale signifie que chaque pièce est unique, avec sa propre personnalité et ses 
            petites particularités qui la rendent spéciale.
          </p>
        </div>
          
        <div class="section-container">
          <h2>Notre Avenir</h2>
          <div class="divider"></div>
          <p>
            Nous avons commencé modestement, mais nous avons de grandes ambitions. Notre vision est de faire de 
            MELOUKA une marque reconnue qui célèbre et promeut l'artisanat ivoirien à travers le monde.
          </p>
          
          <p>
            Nous nous efforçons constamment d'innover tout en restant fidèles à nos racines, en créant des pièces 
            qui traversent les saisons et les tendances.
          </p>
        </div>
          
        <div class="quote-container">
          <div class="quote-mark">"</div>
          <p class="quote-text">
            Le tricot est comme la vie - chaque maille compte, et ensemble, elles créent quelque chose de magnifique.
          </p>
          <p class="quote-author">— Essime Maho, Fondatrice</p>
        </div>
        
        <div class="cta-container">
          <a href="/produits" class="cta-button">Découvrir nos créations</a>
          <a href="/contact" class="cta-button-alt">Nous contacter</a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .about-hero {
    padding-top: 6rem;
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
  
  .about-title {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  
  .about-subtitle {
    font-family: 'Poppins', sans-serif;
    font-size: 1.25rem;
    max-width: 800px;
    margin: 0 auto;
    opacity: 0.9;
    color: white;
  }
  
  .section-container {
    margin-bottom: 3rem;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeIn 0.8s ease forwards;
    animation-delay: calc(var(--index, 0) * 0.2s);
  }
  
  .prose {
    counter-reset: section;
  }
  
  .section-container:nth-child(1) { --index: 1; }
  .section-container:nth-child(2) { --index: 2; }
  .section-container:nth-child(3) { --index: 3; }
  .section-container:nth-child(4) { --index: 4; }
  
  .visible .section-container {
    animation-play-state: running;
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
  
  p {
    font-family: 'Poppins', sans-serif;
    line-height: 1.7;
    color: #4B5563;
  }
  
  .highlight {
    color: #B8860B;
    font-weight: 600;
  }
  
  .values-list {
    list-style: none;
    padding: 0;
    margin: 1.5rem 0;
  }
  
  .values-list li {
    display: flex;
    margin-bottom: 1rem;
    align-items: flex-start;
  }
  
  .value-icon {
    color: #B8860B;
    font-size: 1.25rem;
    margin-right: 1rem;
    display: inline-block;
  }
  
  .process-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin: 2.5rem 0;
  }
  
  .process-step {
    position: relative;
    padding: 1.5rem;
    background-color: #FFF8DC;
    border-radius: 0.5rem;
    text-align: center;
  }
  
  .step-number {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
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
  }
  
  .process-step h3 {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
    color: #2C2C2C;
  }
  
  .process-step p {
    font-size: 0.95rem;
    margin: 0;
  }
  
  .quote-container {
    position: relative;
    margin: 4rem 0;
    padding: 2rem;
    background-color: #FFF8DC;
    border-left: 4px solid #B8860B;
    text-align: center;
  }
  
  .quote-mark {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 4rem;
    color: #B8860B;
    font-family: 'Playfair Display', serif;
    line-height: 1;
  }
  
  .quote-text {
    font-style: italic;
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
  
  .quote-author {
    font-weight: 600;
    color: #2C2C2C;
  }
  
  .cta-container {
    margin-top: 3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
  
  .cta-button, .cta-button-alt {
    display: inline-block;
    padding: 0.875rem 1.75rem;
    border-radius: 0.25rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: all 0.3s ease;
    text-decoration: none;
  }
  
  .cta-button {
    background-color: #B8860B;
    color: white;
  }
  
  .cta-button:hover {
    background-color: #8B6914;
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
  
  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    .about-title {
      font-size: 2.5rem;
    }
    
    .process-grid {
      grid-template-columns: 1fr;
    }
    
    .quote-container {
      padding: 1.5rem;
    }
    
    .quote-text {
      font-size: 1.1rem;
    }
  }
</style>