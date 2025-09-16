import { FourthwallApiVersionVariable } from "./fourthwall-api-version";
import { FourthwallCurrencyVariable } from "./fourthwall-currency";
import { FourthwallDonationStatusVariable } from "./fourthwall-donation-status";
import { FourthwallEventIdVariable } from "./fourthwall-event-id";
import { FourthwallEventTypeVariable } from "./fourthwall-event-type";
import { FourthwallIsTestModeVariable } from "./fourthwall-is-test-mode";
import { FourthwallOrderIdVariable } from "./fourthwall-order-id";
import { FourthwallOrderStatusVariable } from "./fourthwall-order-status";
import { FourthwallOrderTotalAmountVariable } from "./fourthwall-order-total-amount";
import { FourthwallProductDescriptionVariable } from "./fourthwall-product-description";
import { FourthwallProductIdVariable } from "./fourthwall-product-id";
import { FourthwallProductImageVariable } from "./fourthwall-product-image";
import { FourthwallProductNameVariable } from "./fourthwall-product-name";
import { FourthwallProductStatusVariable } from "./fourthwall-product-status";
import { FourthwallQuantityVariable } from "./fourthwall-quantity";
import { FourthwallShopIdVariable } from "./fourthwall-shop-id";
import { FourthwallSubscriptionStatusVariable } from "./fourthwall-subscription-status";
import { FourthwallSubscriptionTypeVariable } from "./fourthwall-subscription-type";
import { FourthwallSupporterEmailVariable } from "./fourthwall-supporter-email";
import { FourthwallThankYouRecipientVariable } from "./fourthwall-thank-you-receipient";
import { FourthwallWebhookIdVariable } from "./fourthwall-webhook-id";

import {
    FOURTHWALL_ORDER_PLACED_EVENT_ID,
    FOURTHWALL_ORDER_UPDATED_EVENT_ID,
    FOURTHWALL_DONATION_EVENT_ID,
    FOURTHWALL_GIFT_PURCHASE_EVENT_ID,
    FOURTHWALL_SUBSCRIPTION_PURCHASED_EVENT_ID,
    FOURTHWALL_SUBSCRIPTION_CHANGED_EVENT_ID,
    FOURTHWALL_SUBSCRIPTION_EXPIRED_EVENT_ID,
    FOURTHWALL_GIFT_DRAW_STARTED_EVENT_ID,
    FOURTHWALL_GIFT_DRAW_ENDED_EVENT_ID
} from "../constants";

export const FourthwallVariables = [
    FourthwallApiVersionVariable,
    FourthwallCurrencyVariable,    
    FourthwallDonationStatusVariable,
    FourthwallEventIdVariable,
    FourthwallEventTypeVariable,
    FourthwallIsTestModeVariable,
    FourthwallOrderIdVariable,
    FourthwallOrderStatusVariable,
    FourthwallOrderTotalAmountVariable,
    FourthwallProductDescriptionVariable,
    FourthwallProductIdVariable,
    FourthwallProductImageVariable,
    FourthwallProductNameVariable,
    FourthwallProductStatusVariable,
    FourthwallQuantityVariable,
    FourthwallShopIdVariable,
    FourthwallSubscriptionStatusVariable,
    FourthwallSubscriptionTypeVariable,
    FourthwallSupporterEmailVariable,
    FourthwallThankYouRecipientVariable,
    FourthwallWebhookIdVariable
]

export const FirebotVariableAdditionalEvents: Record<string, string[]> = {
    donationAmount: [
        FOURTHWALL_ORDER_PLACED_EVENT_ID,
        FOURTHWALL_ORDER_UPDATED_EVENT_ID,
        FOURTHWALL_DONATION_EVENT_ID
    ],
    donationFrom: [
        FOURTHWALL_ORDER_PLACED_EVENT_ID,
        FOURTHWALL_ORDER_UPDATED_EVENT_ID,
        FOURTHWALL_DONATION_EVENT_ID,
        FOURTHWALL_GIFT_PURCHASE_EVENT_ID,
        FOURTHWALL_SUBSCRIPTION_PURCHASED_EVENT_ID,
        FOURTHWALL_SUBSCRIPTION_CHANGED_EVENT_ID,
        FOURTHWALL_SUBSCRIPTION_EXPIRED_EVENT_ID,
        FOURTHWALL_GIFT_DRAW_STARTED_EVENT_ID,
        FOURTHWALL_GIFT_DRAW_ENDED_EVENT_ID
    ],
    donationMessage: [
        FOURTHWALL_ORDER_PLACED_EVENT_ID,
        FOURTHWALL_ORDER_UPDATED_EVENT_ID,
        FOURTHWALL_DONATION_EVENT_ID,
        FOURTHWALL_GIFT_PURCHASE_EVENT_ID,
        FOURTHWALL_GIFT_DRAW_STARTED_EVENT_ID,
        FOURTHWALL_GIFT_DRAW_ENDED_EVENT_ID
    ]
}