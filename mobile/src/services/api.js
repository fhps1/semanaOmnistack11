import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import axios from 'axios';

const api = axios.create({
    //ip copiado da ferramenta do expo, para testes na máquina
    baseURL:'http://192.168.15.151:3333'
});

export default api;