import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { FourthwallEventData } from "../fourthwall-types";
import { VARIABLE_PREFIX } from "../constants";
import { getAllEvents } from "../events";

export const FourthwallIsTestModeVariable: ReplaceVariable = {
    definition: {
        handle: `${VARIABLE_PREFIX}IsTestMode`,
        description: "Whether this Fourthwall event was sent in test mode.",
        possibleDataOutput: [ "bool" ],
        categories: [ "trigger based", "advanced" ],
        triggers: {
            event: [
                ...getAllEvents()
            ],
            manual: true
        }
    },
    evaluator: async (trigger) => {
        return (trigger.metadata?.eventData as FourthwallEventData)?.testMode === true;
    }
};