import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { FourthwallSubscriptionEventData } from "../fourthwall-types";
import {
    VARIABLE_PREFIX,
    EVENT_SOURCE_ID,
    SUBSCRIPTION_PURCHASED_EVENT_ID,
    SUBSCRIPTION_CHANGED_EVENT_ID,
    SUBSCRIPTION_EXPIRED_EVENT_ID
} from "../constants";

export const FourthwallSubscriptionStatusVariable: ReplaceVariable = {
    definition: {
        handle: `${VARIABLE_PREFIX}SubscriptionStatus`,
        description: "The status of the Fourthwall subscription.",
        possibleDataOutput: [ "text" ],
        categories: [ "trigger based", "advanced" ],
        triggers: {
            event: [
                `${EVENT_SOURCE_ID}:${SUBSCRIPTION_PURCHASED_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${SUBSCRIPTION_CHANGED_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${SUBSCRIPTION_EXPIRED_EVENT_ID}`
            ],
            manual: true
        }
    },
    evaluator: async (trigger) => {
        return (trigger.metadata?.eventData as FourthwallSubscriptionEventData)?.subscriptionStatus;
    }
};