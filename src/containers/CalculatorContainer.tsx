import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllActions } from "../actions";
import Button from "../components/Button";
import Formula from "../components/Formula";
import Result from "../components/Result";
import { AllState } from "../store";
import { OPT } from "../types";

export const CalculatorContainer = () => {
    const dispatch = useDispatch();
    const calculator = useSelector((state: AllState) => state.calculator);
    const onNumClick = (number: number) => {
        dispatch(GetAllActions.onNumClick(number));
    };
    const onPointClick = (flg: boolean) => {
        dispatch(GetAllActions.onPointClick(flg));
    }
    const onOperationClick = (opt: OPT) => {
        dispatch(GetAllActions.onOperationClick(opt));
    };
    const onEqualClick = () => {
        dispatch(GetAllActions.onEqualClick());
    };
    const onResetClick = () => {
        dispatch(GetAllActions.onResetClick());
    };
    return (
        <div>
            <div className="top"></div>
            <div className="result">
                <Formula formula={calculator.formula + calculator.inputValue} />
                <Result result={calculator.resultValue} />
            </div>
            <div className="wrapper">
                <div className="number">
                    <div className="clear">
                        <Button character={"C"} onClick={onResetClick} />
                    </div>
                    <div className="numUpper">
                        <Button character={7} onClick={() => onNumClick(7)} />
                        <Button character={8} onClick={() => onNumClick(8)} />
                        <Button character={9} onClick={() => onNumClick(9)} />
                    </div>
                    <div className="numMiddleUpper">
                        <Button character={4} onClick={() => onNumClick(4)} />
                        <Button character={5} onClick={() => onNumClick(5)} />
                        <Button character={6} onClick={() => onNumClick(6)} />
                    </div>
                    <div className="numMiddleLower">
                        <Button character={1} onClick={() => onNumClick(1)} />
                        <Button character={2} onClick={() => onNumClick(2)} />
                        <Button character={3} onClick={() => onNumClick(3)} />
                    </div>
                    <div className="numLower">
                        <div className="zero">
                            <Button character={0} onClick={() => onNumClick(0)} />
                        </div>
                        <Button character={"."} onClick={() => onPointClick(true)} />
                    </div>
                </div>
                <div className="operator">
                    <Button character={"??"} onClick={() => onOperationClick("??")} />
                    <Button character={"??"} onClick={() => onOperationClick("??")} />
                    <Button character={"-"} onClick={() => onOperationClick("-")} />
                    <Button character={"+"} onClick={() => onOperationClick("+")} />
                    <Button character={"="} onClick={onEqualClick} />
                </div>
            </div>
        </div>
    );
};