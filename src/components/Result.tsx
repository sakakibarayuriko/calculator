import React from "react";

interface ResultArgument {
    result?: string;
}

const Result = ({ result }: ResultArgument) => <div className="resultValue">{result}</div>;

export default Result;