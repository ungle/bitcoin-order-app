import { Component, OnInit, Directive } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BitcoinService } from '../services/bitcoin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../models/order';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  order: Order = new Order('', '', '', '', '', '', 0, 0, '', '', 0);
  orderTypeDefault = 'Buy';
  validAge = true;
  genderField: string;
  genderList: string[] = ['Male', 'Female'];
  orderId: string;
  gender: string;
  myAmt = '0.00';
  buy = true;
  myPrice = 0;
  tomorrow = new Date();

  constructor(private bitcoinSvc: BitcoinService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.params.orderId;
  }

  processForm(f: NgForm) {
    f.value.amt = this.myAmt;
    f.value.price = this.myPrice;
    this.bitcoinSvc.updateOrderDetails(this.orderId, f.value).then(result => {
      this.router.navigate(['/confirm', result.id]);
    });

  }

  checkAgeValid(dob) {
    const myDob = new Date(dob);
    const ageDifMs = Date.now() - myDob.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    const myAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    if (myAge < 21) {
      this.validAge = false;
    } else {
      this.validAge = true;
    }
    console.log(this.validAge);
  }

  checkBuyOrSell(f: string) {
    if (f === 'Buy') {
      this.buy = true;
    } else if (f === 'Sell') {
      this.buy = false;
    }
  }

  recalcMyAmt(roomType, unit: number) {
    this.bitcoinSvc.getPrice(roomType).then( result => {this.myPrice = result});
  }


}
