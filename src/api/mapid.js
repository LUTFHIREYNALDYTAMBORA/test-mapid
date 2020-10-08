import axios from 'axios';

export default axios.create({
    baseURL : 'http://api.mapid.io/blog/get_list_docs_public/blog',
    
});