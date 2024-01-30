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
    "Chinês",
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
        origin: '',
        translation: []
    },
    deadlines: {},
    cart: undefined,
    languages,
    showValues: false,
    languageCombinations: createLanguageCombination(languages),
    multiplers: {economy: 0.37, expert: 1, premium: 1.37},
    defaultValue: 0.11,
    archiveTypes: [],
    archiveTypeSelected: {},
    languagesData: [
        { language: 'Português', types: ['Br', 'Pt'] },
        { language: 'Inglês', types: ['EUA', 'UK'] },
        { language: 'Chinês', types: ['Simp', 'Tai', 'Hon'] },
        { language: 'Espanhol', types: ['Es', 'L.A.'] },
        { language: 'Alemão', types: ['Al', 'Au'] },
        { language: 'Francês', types: [] },
        { language: 'Italiano', types: [] },
        { language: 'Holandês', types: [] },
        { language: 'Russo', types: [] },
        { language: 'Japonês', types: [] },
        { language: 'Árabe', types: [] },
        { language: 'Hindi', types: [] },
        { language: 'Coreano', types: [] },
        { language: 'Turco', types: [] },
        { language: 'Sueco', types: [] },
        { language: 'Polonês', types: [] },
        { language: 'Vietnamita', types: [] },
        { language: 'Tailandês', types: [] },
        { language: 'Grego', types: [] },
        { language: 'Dinamarquês', types: [] }
      ]
};
