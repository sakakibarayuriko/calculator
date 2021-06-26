import React from "react";

interface ResultArgument {
    result?: string;
}

const Result = ({ result }: ResultArgument) => <div>{result}</div>;

export default Result;