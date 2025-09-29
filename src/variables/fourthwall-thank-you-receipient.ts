import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { FourthwallThankYouEventData } from "../fourthwall-types";
import {
    VARIABLE_PREFIX,
    EVENT_SOURCE_ID,
    THANK_YOU_SENT_EVENT_ID
} from "../constants";

export const FourthwallThankYouRecipientVariable: ReplaceVariable = {
    definition: {
        handle: `${VARIABLE_PREFIX}ThankYouRecipient`,
        description: "The name of the supporter receiving the Fourthwall thank you.",
        possibleDataOutput: [ "text" ],
        categories: [ "trigger based" ],
        triggers: {
            event: [
                `${EVENT_SOURCE_ID}:${THANK_YOU_SENT_EVENT_ID}`
            ],
            manual: true
        }
    },
    evaluator: async (trigger) => {
        return (trigger.metadata?.eventData as FourthwallThankYouEventData)?.recipientName;
    }
};