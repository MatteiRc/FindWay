import React from 'react'
import FavoritoItem from './FavoritoItem.js'
export default function FavoritoLista({ value }) {
    const { favorito } = value;
    //console.log(favorito, value);
    return (
        <div className="container-fluid">
            {favorito.map(item=>{
                return <FavoritoItem key={item.id} item={item} value={value} />;
            })}
        </div>          
    );
}
