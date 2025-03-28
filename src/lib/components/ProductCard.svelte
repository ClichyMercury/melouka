<script lang=ts>
  export let product = {
    id: '',
    name: '',
    price: 0,
    creation_time: '',
    delivery_time: '',
    product_images: [] as any[],
    slug: ''
  };
  
  let imageUrl = '';
  
  // Gérer les différentes structures possibles pour les images
  if (product.product_images && product.product_images.length > 0) {
    // Chercher d'abord l'image principale
    const mainImage = product.product_images.find(img => img.is_main);
    imageUrl = mainImage ? mainImage.image_url : product.product_images[0].image_url;
  }
  
  // Si toujours pas d'image, utiliser un placeholder avec les couleurs du projet
  if (!imageUrl) {
    // Utiliser les couleurs du projet : fond crème #FFF8DC et texte or #B8860B
    imageUrl = `https://placehold.co/600x800/FFF8DC/B8860B?text=${encodeURIComponent(product.name || 'Produit')}`;
  }

  function formatPrice(price: number) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(Number(price));
  }
</script>
  
<a href={`/produits/${product.slug}`} class="product-card block group">
  <div class="relative overflow-hidden aspect-[3/4] rounded-t-lg">
    <img 
      src={imageUrl} 
      alt={product.name}
      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div class="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
      <span class="text-white bg-primary bg-opacity-90 px-4 py-2 uppercase text-sm font-medium transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        Voir détails
      </span>
    </div>
  </div>
  <div class="p-4 bg-white border-t-4 border-primary rounded-b-lg shadow-sm">
    <h3 class="font-playfair font-medium text-lg text-gray-800">{product.name}</h3>
    <div class="flex justify-between items-center mt-2">
      <span class="font-bold text-primary">{formatPrice(product.price)}</span>
      <span class="text-sm text-gray-500">Délai: {product.creation_time || 'Non précisé'}</span>
    </div>
  </div>
</a>

<style>
  .product-card {
    transition: all 0.3s ease;
  }
  .product-card:hover {
    transform: translateY(-5px);
  }
  :global(.primary) {
    color: #B8860B; /* Or */
  }
  :global(.secondary) {
    color: #FFF8DC; /* Crème */
  }
  :global(.bg-primary) {
    background-color: #B8860B;
  }
  :global(.bg-secondary) {
    background-color: #FFF8DC;
  }
  :global(.border-primary) {
    border-color: #B8860B;
  }
</style>