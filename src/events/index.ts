import { EventSource } from "@crowbartools/firebot-custom-scripts-types/types/modules/event-manager";
import {
    PLUGIN_NAME,
    EVENT_SOURCE_ID,
    ORDER_PLACED_EVENT_ID,
    ORDER_UPDATED_EVENT_ID,
    GIFT_PURCHASE_EVENT_ID,
    DONATION_EVENT_ID,
    PRODUCT_CREATED_EVENT_ID,
    PRODUCT_UPDATED_EVENT_ID,
    SUBSCRIPTION_PURCHASED_EVENT_ID,
    SUBSCRIPTION_CHANGED_EVENT_ID,
    SUBSCRIPTION_EXPIRED_EVENT_ID,
    THANK_YOU_SENT_EVENT_ID,
    NEWSLETTER_SUBSCRIBED_EVENT_ID,
    PLATFORM_APP_DISCONNECTED_EVENT_ID,
    GIFT_DRAW_STARTED_EVENT_ID,
    GIFT_DRAW_ENDED_EVENT_ID
} from "../constants";

export const FourthwallEventSource: EventSource = {
    id: EVENT_SOURCE_ID,
    name: PLUGIN_NAME,
    events: [
        {
            id: ORDER_PLACED_EVENT_ID,
            name: `${PLUGIN_NAME}: Order Placed`,
            description: "When someone places an order in your Fourthwall shop"
        },
        {
            id: ORDER_UPDATED_EVENT_ID,
            name: `${PLUGIN_NAME}: Order Updated`,
            description: "When an order in your Fourthwall shop has been updated"
        },
        {
            id: GIFT_PURCHASE_EVENT_ID,
            name: `${PLUGIN_NAME}: Gift Purchase`,
            description: "When someone makes a gift purchase in your Fourthwall shop"
        },
        {
            id: DONATION_EVENT_ID,
            name: `${PLUGIN_NAME}: Donation`,
            description: "When you receive a Fourthwall donation"
        },
        {
            id: PRODUCT_CREATED_EVENT_ID,
            name: `${PLUGIN_NAME}: Product Created`,
            description: "When a product is created in your Fourthwall shop"
        },
        {
            id: PRODUCT_UPDATED_EVENT_ID,
            name: `${PLUGIN_NAME}: Product Updated`,
            description: "When a product is updated in your Fourthwall shop"
        },
        {
            id: SUBSCRIPTION_PURCHASED_EVENT_ID,
            name: `${PLUGIN_NAME}: Membership Subscription Purchased`,
            description: "When someone purchases a membership subscription in your Fourthwall shop"
        },
        {
            id: SUBSCRIPTION_CHANGED_EVENT_ID,
            name: `${PLUGIN_NAME}: Membership Subscription Changed`,
            description: "When someone changes their membership subscription in your Fourthwall shop"
        },
        {
            id: SUBSCRIPTION_EXPIRED_EVENT_ID,
            name: `${PLUGIN_NAME}: Membership Subscription Expired`,
            description: "When someone's membership subscription expires in your Fourthwall shop"
        },
        {
            id: THANK_YOU_SENT_EVENT_ID,
            name: `${PLUGIN_NAME}: Thank You Sent`,
            description: "When you send a thank you to a Fourthwall supporter"
        },
        {
            id: NEWSLETTER_SUBSCRIBED_EVENT_ID,
            name: `${PLUGIN_NAME}: Newsletter Subscribed`,
            description: "When someone subscribes to your Fourthwall newsletter"
        },
        {
            id: PLATFORM_APP_DISCONNECTED_EVENT_ID,
            name: `${PLUGIN_NAME}: Platform App Disconnected`,
            description: "When a Platform App is disconnected from your Fourthwall shop"
        },
        {
            id: GIFT_DRAW_STARTED_EVENT_ID,
            name: `${PLUGIN_NAME}: Gift Draw Started`,
            description: "When a gift drawing in your Fourthwall shop has started"
        },
        {
            id: GIFT_DRAW_ENDED_EVENT_ID,
            name: `${PLUGIN_NAME}: Gift Draw Ended`,
            description: "When a gift drawing in your Fourthwall shop has ended"
        }
    ]
}

export function getAllEvents(): string[] {
    return FourthwallEventSource.events.reduce((out, e) => {
        out.push(`${EVENT_SOURCE_ID}:${e.id}`);
        return out;
    }, [] as string[]);
}

export function getEventsMatchingPrefix(prefix: string): string[] {
    return FourthwallEventSource.events.reduce((out, e) => {
        if (e.id.startsWith(prefix)) {
            out.push(`${EVENT_SOURCE_ID}:${e.id}`);
        }
        return out;
    }, [] as string[]);
}