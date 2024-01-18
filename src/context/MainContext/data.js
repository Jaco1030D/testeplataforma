const createLanguageCombination = (languages) => {
    const languageCombinations = [];
  
    for (let i = 0; i < languages.length; i++) {
        const languagePerType = []
        for (let j = 0; j < languages.length; j++) {
            if (i !== j) {
                languagePerType.push({
                origin: languages[i],
                translated: languages[j],
                value: 0,
                });
            }
        }
        languageCombinations.push(languagePerType)
        
    }
  
    return languageCombinations;
}

const languages = [
    "Português",
    "Inglês",
    "Espanhol",
    "Francês",
    "Alemão",
    "Italiano",
    "Holandês",
    "Russo",
    "Japonês",
    "Chinês (Simplificado)",
    "Árabe",
    "Hindi",
    "Coreano",
    "Turco",
    "Sueco",
    "Polonês",
    "Vietnamita",
    "Tailandês",
    "Grego",
    "Dinamarquês"
  ]

export const initialState = {
    user: null,
    filePending: [],
    selectValues: {
        origin: 'Português',
        translation: ['Inglês']
    },
    deadlines: {},
    cart: undefined,
    languages,
    showValues: false,
    languageCombinations: createLanguageCombination(languages),
    multiplers: {economy: 0.37, expert: 1, premium: 1.37},
    defaultValue: 0.11,
    archiveTypes: [{name: 'arqiuvo1', value: 10}, {name: 'Área certificada', value: 5}],
    archiveTypeSelected: {name: 'arquivo1', value: '2'}
};
