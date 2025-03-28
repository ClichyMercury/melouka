declare module 'svelte-carousel' {
    import { SvelteComponentTyped } from 'svelte';
    
    export class SvelteCarousel extends SvelteComponentTyped<{
      autoplay?: boolean;
      autoplayDuration?: number;
      autoplayDirection?: 'next' | 'prev';
      pauseOnFocus?: boolean;
      arrows?: boolean;
      infinite?: boolean;
      initialPageIndex?: number;
    }> {}
    
    export class SvelteCarouselItem extends SvelteComponentTyped<{}> {}
  }