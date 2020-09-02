import styled from 'styled-components';

export const ButtonContainer = styled.button`
text-transform:capitalize;
font-size:1.4rem;
background:transparent;
border:0.05rem solid var(--mainDark);
color: var(--mainDark);
border-radius: 0.5rem;
padding: 0.2rem 0.5rem;
cursor: pointer;
margin: 0.2rem 0.5rem 0.2rem 0;
&:hover i{
    color: var(--mainYellow);
}
&:focus{
    outline: none;
}
`;
export const ButtonServicos = styled.button`
text-transform:capitalize;
font-size:1.4rem;
background:transparent;
border:0.00rem solid var(--mainDark);
color: var(--mainDark);
border-radius: 0.5rem;
padding: 0.2rem 0.5rem;
cursor: pointer;
margin: 0.2rem 0.5rem 0.2rem 0;
&:hover i{
    color: var(--lightBlue);
}
&:focus{
    outline: none;
}
`;
export const ButtonDelete = styled.button`
text-transform:capitalize;
font-size:1.4rem;
background:transparent;
border:0.00rem solid var(--mainDark);
color: var(--mainDark);
border-radius: 0.5rem;
padding: 0.2rem 0.5rem;
cursor: pointer;
margin: 0.2rem 0.5rem 0.2rem 0;
&:hover i{
    color: var(--mainRed);
}
&:focus{
    outline: none;
}
`;
export const ButtonFavorito = styled.button`
font-size:1.4rem;
border:0.00rem;
color: var(--mainDark);
background: transparent;
padding: 0.2rem 0.5rem;
cursor: pointer;
margin: 0.2rem 0.5rem 0.2rem 0;
&:hover i{
    color: var(--mainYellow);
}
&:focus{
    outline: none;
}
`;
export const ButtonFavoritoVoltar = styled.button`
font-size:1.4rem;
border:0.05rem solid var(--mainDark);
color: var(--mainDark);
background: transparent;
padding: 0.2rem 0.5rem;
cursor: pointer;
margin: 0.2rem 0.5rem 0.2rem 0;
&:hover i{
    color: var(--mainYellow);
}
&:focus{
    outline: none;
}
`;
export const ButtonVoltar = styled.button`
text-transform:capitalize;
font-size:1.4rem;
&:hover i{
    color: var(--mainRed);
}
&:focus{
    outline: none;
}
`;