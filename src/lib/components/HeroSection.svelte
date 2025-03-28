<script lang=ts>
  export let title = "L'art du tricot artisanal ivoirien";
  export let description = "Des pièces uniques faites à la main avec passion.";
  export let buttonText = "Découvrir la collection";
  export let buttonUrl = "/produits";
</script>

<section class="hero-section">
  <div class="pattern-overlay"></div>
  
  <div class="hero-content">
    <h1>{title}</h1>
    <p>{description}</p>
    <a href={buttonUrl} class="cta-button">{buttonText}</a>
  </div>
</section>

<style>
  .hero-section {
    position: relative;
    height: 80vh;
    min-height: 500px;
    background: linear-gradient(135deg, #B8860B 0%, #704214 50%, #3E240B 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    text-align: center;
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
  }

  .hero-content {
    position: relative;
    z-index: 2;
    padding: 2rem;
    max-width: 800px;
    animation: fadeIn 1s ease-out;
  }
  
  h1 {
    font-family: 'Playfair Display', serif;
    font-size: 3.5rem;
    margin-bottom: 1rem;
    line-height: 1.2;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }
  
  p {
    font-family: 'Poppins', sans-serif;
    font-size: 1.2rem;
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .cta-button {
    display: inline-block;
    background-color: white;
    color: #B8860B;
    padding: 0.8rem 2rem;
    border-radius: 50px;
    text-decoration: none;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    border: 2px solid white;
  }
  
  .cta-button:hover {
    background-color: transparent;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
</style>