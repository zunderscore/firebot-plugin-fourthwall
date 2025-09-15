import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { FourthwallOrderEventData } from "../fourthwall-types";
import {
    VARIABLE_PREFIX,
    FOURTHWALL_EVENT_SOURCE_ID,
    FOURTHWALL_ORDER_PLACED_EVENT_ID,
    FOURTHWALL_ORDER_UPDATED_EVENT_ID
} from "../constants";

export const FourthwallOrderTotalAmountVariable: ReplaceVariable = {
    definition: {
        handle: `${VARIABLE_PREFIX}OrderTotalAmount`,
        description: "The total amount of the Fourthwall order, including taxes, shipping, additional donations, etc.",
        possibleDataOutput: [ "number" ],
        categories: [ "trigger based" ],
        triggers: {
            event: [
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_ORDER_PLACED_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_ORDER_UPDATED_EVENT_ID}`
            ],
            manual: true
        }
    },
    evaluator: async (trigger) => {
        return (trigger.metadata?.eventData as FourthwallOrderEventData)?.orderTotalAmount;
    }
};