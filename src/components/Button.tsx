import React from "react";

interface ButtonArgument {
    character: string | number;
    onClick: () => void;
}

const Button = ({ character, onClick }: ButtonArgument) => <button onClick={onClick}>{character}</button>;

export default Button;