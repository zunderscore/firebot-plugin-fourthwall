import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { FourthwallEventData } from "../fourthwall-types";
import { VARIABLE_PREFIX } from "../constants";
import { getAllEvents } from "../events";

export const FourthwallApiVersionVariable: ReplaceVariable = {
    definition: {
        handle: `${VARIABLE_PREFIX}ApiVersion`,
        description: "The Fourthwall API version for the event.",
        possibleDataOutput: [ "text" ],
        categories: [ "trigger based", "advanced" ],
        triggers: {
            event: [
                ...getAllEvents()
            ],
            manual: true
        }
    },
    evaluator: async (trigger) => {
        return (trigger.metadata?.eventData as FourthwallEventData)?.apiVersion;
    }
};