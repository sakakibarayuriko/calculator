import { INPUT_NUMBER, OPERATION, EQUAL, RESET, INPUT_POINT } from "../utils/actionTypes"
import { GetAllActions, ClickActions } from "../actions"
import { OPT } from "../types";

/** 計算状態型定義 */
interface CalcState {
    /** 数字 */
    inputValue: string;
    /** 四則演算子 */
    operation?: OPT;
    /** 一時的な値 */
    temporaryValue: string;
    /** 式 */
    formula?: string;
    /** 結果 */
    resultValue: string;
    /** 小数かどうか */
    isDecimal: boolean;
    /** 結果が出たかどうか */
    hasResults: boolean;
}
/** 初期値 */
const initialAppState: CalcState = {
    inputValue: "",
    temporaryValue: "",
    resultValue: "",
    formula: "",
    isDecimal: false,
    hasResults: false,
};
/** 
 * 四則演算
 * @param opt 四則演算子
 * @param firstNumber 演算子入力前に入力した数字
 * @param secondNumber 演算子入力後に入力した数字
 */
const fourOperations = (opt: OPT, firstNumber: string, secondNumber: string) => {
    switch (opt) {
        case "÷":
            return Number(firstNumber) / Number(secondNumber);
        case "×":
            return Number(firstNumber) * Number(secondNumber);
        case "+":
            return Number(firstNumber) + Number(secondNumber);
        case "-":
            return Number(firstNumber) - Number(secondNumber);
        default:
            return 0;
    }
};
/**
 * 3桁カンマ区切りにする
 * @param num 数字
 */
const comma = (num: string) => {
    const s = num.split('.');
    let ret = String(s[0]).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    if (s.length > 1) {
        ret += '.' + s[1];
    }
    return ret;
};
/**
 * 大きい桁数や小数点以下桁数を調整した、カンマ区切りの数字にする
 * @param num 数字
 */
const fixDigits = (num: string) => {
    // 整数9桁まで入力可能にする
    if (Number(num) >= 10e8) {
        return comma(String(Number(num).toExponential(2)));
    }
    // 小数点以下6桁まで入力可能
    if (num.split('.')[1] && num.split('.')[1].length >= 6) {
        return comma(String(Math.round(Number(num) * 1000000) / 1000000));
    }
    return comma(num);
};
/**
 * 3桁カンマ区切りを無くす
 * @param num 数字
 */
const notComma = (num: string) => {
    return num.replace(/,/g, "");
};
/** 
 * 計算結果
 * @param state 現在保持しているstate（初期値はinitialAppState）
 * @param action クリックアクション
 */
const calculator = (state = initialAppState, action: ClickActions) => {
    switch (action.type) {
        case INPUT_NUMBER:
            const numAction = action as ReturnType<typeof GetAllActions.onNumClick>;
            // 結果が出た状態で数字入力した時（結果を消して入力した数字を入れる）
            if (state.hasResults) {
                return {
                    ...state,
                    inputValue: String(Number(numAction.number)),
                    inputValue: String(numAction.number),
                    hasResults: false,
                };
            }
            return {
                ...state,
                inputValue: state.isDecimal ? fixDigits(notComma(state.inputValue) + numAction.number) : fixDigits(String(Number(notComma(state.inputValue)) * 10 + numAction.number)),
            };
        case INPUT_POINT:
            // 小数点２回目打った時（小数点は効かない）
            if (state.isDecimal) {
                return {
                    ...state,
                    inputValue: state.inputValue,
                };
            }
            // 結果が出た状態で小数点入力した時（結果を消して入力した小数点を入れる）
            if (state.hasResults) {
                return {
                    ...state,
                    inputValue: "0.",
                    isDecimal: true,
                    hasResults: false,
                };
            }
            return {
                ...state,
                inputValue: state.inputValue === "" ? "0." : state.inputValue + ".",
                isDecimal: true,
            };
        case OPERATION:
            const opAction = action as ReturnType<typeof GetAllActions.onOperationClick>;
            // ×と÷を最初に打った時（×と÷は入力できない）
            if (state.inputValue === "" && (opAction.opt === "×" || opAction.opt === "÷")) {
                return {
                    ...state,
                    inputValue: state.inputValue,
                    isDecimal: false,
                };
            }
            // 一時的な計算結果
            const temp = state.operation
                ? fourOperations(state.operation, notComma(state.temporaryValue), notComma(state.inputValue))
                : notComma(state.inputValue);
            return {
                ...state,
                inputValue: "",
                temporaryValue: fixDigits(String(temp)),
                formula: state.formula + state.inputValue + String(opAction.opt),
                operation: opAction.opt,
                isDecimal: false,
            };
        case EQUAL:
            // 計算結果
            const result = state.operation
                ? fourOperations(state.operation, notComma(state.temporaryValue), notComma(state.inputValue))
                : notComma(state.inputValue);
            return {
                ...state,
                inputValue: fixDigits(String(result)),
                formula: "",
                resultValue: fixDigits(String(result)),
                operation: undefined,
                isDecimal: false,
                hasResults: true,
            };
        case RESET:
            return initialAppState;
        default:
            return state;
    }
};

export default calculator;
