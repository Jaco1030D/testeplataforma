export const calculateValues = (numWords, infos, valueWords, languages, perCent) => {
    let value = 0

    const arrayValues = []

    const languagesTarget = infos.translation

    const originLanguage = infos.origin

    languagesTarget.forEach(element => {
      console.log(valueWords);

      const valueTranslation = getValueTranslation(originLanguage, element, languages, valueWords)

      console.log(valueTranslation * numWords);

      const valueFinally = numWords * (valueTranslation || 0.11)

      let valueLanguage = valueFinally

      value += valueFinally

      if (perCent.value !== 0) {
        valueLanguage += valueFinally * (perCent.value / 100)
      }

      arrayValues.push(valueLanguage)
    
    });

    let finalValue = value

    if (perCent.value !== 0) {
      finalValue += value * (perCent.value / 100)
    }
    
    return {finalValue: finalValue.toFixed(2), arrayValues}
  }

  const getValueTranslation = (origin, translated, languagesArray, value) => {
    console.log(languagesArray);
    for (const subArray of languagesArray) {
      for (const obj of subArray.language) {
        if (obj.origin === origin && obj.translated === translated) {
          return obj.value || value;
        }
      }
    }
  }