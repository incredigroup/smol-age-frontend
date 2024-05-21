export const SMOL_AGE_PHASE2_GAME_GUIDE_LINK =
  'https://smol-age.gitbook.io/erc721-whitepaper/smol-age-whitepaper/phase-2-primary-skill-development-and-the-distribution-of-tools/phase-2-game-guide';

export const stakedLocationImage = (stakedLocation: string) => {
  switch (stakedLocation) {
    case 'caves':
      return '/static/images/new/islands/caves.png';
    case 'bone_yard':
      return '/static/images/new/islands/boneyard.png';
    case 'development_grounds':
      return '/static/images/new/islands/development-grounds.png';
    case 'labor_grounds':
      return '/static/images/new/islands/labor-grounds.png';
    case 'school':
      return '/static/images/new/islands/school.png';
    case 'pits':
      return '/static/images/new/islands/pits.png';
    default:
      return '/static/images/new/islands/shop.png';
  }
};
