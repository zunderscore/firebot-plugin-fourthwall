import { PluginAdditionalVariableEvents } from "@crowbartools/firebot-types";

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
    ORDER_PLACED_EVENT_ID,
    ORDER_UPDATED_EVENT_ID,
    DONATION_EVENT_ID,
    GIFT_PURCHASE_EVENT_ID,
    SUBSCRIPTION_PURCHASED_EVENT_ID,
    SUBSCRIPTION_CHANGED_EVENT_ID,
    SUBSCRIPTION_EXPIRED_EVENT_ID,
    GIFT_DRAW_STARTED_EVENT_ID,
    GIFT_DRAW_ENDED_EVENT_ID,
    EVENT_SOURCE_ID
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

export const FirebotVariableAdditionalEvents: PluginAdditionalVariableEvents[] = [
    {
        handle: "donationAmount",
        events: [
            { eventSourceId: EVENT_SOURCE_ID, eventId: ORDER_PLACED_EVENT_ID },
            { eventSourceId: EVENT_SOURCE_ID, eventId: ORDER_UPDATED_EVENT_ID },
            { eventSourceId: EVENT_SOURCE_ID, eventId: DONATION_EVENT_ID }
        ],
    },
    {
        handle: "donationFrom",
        events: [
            { eventSourceId: EVENT_SOURCE_ID, eventId: ORDER_PLACED_EVENT_ID },
            { eventSourceId: EVENT_SOURCE_ID, eventId: ORDER_UPDATED_EVENT_ID },
            { eventSourceId: EVENT_SOURCE_ID, eventId: DONATION_EVENT_ID },
            { eventSourceId: EVENT_SOURCE_ID, eventId: GIFT_PURCHASE_EVENT_ID },
            { eventSourceId: EVENT_SOURCE_ID, eventId: SUBSCRIPTION_PURCHASED_EVENT_ID },
            { eventSourceId: EVENT_SOURCE_ID, eventId: SUBSCRIPTION_CHANGED_EVENT_ID },
            { eventSourceId: EVENT_SOURCE_ID, eventId: SUBSCRIPTION_EXPIRED_EVENT_ID },
            { eventSourceId: EVENT_SOURCE_ID, eventId: GIFT_DRAW_STARTED_EVENT_ID },
            { eventSourceId: EVENT_SOURCE_ID, eventId: GIFT_DRAW_ENDED_EVENT_ID },
        ],
    },
    {
        handle: "donationMessage",
        events: [
            { eventSourceId: EVENT_SOURCE_ID, eventId: ORDER_PLACED_EVENT_ID },
            { eventSourceId: EVENT_SOURCE_ID, eventId: ORDER_UPDATED_EVENT_ID },
            { eventSourceId: EVENT_SOURCE_ID, eventId: DONATION_EVENT_ID },
            { eventSourceId: EVENT_SOURCE_ID, eventId: GIFT_PURCHASE_EVENT_ID },
            { eventSourceId: EVENT_SOURCE_ID, eventId: GIFT_DRAW_STARTED_EVENT_ID },
            { eventSourceId: EVENT_SOURCE_ID, eventId: GIFT_DRAW_ENDED_EVENT_ID },
        ],
    },
];