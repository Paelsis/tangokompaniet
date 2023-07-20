import {store} from 'index.js'
import { setTotalDiscount } from 'redux/actions/actionsDiscount'
import {postPayloadWithoutStatus} from 'functions/postPayload'
import config from 'Settings/config';

const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl;
const CALC_DISCOUNT_URL = apiBaseUrl + "/DiscountShoppingCartList"

const handleUpdDiscount = (discount) => {
    store.dispatch(setTotalDiscount(discount.totalDiscount));       
}

export const calculateDiscount = (shoppingCartList) => {
    const state = store.getState();
    postPayloadWithoutStatus(CALC_DISCOUNT_URL, state.user.username, state.user.password, shoppingCartList, handleUpdDiscount);
}

export default calculateDiscount;

