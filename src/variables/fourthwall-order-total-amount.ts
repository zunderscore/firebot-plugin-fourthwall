import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { FourthwallOrderEventData } from "../fourthwall-types";
import {
    VARIABLE_PREFIX,
    EVENT_SOURCE_ID,
    ORDER_PLACED_EVENT_ID,
    ORDER_UPDATED_EVENT_ID
} from "../constants";

export const FourthwallOrderTotalAmountVariable: ReplaceVariable = {
    definition: {
        handle: `${VARIABLE_PREFIX}OrderTotalAmount`,
        description: "The total amount of the Fourthwall order, including taxes, shipping, additional donations, etc.",
        possibleDataOutput: [ "number" ],
        categories: [ "trigger based" ],
        triggers: {
            event: [
                `${EVENT_SOURCE_ID}:${ORDER_PLACED_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${ORDER_UPDATED_EVENT_ID}`
            ],
            manual: true
        }
    },
    evaluator: async (trigger) => {
        return (trigger.metadata?.eventData as FourthwallOrderEventData)?.orderTotalAmount;
    }
};