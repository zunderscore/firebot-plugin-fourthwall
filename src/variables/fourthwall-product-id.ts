import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { FourthwallProductEventData } from "../fourthwall-types";
import {
    VARIABLE_PREFIX,
    EVENT_SOURCE_ID,
    GIFT_PURCHASE_EVENT_ID,
    PRODUCT_CREATED_EVENT_ID,
    PRODUCT_UPDATED_EVENT_ID,
    GIFT_DRAW_STARTED_EVENT_ID,
    GIFT_DRAW_ENDED_EVENT_ID
} from "../constants";

export const FourthwallProductIdVariable: ReplaceVariable = {
    definition: {
        handle: `${VARIABLE_PREFIX}ProductId`,
        description: "The ID of the Fourthwall product.",
        possibleDataOutput: [ "text" ],
        categories: [ "trigger based", "advanced" ],
        triggers: {
            event: [
                `${EVENT_SOURCE_ID}:${GIFT_PURCHASE_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${PRODUCT_CREATED_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${PRODUCT_UPDATED_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${GIFT_DRAW_STARTED_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${GIFT_DRAW_ENDED_EVENT_ID}`
            ],
            manual: true
        }
    },
    evaluator: async (trigger) => {
        return (trigger.metadata?.eventData as FourthwallProductEventData)?.productId;
    }
};