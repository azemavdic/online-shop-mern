import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Dobrodošli u Farah Store',
    description: 'Prodajemo najbolje proizvode online',
    keywords: 'Najbolji it software'
}

export default Meta
