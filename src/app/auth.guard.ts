import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('Le guard a bien été appelé !')
  return true;
};
