import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { FourthwallEventData } from "../fourthwall-types";
import {
    VARIABLE_PREFIX,
    EVENT_SOURCE_ID,
    ORDER_PLACED_EVENT_ID,
    ORDER_UPDATED_EVENT_ID,
    GIFT_PURCHASE_EVENT_ID,
    DONATION_EVENT_ID,
    PRODUCT_CREATED_EVENT_ID,
    PRODUCT_UPDATED_EVENT_ID,
    SUBSCRIPTION_PURCHASED_EVENT_ID,
    SUBSCRIPTION_CHANGED_EVENT_ID,
    SUBSCRIPTION_EXPIRED_EVENT_ID,
    THANK_YOU_SENT_EVENT_ID,
    NEWSLETTER_SUBSCRIBED_EVENT_ID,
    PLATFORM_APP_DISCONNECTED_EVENT_ID,
    GIFT_DRAW_STARTED_EVENT_ID,
    GIFT_DRAW_ENDED_EVENT_ID
} from "../constants";

export const FourthwallEventTypeVariable: ReplaceVariable = {
    definition: {
        handle: `${VARIABLE_PREFIX}EventType`,
        description: "The type of the Fourthwall event.",
        possibleDataOutput: [ "text" ],
        categories: [ "trigger based", "advanced" ],
        triggers: {
            event: [
                `${EVENT_SOURCE_ID}:${ORDER_PLACED_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${ORDER_UPDATED_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${GIFT_PURCHASE_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${DONATION_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${PRODUCT_CREATED_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${PRODUCT_UPDATED_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${SUBSCRIPTION_PURCHASED_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${SUBSCRIPTION_CHANGED_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${SUBSCRIPTION_EXPIRED_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${THANK_YOU_SENT_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${NEWSLETTER_SUBSCRIBED_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${PLATFORM_APP_DISCONNECTED_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${GIFT_DRAW_STARTED_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${GIFT_DRAW_ENDED_EVENT_ID}`
            ],
            manual: true
        }
    },
    evaluator: async (trigger) => {
        return (trigger.metadata?.eventData as FourthwallEventData)?.type;
    }
};