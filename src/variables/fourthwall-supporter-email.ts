import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { FourthwallOrderEventData } from "../fourthwall-types";
import {
    VARIABLE_PREFIX,
    FOURTHWALL_EVENT_SOURCE_ID,
    FOURTHWALL_ORDER_PLACED_EVENT_ID,
    FOURTHWALL_ORDER_UPDATED_EVENT_ID,
    FOURTHWALL_DONATION_EVENT_ID,
    FOURTHWALL_GIFT_PURCHASE_EVENT_ID,
    FOURTHWALL_SUBSCRIPTION_PURCHASED_EVENT_ID,
    FOURTHWALL_SUBSCRIPTION_CHANGED_EVENT_ID,
    FOURTHWALL_SUBSCRIPTION_EXPIRED_EVENT_ID,
    FOURTHWALL_THANK_YOU_SENT_EVENT_ID,
    FOURTHWALL_NEWSLETTER_SUBSCRIBED_EVENT_ID,
    FOURTHWALL_GIFT_DRAW_STARTED_EVENT_ID,
    FOURTHWALL_GIFT_DRAW_ENDED_EVENT_ID
} from "../constants";

export const FourthwallSupporterEmailVariable: ReplaceVariable = {
    definition: {
        handle: `${VARIABLE_PREFIX}SupporterEmail`,
        description: "**WARNING: Potentially sensitive data! Use this variable with caution!** The email address of the Fourthwall supporter.",
        possibleDataOutput: [ "text" ],
        categories: [ "trigger based" ],
        triggers: {
            event: [
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_ORDER_PLACED_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_ORDER_UPDATED_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_DONATION_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_GIFT_PURCHASE_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_SUBSCRIPTION_PURCHASED_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_SUBSCRIPTION_CHANGED_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_SUBSCRIPTION_EXPIRED_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_THANK_YOU_SENT_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_NEWSLETTER_SUBSCRIBED_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_GIFT_DRAW_STARTED_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_GIFT_DRAW_ENDED_EVENT_ID}`
            ],
            manual: true
        }
    },
    evaluator: async (trigger) => {
        return (trigger.metadata?.eventData as FourthwallOrderEventData)?.email;
    }
};