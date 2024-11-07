import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

let activeRequest = 0;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingSvc = inject(LoadingService);
  loadingSvc.show();
  pushRequest();
  return next(req).pipe(
    finalize(() => {
      popRequest();
      if(!activeRequest){
        loadingSvc.hide();
      }
    })
  );
};

const pushRequest = () => activeRequest++;
const popRequest = () => activeRequest--;