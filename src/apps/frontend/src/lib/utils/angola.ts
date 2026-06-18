export const PROVINCIAS = [
  { id: 'bengo', nome: 'Bengo' },
  { id: 'benguela', nome: 'Benguela' },
  { id: 'bie', nome: 'Bié' },
  { id: 'cabinda', nome: 'Cabinda' },
  { id: 'cunene', nome: 'Cunene' },
  { id: 'huambo', nome: 'Huambo' },
  { id: 'huila', nome: 'Huíla' },
  { id: 'kuando-kubango', nome: 'Kuando Kubango' },
  { id: 'kwanza-norte', nome: 'Kwanza Norte' },
  { id: 'kwanza-sul', nome: 'Kwanza Sul' },
  { id: 'luanda', nome: 'Luanda' },
  { id: 'lunda-norte', nome: 'Lunda Norte' },
  { id: 'lunda-sul', nome: 'Lunda Sul' },
  { id: 'malanje', nome: 'Malanje' },
  { id: 'moxico', nome: 'Moxico' },
  { id: 'namibe', nome: 'Namibe' },
  { id: 'uige', nome: 'Uíge' },
  { id: 'zaire', nome: 'Zaire' },
];

export const MUNICIPIOS: Record<string, string[]> = {
  'bengo': ['Ambriz', 'Bula Atumba', 'Dande', 'Dembos', 'Nambuangongo', 'Pango Aluquém'],
  'benguela': ['Baía Farta', 'Balombo', 'Benguela', 'Bocoio', 'Caimbambo', 'Catumbela', 'Chongoroi', 'Cubal', 'Ganda', 'Lobito'],
  'bie': ['Andulo', 'Camacupa', 'Catabola', 'Chinguar', 'Chitembo', 'Cuemba', 'Cuito', 'Nharea'],
  'cabinda': ['Belize', 'Buco Zau', 'Cabinda', 'Cacongo', 'Lândana'],
  'cunene': ['Cahama', 'Cuanhama', 'Curoca', 'Cuvelai', 'Namacunde', 'Ombadja'],
  'huambo': ['Bailundo', 'Caála', 'Ekunha', 'Huambo', 'Londuimbali', 'Longonjo', 'Mungo', 'Tchicala Tcholoanga', 'Tchindjendje', 'Ukuma'],
  'huila': ['Chibia', 'Chicomba', 'Chipindo', 'Cuvango', 'Gambos', 'Humpata', 'Jamba', 'Kuvango', 'Lubango', 'Matala', 'Quilengues', 'Quipungo'],
  'kuando-kubango': ['Calai', 'Cuangar', 'Cuchi', 'Cuito Cuanavale', 'Dirico', 'Mavinga', 'Menongue', 'Nancova', 'Rivungo'],
  'kwanza-norte': ['Ambaca', 'Banga', 'Bolongongo', 'Cambambe', 'Cazengo', 'Golungo Alto', 'Gonguembo', 'Lucala', 'Quiculungo', 'Samba Caju'],
  'kwanza-sul': ['Amboim', 'Cassongue', 'Cela', 'Conda', 'Ebo', 'Libolo', 'Mussende', 'Porto Amboim', 'Quibala', 'Quilenda', 'Seles', 'Sumbe'],
  'luanda': ['Belas', 'Cacuaco', 'Cazenga', 'Icolo e Bengo', 'Luanda', 'Quilamba Quiaxi', 'Talatona', 'Viana'],
  'lunda-norte': ['Cambulo', 'Capenda Camulemba', 'Caungula', 'Chitato', 'Cuango', 'Cuilo', 'Lóvua', 'Lubalo', 'Lucapa', 'Xá-Muteba'],
  'lunda-sul': ['Cacolo', 'Caculama', 'Dala', 'Mucari', 'Saurimo'],
  'malanje': ['Cacuso', 'Calandula', 'Cambundi Catembo', 'Cangandala', 'Caombo', 'Cuaba Nzogo', 'Cunda dia Baze', 'Luquembo', 'Malanje', 'Marimba', 'Massango', 'Mucari', 'Quela', 'Quirima'],
  'moxico': ['Alto Zambeze', 'Bundas', 'Camanongue', 'Leua', 'Luacano', 'Luchazes', 'Lumeje', 'Moxico'],
  'namibe': ['Bibala', 'Camacuio', 'Namibe', 'Tômbwa', 'Virei'],
  'uige': ['Ambuila', 'Bembe', 'Buengas', 'Cangola', 'Damba', 'Maquela do Zombo', 'Mucaba', 'Negage', 'Puri', 'Quimbele', 'Quitexe', 'Sanza Pombo', 'Songo', 'Uíge'],
  'zaire': ['Cuimba', 'Mbanza Kongo', 'Nóqui', 'Nzeto', 'Soyo', 'Tomboco'],
};

export const getMunicipios = (provinciaId: string): string[] => {
  return MUNICIPIOS[provinciaId] || [];
};

export const getProvinciaById = (id: string) => {
  return PROVINCIAS.find(p => p.id === id);
};

export const getProvinciaByNome = (nome: string) => {
  return PROVINCIAS.find(p => p.nome === nome);
};