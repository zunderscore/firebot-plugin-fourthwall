import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { FourthwallDonationEventData, FourthwallOrderEventData } from "../fourthwall-types";
import {
    VARIABLE_PREFIX,
    FOURTHWALL_EVENT_SOURCE_ID,
    FOURTHWALL_DONATION_EVENT_ID
} from "../constants";

export const FourthwallDonationStatusVariable: ReplaceVariable = {
    definition: {
        handle: `${VARIABLE_PREFIX}DonationStatus`,
        description: "The status of the Fourthwall donation.",
        possibleDataOutput: [ "text" ],
        categories: [ "trigger based", "advanced" ],
        triggers: {
            event: [
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_DONATION_EVENT_ID}`
            ],
            manual: true
        }
    },
    evaluator: async (trigger) => {
        return (trigger.metadata?.eventData as FourthwallDonationEventData)?.status;
    }
};