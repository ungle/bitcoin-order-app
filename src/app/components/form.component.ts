import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BitcoinService } from '../services/bitcoin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit, AfterViewInit, OnChanges {
  orderTypeDefault = 'Buy';
  validAge = true;
  genderField: string;
  genderList: string[] = ['Male', 'Female'];
  today = new Date();
  arrive = new Date();
  leave =new Date(new Date().setDate(new Date().getDate()+1));
  myAmt = '0.00';
  buy = true;
  myPrice = 0;
  myUnit =0;
  myNight =0;
  validTime = true;


  constructor(private bitcoinSvc: BitcoinService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngAfterViewInit() {

  }

  ngOnChanges() {

  }

  ngOnInit() {
    document.getElementById("welcome").style.visibility="hidden";
    this.myPrice = 0;
    this.myNight = 0;
  }

  processForm(f: NgForm) {
    this.router.navigate(['confirm'])
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
  }



  checkTime(type:string,time){
    if(type ==='leave'){
      this.leave = new Date(time.value);
    } else {
      this.arrive = new Date(time.value);
    }

    if(this.leave.getTime() < this.arrive.getTime() ){
      this.validTime = false;
      if(type === 'arrive'){
        this.arrive = this.leave;
      } else {
        this.leave = this.arrive;
      }
    } else {
      this.validTime = true;
      this.myNight =Math.ceil((this.leave.getTime() - this.arrive.getTime()) / (3600*24*1000));
    }
  }

  recalcMyAmt(roomType, unit: number) {
    this.bitcoinSvc.getPrice(roomType).then( result => {
      this.myPrice = result;
      if (isNaN(unit) || isNaN(this.myPrice) || isNaN(this.myNight)) {
      this.myAmt = '0.00';
    } else {
      const sum = unit * this.myPrice * this.myNight;
      this.myAmt = sum.toFixed(2);
      this.myUnit = unit;
      console.log(this.myAmt);
    }
    });

    
  }

  resetForm(f: NgForm) {
    console.log(f.value);
    f.controls['contactno'.toString()].reset();
    f.controls['orderType'.toString()].reset();
    f.controls['leaveDate'.toString()].reset();
    f.controls['dob'.toString()].reset();
    f.controls['name'.toString()].reset();
    f.controls['arriveDate'.toString()].reset();
    f.controls['unit'.toString()].reset();
    this.myAmt = '0.00';
    this.myNight = 0;
    this.myUnit =0;
    this.myPrice = 0;
  }

}
