import React from "react";

interface FormulaArgument {
    formula?: string;
}

const Formula = ({ formula }: FormulaArgument) => <div className="formula">{formula}</div>;

export default Formula;