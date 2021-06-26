import { INPUT_NUMBER, OPERATION, EQUAL, RESET, INPUT_POINT } from "../utils/actionTypes"
import { OPT } from "../types"

/** 
 * 数字ボタン押下
 * @param number 数字
 */
const onNumClick = (number: number) => ({
    type: INPUT_NUMBER,
    number
});
/** 
 * 小数点ボタン押下
 * @param point 小数点
 */
 const onPointClick = (flg: boolean) => ({
    type: INPUT_POINT,
    flg
});
/** 
 * 四則演算子ボタン押下
 * @param opt 四則演算子
 */
const onOperationClick = (opt: OPT) => ({
    type: OPERATION,
    opt
});
/** イコールボタン押下 */
const onEqualClick = () => ({
    type: EQUAL
});
/** リセットボタン押下 */
const onResetClick = () => ({
    type: RESET
});
/** クリックアクション型定義 */
export type ClickActions =
    | ReturnType<typeof onNumClick>
    | ReturnType<typeof onPointClick>
    | ReturnType<typeof onOperationClick>
    | ReturnType<typeof onEqualClick>
    | ReturnType<typeof onResetClick>;

export const GetAllActions = {
    onNumClick: onNumClick,
    onPointClick: onPointClick,
    onOperationClick: onOperationClick,
    onEqualClick: onEqualClick,
    onResetClick: onResetClick
};
