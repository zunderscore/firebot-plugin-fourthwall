import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { FourthwallSubscriptionEventData } from "../fourthwall-types";
import {
    VARIABLE_PREFIX,
    FOURTHWALL_EVENT_SOURCE_ID,
    FOURTHWALL_SUBSCRIPTION_PURCHASED_EVENT_ID,
    FOURTHWALL_SUBSCRIPTION_CHANGED_EVENT_ID,
    FOURTHWALL_SUBSCRIPTION_EXPIRED_EVENT_ID
} from "../constants";

export const FourthwallSubscriptionTypeVariable: ReplaceVariable = {
    definition: {
        handle: `${VARIABLE_PREFIX}SubscriptionType`,
        description: "The type of the Fourthwall subscription.",
        possibleDataOutput: [ "text" ],
        categories: [ "trigger based", "advanced" ],
        triggers: {
            event: [
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_SUBSCRIPTION_PURCHASED_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_SUBSCRIPTION_CHANGED_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_SUBSCRIPTION_EXPIRED_EVENT_ID}`
            ],
            manual: true
        }
    },
    evaluator: async (trigger) => {
        return (trigger.metadata?.eventData as FourthwallSubscriptionEventData)?.subscriptionType;
    }
};