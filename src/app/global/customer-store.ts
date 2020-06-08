import { observable, action, computed } from "mobx-angular";
import { set } from 'mobx';
import { Customer } from './customer.model';

class Store {
    @observable
    private _CustomerList: Customer[] = [];
    @observable
    loaded: boolean = false;

    $observable
    selected: number = null;


    @observable // Boolean flag to decide form opened for add / edit
    
    addOrEditFlag = false;

   


    @action
    SetCustomerList(customer: Customer[]) {
       
        this._CustomerList = customer;
       
    }
    @computed
    get allItems(): Customer[] {
        
        return this._CustomerList.slice();
    }
    @action
    getAuditItemById(id: number): Customer {
        return this._CustomerList.slice().find(e => e.id == id);
    }
}
export const CustomerStore = new Store();