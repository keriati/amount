import Amount from '../src/Amount'


test('Class exists', () => {
  expect(typeof Amount !== undefined).toBe(true)
  //should have a value thats int
  //sohuld have a precision - int 0-8 -> changeable
  //should have a currency - EUR, CZK
  //add and substract method Amount as param
  //constructor - 1 param {value: 900, precision: 2, currency: 'EUR'}
  //toString methos - print out 9.00 EUR

})

test('Construct - OK', () => {
  const amount = new Amount({
      value: 900,
      precision: 2,
      currency: 'EUR'
    })
    expect(amount instanceof Amount).toBe(true)

    expect(amount.value).toBe(900)
    expect(amount.precision).toBe(2)
    expect(amount.currency).toBe('EUR')
})

test('Change precision bad arg', () => {
  const amount = new Amount({
      value: 900,
      precision: 2,
      currency: 'EUR'
  })
  expect(() => {
    amount.changePrecisionTo(':)')
  }).toThrow()

})

test('Change precision up', () => {
  const amount = new Amount({
      value: 900,
      precision: 2,
      currency: 'EUR'
  })
  amount.changePrecisionTo(4)
  expect(amount.value).toBe(90000)
  expect(amount.precision).toBe(4)
})

test('Change precision down', () => {
  const amount = new Amount({
      value: 900,
      precision: 2,
      currency: 'EUR'
  })
  amount.changePrecisionTo(1)
  expect(amount.value).toBe(90)
  expect(amount.precision).toBe(1)
})

test('Change precision round', () => {
  const amount = new Amount({
      value: 455699,
      precision: 4,
      currency: 'EUR'
  })
  amount.changePrecisionTo(2)
  expect(amount.value).toBe(4556)
  expect(amount.precision).toBe(2)
})

test('Add - wrong param', () => {
  const amount = new Amount({
      value: 455699,
      precision: 4,
      currency: 'EUR'
  })
  expect(() => {
    amount.add(2)
  }).toThrow()
})

test('Add', () => {
  const amount = new Amount({
      value: 200,
      precision: 2,
      currency: 'EUR'
  })
  const amount2 = new Amount({
      value: 205,
      precision: 2,
      currency: 'EUR'
  })
  amount.add(amount2)
  expect(amount.value).toBe(405)
  expect(amount.precision).toBe(2)
})

test('Add - diff precisions', () => {
  const amount = new Amount({
      value: 200,
      precision: 2,
      currency: 'EUR'
  })
  const amount2 = new Amount({
      value: 20500,
      precision: 4,
      currency: 'EUR'
  })
  amount.add(amount2)
  expect(amount.value).toBe(405)
  expect(amount.precision).toBe(2)
  expect(amount2.value).toBe(20500)
  expect(amount2.precision).toBe(4)
})

test('Add - 2 negatives', () => {
  const amount = new Amount({
      value: -200,
      precision: 2,
      currency: 'EUR'
  })
  const amount2 = new Amount({
      value: -20500,
      precision: 4,
      currency: 'EUR'
  })
  amount.add(amount2)
  expect(amount.value).toBe(-405)
  expect(amount.precision).toBe(2)
})

test('Add - wrong param', () => {
  const amount = new Amount({
      value: 455699,
      precision: 4,
      currency: 'EUR'
  })
  expect(() => {
    amount.add(2)
  }).toThrow()
})

test('Subs', () => {
  const amount = new Amount({
      value: 200,
      precision: 2,
      currency: 'EUR'
  })
  const amount2 = new Amount({
      value: 205,
      precision: 2,
      currency: 'EUR'
  })
  amount.substract(amount2)
  expect(amount.value).toBe(-5)
  expect(amount.precision).toBe(2)
})

test('Subs - diff precisions', () => {
  const amount = new Amount({
      value: 200,
      precision: 2,
      currency: 'EUR'
  })
  const amount2 = new Amount({
      value: 20500,
      precision: 4,
      currency: 'EUR'
  })
  amount.substract(amount2)
  expect(amount.value).toBe(-5)
  expect(amount.precision).toBe(2)
  expect(amount2.value).toBe(20500)
  expect(amount2.precision).toBe(4)
})

test('Subs 2 negatives', () => {
  const amount = new Amount({
      value: -200,
      precision: 2,
      currency: 'EUR'
  })
  const amount2 = new Amount({
      value: -20500,
      precision: 4,
      currency: 'EUR'
  })
  amount.substract(amount2)
  expect(amount.value).toBe(5)
  expect(amount.precision).toBe(2)
})

test('toString', () => {
  const amount = new Amount({
      value: 200,
      precision: 2,
      currency: 'EUR'
  })
  expect(amount.toString()).toBe('2.00 EUR')
})

test('toString zero precision', () => {
  const amount = new Amount({
      value: 2,
      precision: 0,
      currency: 'EUR'
  })
  expect(amount.toString()).toBe('2 EUR')
})

test('toString precision 4', () => {
  const amount = new Amount({
      value: 20000,
      precision: 4,
      currency: 'EUR'
  })
  expect(amount.toString()).toBe('2.0000 EUR')
})

test('toString precision 4 small number', () => {
  const amount = new Amount({
      value: 2,
      precision: 4,
      currency: 'EUR'
  })
  expect(amount.toString()).toBe('0.0002 EUR')
})

test('toString precision minus', () => {
  const amount = new Amount({
      value: -200,
      precision: 2,
      currency: 'EUR'
  })
  expect(amount.toString()).toBe('-2.00 EUR')
})

test('toString precision 0', () => {
  const amount = new Amount({
      value: 0,
      precision: 4,
      currency: 'EUR'
  })
  expect(amount.toString()).toBe('0.0000 EUR')
})

test('Construct - no params', () => {
  expect(() => {
    new Amount()
  }).toThrow()
})

test('Construct - no value', () => {
  expect(() => {
    new Amount({
      precision: 0,
      currency: 'EUR'
    })
  }).toThrow()
})

test('Construct - value not a number', () => {
  expect(() => {
    new Amount({
      value: 'not a number',
      precision: 0,
      currency: 'EUR'
    })
  }).toThrow()
})

test('Construct - no precision', () => {
  expect(() => {
    new Amount({
      value: 900,
      currency: 'EUR'
    })
  }).toThrow()
})

test('Construct - precision not a number', () => {
  expect(() => {
    new Amount({
      value: 900,
      precision: 'not a number',
      currency: 'EUR'
    })
  }).toThrow()
})

test('Construct - precision over 8', () => {
  expect(() => {
    new Amount({
      value: 900,
      precision: 9,
      currency: 'EUR'
    })
  }).toThrow()
})

test('Construct - precision unde 0', () => {
  expect(() => {
    new Amount({
      value: 900,
      precision: -1,
      currency: 'EUR'
    })
  }).toThrow()
})
