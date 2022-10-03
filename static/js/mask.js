const numberMask = IMask(numberTag, {
    mask: '0000000000[0]',  // pattern mask
  
    // other options are optional with defaults below
    scale: 0,  // digits after point, 0 for integers
    signed: false,  // disallow negative

    min: 10,
    max: 11
  
  });

