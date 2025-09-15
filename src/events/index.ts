import { EventSource } from "@crowbartools/firebot-custom-scripts-types/types/modules/event-manager";
import {
    PLUGIN_NAME,
    FOURTHWALL_EVENT_SOURCE_ID,
    FOURTHWALL_ORDER_PLACED_EVENT_ID,
    FOURTHWALL_ORDER_UPDATED_EVENT_ID,
    FOURTHWALL_GIFT_PURCHASE_EVENT_ID,
    FOURTHWALL_DONATION_EVENT_ID,
    FOURTHWALL_PRODUCT_CREATED_EVENT_ID,
    FOURTHWALL_PRODUCT_UPDATED_EVENT_ID,
    FOURTHWALL_SUBSCRIPTION_PURCHASED_EVENT_ID,
    FOURTHWALL_SUBSCRIPTION_CHANGED_EVENT_ID,
    FOURTHWALL_SUBSCRIPTION_EXPIRED_EVENT_ID,
    FOURTHWALL_THANK_YOU_SENT_EVENT_ID,
    FOURTHWALL_NEWSLETTER_SUBSCRIBED_EVENT_ID,
    FOURTHWALL_PLATFORM_APP_DISCONNECTED_EVENT_ID
} from "../constants";

export const FourthwallEventSource: EventSource = {
    id: FOURTHWALL_EVENT_SOURCE_ID,
    name: PLUGIN_NAME,
    events: [
        {
            id: FOURTHWALL_ORDER_PLACED_EVENT_ID,
            name: `${PLUGIN_NAME}: Order Placed`,
            description: "When someone places an order in your Fourthwall shop"
        },
        {
            id: FOURTHWALL_ORDER_UPDATED_EVENT_ID,
            name: `${PLUGIN_NAME}: Order Updated`,
            description: "When an order in your Fourthwall shop has been updated"
        },
        {
            id: FOURTHWALL_GIFT_PURCHASE_EVENT_ID,
            name: `${PLUGIN_NAME}: Gift Purchase`,
            description: "When someone makes a gift purchase in your Fourthwall shop"
        },
        {
            id: FOURTHWALL_DONATION_EVENT_ID,
            name: `${PLUGIN_NAME}: Donation`,
            description: "When you receive a Fourthwall donation"
        },
        {
            id: FOURTHWALL_PRODUCT_CREATED_EVENT_ID,
            name: `${PLUGIN_NAME}: Product Created`,
            description: "When a product is created in your Fourthwall shop"
        },
        {
            id: FOURTHWALL_PRODUCT_UPDATED_EVENT_ID,
            name: `${PLUGIN_NAME}: Product Updated`,
            description: "When a product is updated in your Fourthwall shop"
        },
        {
            id: FOURTHWALL_SUBSCRIPTION_PURCHASED_EVENT_ID,
            name: `${PLUGIN_NAME}: Membership Subscription Purchased`,
            description: "When someone purchases a membership subscription in your Fourthwall shop"
        },
        {
            id: FOURTHWALL_SUBSCRIPTION_CHANGED_EVENT_ID,
            name: `${PLUGIN_NAME}: Membership Subscription Changed`,
            description: "When someone changes their membership subscription in your Fourthwall shop"
        },
        {
            id: FOURTHWALL_SUBSCRIPTION_EXPIRED_EVENT_ID,
            name: `${PLUGIN_NAME}: Membership Subscription Expired`,
            description: "When someone's membership subscription expires in your Fourthwall shop"
        },
        {
            id: FOURTHWALL_THANK_YOU_SENT_EVENT_ID,
            name: `${PLUGIN_NAME}: Thank You Sent`,
            description: "When you send a thank you to a Fourthwall supporter"
        },
        {
            id: FOURTHWALL_NEWSLETTER_SUBSCRIBED_EVENT_ID,
            name: `${PLUGIN_NAME}: Newsletter Subscribed`,
            description: "When someone subscribes to your Fourthwall newsletter"
        },
        {
            id: FOURTHWALL_PLATFORM_APP_DISCONNECTED_EVENT_ID,
            name: `${PLUGIN_NAME}: Platform App Disconnected`,
            description: "When a Platform App is disconnected from your Fourthwall shop"
        },
    ]
}