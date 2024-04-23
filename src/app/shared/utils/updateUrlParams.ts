import { NavigationExtras, Router } from '@angular/router';

export function updateUrlParams(router: Router, params: { [key: string]: string }) {
  const currentUrlTree = router.parseUrl(router.url);
  const currentParams = { ...currentUrlTree.queryParams };
  Object.assign(currentParams, params);

  const navigationExtras: NavigationExtras = {
    queryParams: currentParams,
    queryParamsHandling: 'merge',
  };

  router.navigate([], navigationExtras);
}
