"use strict";
class paymentClass {
    paymentGateway(amount) {
        console.log("paymentGatewat in old implementation");
        return true;
    }
    refundPayment(transactionId) {
        console.log("refundPayment in old implementation");
        return true;
    }
}
class adapter {
    constructor(paymentIns) {
        this.paymentIns = paymentIns;
    }
    ;
    pay(amount) {
        this.paymentIns.paymentGateway(amount);
        console.log("payment in new implementation");
        return true;
    }
    refund(transactionId) {
        this.paymentIns.refundPayment(transactionId);
        console.log("refund in new implementation");
        return true;
    }
}
const paymentOne = new paymentClass();
const newPayment = new adapter(paymentOne);
newPayment.pay(500);
newPayment.refund("65hfd89");
/*   Notes   */
/*
Idea: It act as bridge between incompetiable objects by providing adapter interface to the expected format to work again.
Usage:
code integration : integrate new code with existing code
third parties: adapt third party with specific nterface
format conversion: changing in format.

Drwaback:
1-add complexity to the base code
2-increase coupling between incompetable interface

*/
