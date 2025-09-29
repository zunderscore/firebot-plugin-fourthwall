import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { FourthwallOrderEventData } from "../fourthwall-types";
import {
    VARIABLE_PREFIX,
    EVENT_SOURCE_ID,
    ORDER_PLACED_EVENT_ID,
    ORDER_UPDATED_EVENT_ID,
    DONATION_EVENT_ID,
    GIFT_PURCHASE_EVENT_ID,
    SUBSCRIPTION_PURCHASED_EVENT_ID,
    SUBSCRIPTION_CHANGED_EVENT_ID,
    SUBSCRIPTION_EXPIRED_EVENT_ID,
    THANK_YOU_SENT_EVENT_ID,
    NEWSLETTER_SUBSCRIBED_EVENT_ID,
    GIFT_DRAW_STARTED_EVENT_ID,
    GIFT_DRAW_ENDED_EVENT_ID
} from "../constants";

export const FourthwallSupporterEmailVariable: ReplaceVariable = {
    definition: {
        handle: `${VARIABLE_PREFIX}SupporterEmail`,
        description: "**WARNING: Potentially sensitive data! Use this variable with caution!** The email address of the Fourthwall supporter.",
        possibleDataOutput: [ "text" ],
        categories: [ "trigger based" ],
        triggers: {
            event: [
                `${EVENT_SOURCE_ID}:${ORDER_PLACED_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${ORDER_UPDATED_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${DONATION_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${GIFT_PURCHASE_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${SUBSCRIPTION_PURCHASED_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${SUBSCRIPTION_CHANGED_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${SUBSCRIPTION_EXPIRED_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${THANK_YOU_SENT_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${NEWSLETTER_SUBSCRIBED_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${GIFT_DRAW_STARTED_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${GIFT_DRAW_ENDED_EVENT_ID}`
            ],
            manual: true
        }
    },
    evaluator: async (trigger) => {
        return (trigger.metadata?.eventData as FourthwallOrderEventData)?.email;
    }
};