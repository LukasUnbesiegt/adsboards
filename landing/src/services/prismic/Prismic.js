
import { ASYNC_ACTION_ERROR, ASYNC_ACTION_FINISH, ASYNC_ACTION_START } from '../../actions/types';
const Prismic = require('prismic-javascript');

class PrismicWrapper {


    constructor(type, slice_type) {

        this.type = type;
        this.slice_type = slice_type;
        this.endpoint = `https://theworld.cdn.prismic.io/api/v2`

    }


    getDocuments() {

        return new Promise((resolve, reject) => {

            Prismic.api(this.endpoint).then((api) => {

                api.query(
                    Prismic.Predicates.at('document.type', this.type),
                    {})
                    .then((response) => {
                        resolve(response.results)
                    })
            })

        })

    }




}

export default PrismicWrapper