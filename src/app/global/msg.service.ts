import { Injectable, ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SnackbarService } from 'ngx-snackbar';

@Injectable({
  providedIn: 'root'
})
export class MsgService {

  constructor(private _toastr: ToastrService,
    private _snackbarService: SnackbarService) { }




    toast(message: string, type: string = 'i', timeout = 3000) {
      this._snackbarService.add({
          msg: message,
          timeout: timeout,
          color: '#fff',
          background: type == 'w' ? '#f37245' : '#0ad4e',
          action: {
              text: '',
          }
      });
  }


  showSuccessMessage(title: string, message: string) {
    this._toastr.success(title, message );
}

showErrorMessage(title: string, message: string) {
    this._toastr.error(title, message);
}

showWarningMessage(title: string, message: string){
    this._toastr.warning(title, message);
}
detectChanges(cdr: ChangeDetectorRef) {
  if (!cdr['destroyed']) cdr.detectChanges();
}

}
