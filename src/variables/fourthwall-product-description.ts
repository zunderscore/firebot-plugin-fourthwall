import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { FourthwallGiftEventData, FourthwallProductEventData } from "../fourthwall-types";
import {
    VARIABLE_PREFIX,
    FOURTHWALL_EVENT_SOURCE_ID,
    FOURTHWALL_GIFT_PURCHASE_EVENT_ID,
    FOURTHWALL_PRODUCT_CREATED_EVENT_ID,
    FOURTHWALL_PRODUCT_UPDATED_EVENT_ID
} from "../constants";

export const FourthwallProductDescriptionVariable: ReplaceVariable = {
    definition: {
        handle: `${VARIABLE_PREFIX}ProductDescription`,
        description: "The description of the Fourthwall product.",
        possibleDataOutput: [ "text" ],
        categories: [ "trigger based" ],
        triggers: {
            event: [
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_GIFT_PURCHASE_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_PRODUCT_CREATED_EVENT_ID}`,
                `${FOURTHWALL_EVENT_SOURCE_ID}:${FOURTHWALL_PRODUCT_UPDATED_EVENT_ID}`
            ],
            manual: true
        }
    },
    evaluator: async (trigger) => {
        return (trigger.metadata?.eventData as FourthwallProductEventData)?.productDescription;
    }
};