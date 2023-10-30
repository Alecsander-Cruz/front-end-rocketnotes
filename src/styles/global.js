import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        border: 0;
    }

    body{
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
        color: ${({ theme }) => theme.COLORS.WHITE};

        -webkit-font-smoothing: antialiased;
    }

    body, input, button, textarea{
        font-family: 'Roboto Slab', serif;
        font-size: 16px;
        outline: none;

    }

    a{
        text-decoration: none;
    }

    li{
        list-style: none;
    }

    a, button{
        cursor: pointer;
        transition: filter 0.2s
    }

    a:hover, button:hover{
        filter: brightness(0.6)
    }


    /* --- SCROLLBAR STYLE --- */
    *::-webkit-scrollbar {
        width: 10px;
    }
    
    *::-webkit-scrollbar-track {
        border-radius: 20px;
        background: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    }
    
    *::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.COLORS.ORANGE};
        border-radius: 20px;
    }
    
    *::-webkit-scrollbar-thumb:hover {
        cursor: grab;
    }

    /* --- SCROLLBAR STYLE --- */


`;
