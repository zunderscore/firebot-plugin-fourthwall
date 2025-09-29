import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { FourthwallEventData } from "../fourthwall-types";
import { VARIABLE_PREFIX } from "../constants";
import { getAllEvents } from "../events";

export const FourthwallShopIdVariable: ReplaceVariable = {
    definition: {
        handle: `${VARIABLE_PREFIX}ShopId`,
        description: "Your Fourthwall shop ID.",
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
        return (trigger.metadata?.eventData as FourthwallEventData)?.shopId;
    }
};