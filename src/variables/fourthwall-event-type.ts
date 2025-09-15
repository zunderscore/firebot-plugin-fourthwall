import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { FourthwallEventData } from "../fourthwall-types";
import {
    VARIABLE_PREFIX,
    FOURTHWALL_EVENT_SOURCE_ID,
    FOURTHWALL_ORDER_PLACED_EVENT_ID,
    FOURTHWALL_ORDER_UPDATED_EVENT_ID,
    FOURTHWALL_GIFT_PURCHASE_EVENT_ID,
    FOURTHWALL_DONATION_EVENT_ID,
    FOURTHWALL_PRODUCT_CREATED_EVENT_ID,
    FOURTHWALL_PRODUCT_UPDATED_EVENT_ID,
    FOURTHWALL_SUBSCRIPTION_PURCHASED_EVENT_ID,
    FOURTHWALL_SUBSCRIPTION_CHANGED_EVENT_ID,
    FOURTHWALL_SUBSCRIPTION_EXPIRED_EVENT_ID,
    FOURTHWALL_THANK_YOU_SENT_EVENT_ID,
    FOURTHWALL_NEWSLETTER_SUBSCRIBED_EVENT_ID,
    FOURTHWALL_PLATFORM_APP_DISCONNECTED_EVENT_ID
} from "../constants";

export const FourthwallEventTypeVariable: ReplaceVariable = {
    definition: {
        handle: `${VARIABLE_PREFIX}EventType`,
        description: "The type of the Fourthwall event.",
        possibleDataOutput: [ "text" ],
        categories: [ "trigger based", "advanced" ],
        triggers: {
            event: [
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_ORDER_PLACED_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_ORDER_UPDATED_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_GIFT_PURCHASE_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_DONATION_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_PRODUCT_CREATED_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_PRODUCT_UPDATED_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_SUBSCRIPTION_PURCHASED_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_SUBSCRIPTION_CHANGED_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_SUBSCRIPTION_EXPIRED_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_THANK_YOU_SENT_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_NEWSLETTER_SUBSCRIBED_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_PLATFORM_APP_DISCONNECTED_EVENT_ID}`
            ],
            manual: true
        }
    },
    evaluator: async (trigger) => {
        return (trigger.metadata?.eventData as FourthwallEventData)?.type;
    }
};