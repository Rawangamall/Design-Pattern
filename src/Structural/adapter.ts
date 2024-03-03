interface payment{
    paymentGateway(amount:number):boolean;
    refundPayment(transactionId: string): boolean;
}

class paymentClass implements payment{
    paymentGateway(amount: number): boolean {
       console.log("paymentGatewat in old implementation");
       return true;
    }
    refundPayment(transactionId: string): boolean {
        console.log("refundPayment in old implementation");
        return true;
    }
}

interface NewPayemnt {
    pay(amount:number):boolean;
    refund(transactionId: string): boolean;
}

class adapter implements NewPayemnt{
    private paymentIns:paymentClass
    constructor(paymentIns:paymentClass){
        this.paymentIns = paymentIns;
    };

    pay(amount: number): boolean {
        this.paymentIns.paymentGateway(amount)
       console.log("payment in new implementation");
       return true;    
    }
    refund(transactionId: string): boolean {
        this.paymentIns.refundPayment(transactionId);
        console.log("refund in new implementation");
        return true;    
    }   
}

const paymentOne = new paymentClass();
const newPayment = new adapter(paymentOne);
newPayment.pay(500)
newPayment.refund("65hfd89")

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
