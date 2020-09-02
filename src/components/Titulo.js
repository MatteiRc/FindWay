import React from 'react'

export default function Titulo({nome, titulo}) {
    return (
        <div className="row">
            <div className="col-10 mx-auto my-2 text-center text-title">
                <h2 className="text-capitalize font-weight-bold">
                    {nome} <strong className="text-mainColor">{titulo}
                    </strong>
                </h2>
            </div>            
        </div>
    )
}
