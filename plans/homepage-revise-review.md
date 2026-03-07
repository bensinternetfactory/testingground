Implementation complete. Here's a summary of what was done:

  Created                                                                                                                      
   
  - components/ui/ripple-cta-link/RippleCtaLink.tsx — shared client component with:                                            
    - Ripple effect (capped to 1 active ripple)                                                                              
    - web-haptics integration (lower intensity under reduced motion)                                                           
    - Double-tap guard (250ms)                                                                                                 
    - Swipe guard (10px threshold for scroll containers)                                                                       
    - Size variants (sm, md, lg)                                                                                               
    - Desktop icon nudge on hover/focus                                                                                        
    - Internal links via next/link, external via native <a>                                                                    
    - Fire-and-forget analytics contract                                                                                       
    - Keyboard activation with center-origin ripple (no haptic)                                                                
  - components/ui/ripple-cta-link/index.ts — barrel export                                                                     
  - components/ui/ripple-cta-link/CLAUDE.md — component docs                                                                   
                                                                                                                               
  Modified                                                                                                                     
                                                                                                                               
  - HowItWorks.tsx — replaced RippleButton import with RippleCtaLink                                                           
  - EquipmentCards.tsx — replaced inline Link CTAs with full-width RippleCtaLink pills (size="sm")
  - ProgramCards.tsx — same conversion as EquipmentCards                                                                       
  - how-it-works/index.ts — removed RippleButton export                                                                        
                                                                                                                               
  Deleted                                                                                                                      
                                                                                                                               
  - how-it-works/RippleButton.tsx — replaced by shared component                                                               
   
  Updated CLAUDE.md                                                                                                            
                                                                                                                             
  - how-it-works/CLAUDE.md, equipment-cards/CLAUDE.md, program-cards/CLAUDE.md (new)                                           
   
  Lint and build both pass cleanly.  