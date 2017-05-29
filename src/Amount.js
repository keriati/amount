export default class Amount  {

  constructor(params){
    if(typeof params !== 'object'){
      throw 'Params are required'
    }

    if(!('value' in params)){
      throw 'Value is requeired'
    }

    if(typeof params.value !== 'number'){
      throw 'Value must be a number'
    }

    if(!('precision' in params)){
      throw 'Precision is requeired'
    }

    this.checkPrecision(params.precision)

    if(!('currency' in params)){
      throw 'Currency is requeired'
    }

    if(typeof params.currency !== 'string'){
      throw 'Currency must be a string'
    }

    this.possibleCurrencies = ['EUR', 'CZK']

    if(!this.isCurrencyOK(params.currency)){
      throw 'Currency muset be one of: ' + this.possibleCurrencies.join(', ')
    }

    this.value = params.value
    this.precision = params.precision
    this.currency = params.currency
  }

  isCurrencyOK(currency){
    return this.possibleCurrencies.indexOf(currency) >= 0
  }

  checkPrecision(precision){
    if(typeof precision !== 'number'){
      throw 'Precision must be a number'
    }

    if(precision < 0 || precision > 8){
      throw 'Precision must be between 0 and 8'
    }
  }

  clone(){
    return new Amount({
      value: this.value,
      precision: this.precision,
      currency: this.currency
    })
  }

  add(amount){
    if(!(amount instanceof Amount)){
      throw 'Only Amount can be added'
    }
    if (this.precision === amount.precision){
      this.value += amount.value
    }else{
      const samePrecisionAmount = amount.clone()
      samePrecisionAmount.changePrecisionTo(this.precision)
      this.value += samePrecisionAmount.value
    }

  }

  substract(amount){
    if(!(amount instanceof Amount)){
      throw 'Only Amount can be substracted'
    }
    const amountToAdd = amount.clone()
    amountToAdd.value *= -1
    this.add(amountToAdd)
  }

  changePrecisionTo(newPrecision){
      this.checkPrecision(newPrecision)
      if(this.precision !== newPrecision){
        this.value = Math.floor(this.value * Math.pow(10, newPrecision - this.precision))
        this.precision = newPrecision
      }
  }

  toString(){
    return (this.value * Math.pow(10, -this.precision)).toFixed(this.precision) + ' ' + this.currency
  }

}
