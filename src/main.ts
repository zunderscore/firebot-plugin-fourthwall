import firebot, { Plugin, PluginWebhookEventHandler } from "@crowbartools/firebot-types";

import { FourthwallEventSource } from "./events";
import { FourthwallVariables, FirebotVariableAdditionalEvents } from "./variables";

import { FourthwallEventData, FourthwallPayload } from "./fourthwall-types";

import {
    PLUGIN_ID,
    PLUGIN_NAME,
    EVENT_SOURCE_ID,
    ORDER_PLACED_EVENT_ID,
    ORDER_UPDATED_EVENT_ID,
    DONATION_EVENT_ID,
    GIFT_PURCHASE_EVENT_ID,
    PRODUCT_CREATED_EVENT_ID,
    PRODUCT_UPDATED_EVENT_ID,
    SUBSCRIPTION_PURCHASED_EVENT_ID,
    SUBSCRIPTION_CHANGED_EVENT_ID,
    SUBSCRIPTION_EXPIRED_EVENT_ID,
    THANK_YOU_SENT_EVENT_ID,
    NEWSLETTER_SUBSCRIBED_EVENT_ID,
    PLATFORM_APP_DISCONNECTED_EVENT_ID,
    GIFT_DRAW_STARTED_EVENT_ID,
    GIFT_DRAW_ENDED_EVENT_ID,
} from "./constants";

const packageInfo = require("../package.json");

// Account for duplicate messages
const processWebhook: PluginWebhookEventHandler = ({ webhook, payload }) => {
    const fourthwallPayload = payload as FourthwallPayload;
    firebot.logger.debug(`Got webhook for ${webhook.name}`);
    if (webhook.name !== PLUGIN_NAME) {
        firebot.logger.debug(`Received unknown webhook event for ${webhook.name}. Ignoring.`);
        return;
    }

    firebot.logger.debug(`Webhook type: ${fourthwallPayload.type}`);

    let eventName: string, eventData: FourthwallEventData;
    const baseEventData = {
        testMode: fourthwallPayload.testMode,
        eventId: fourthwallPayload.id,
        webhookId: fourthwallPayload.webhookId,
        shopId: fourthwallPayload.shopId,
        apiVersion: fourthwallPayload.apiVersion,
        createdAt: fourthwallPayload.createdAt
    };

    switch (fourthwallPayload.type) {
        case "ORDER_PLACED":
        case "ORDER_UPDATED":
            let orderBaseData;
            switch (fourthwallPayload.type) {
                case "ORDER_PLACED":
                    eventName = ORDER_PLACED_EVENT_ID;
                    orderBaseData = fourthwallPayload.data;
                    break;

                case "ORDER_UPDATED":
                    eventName = ORDER_UPDATED_EVENT_ID;
                    orderBaseData = fourthwallPayload.data.order;
                    break;
            }

            eventData = {
                type: fourthwallPayload.type,
                ...baseEventData,
                orderId: orderBaseData.id,
                friendlyId: orderBaseData.friendlyId,
                checkoutId: orderBaseData.checkoutId,
                status: orderBaseData.status,
                from: orderBaseData.username,
                email: orderBaseData.email,
                emailMarketingOptIn: orderBaseData.emailMarketingOptIn,
                donationMessage: orderBaseData.message,
                donationAmount: orderBaseData.amounts.donation.value,
                orderTotalAmount: orderBaseData.amounts.total.value,
                quantity: orderBaseData.offers.map(o => o.variant.quantity).reduce((p, c) => c += p),
                currency: orderBaseData.amounts.total.currency,
                updatedAt: orderBaseData.updatedAt,
                source: orderBaseData.source.type
            }
            break;

        case "DONATION":
            eventName = DONATION_EVENT_ID;
            eventData = {
                type: fourthwallPayload.type,
                ...baseEventData,
                donationId: fourthwallPayload.data.id,
                status: fourthwallPayload.data.status,
                from: fourthwallPayload.data.username,
                email: fourthwallPayload.data.email,
                donationMessage: fourthwallPayload.data.message,
                donationAmount: fourthwallPayload.data.amounts.total.value,
                currency: fourthwallPayload.data.amounts.total.currency,
                updatedAt: fourthwallPayload.data.updatedAt
            }
            break;

        case "GIFT_PURCHASE":
            eventName = GIFT_PURCHASE_EVENT_ID;
            eventData = {
                type: fourthwallPayload.type,
                ...baseEventData,
                giftPurchaseId: fourthwallPayload.data.id,
                friendlyId: fourthwallPayload.data.friendlyId,
                productId: fourthwallPayload.data.offer.id,
                productName: fourthwallPayload.data.offer.name,
                productDescription: fourthwallPayload.data.offer.description,
                productImageUrl: fourthwallPayload.data.offer.primaryImage.url,
                quantity: fourthwallPayload.data.quantity,
                from: fourthwallPayload.data.username,
                email: fourthwallPayload.data.email,
                donationMessage: fourthwallPayload.data.message,
                orderTotalAmount: fourthwallPayload.data.amounts.total.value,
                currency: fourthwallPayload.data.amounts.total.currency
            }
            break;

        case "PRODUCT_CREATED":
        case "PRODUCT_UPDATED":
            let baseProductData;
            switch (fourthwallPayload.type) {
                case "PRODUCT_CREATED":
                    eventName = PRODUCT_CREATED_EVENT_ID;
                    baseProductData = fourthwallPayload.data;
                    break;

                case "PRODUCT_UPDATED":
                    eventName = PRODUCT_UPDATED_EVENT_ID;
                    baseProductData = fourthwallPayload.data.product;
                    break;
            }

            eventData = {
                type: fourthwallPayload.type,
                ...baseEventData,
                productId: baseProductData.id,
                productName: baseProductData.name,
                productDescription: baseProductData.description,
                productStatus: baseProductData.state.type,
                productImageUrl: baseProductData.images[0]?.url,
                variants: baseProductData.variants,
                updatedAt: baseProductData.updatedAt
            }
            break;

        case "SUBSCRIPTION_PURCHASED":
        case "SUBSCRIPTION_CHANGED":
        case "SUBSCRIPTION_EXPIRED":
            switch (fourthwallPayload.type) {
                case "SUBSCRIPTION_PURCHASED":
                    eventName = SUBSCRIPTION_PURCHASED_EVENT_ID;
                    break;

                case "SUBSCRIPTION_CHANGED":
                    eventName = SUBSCRIPTION_CHANGED_EVENT_ID;
                    break;

                case "SUBSCRIPTION_EXPIRED":
                    eventName = SUBSCRIPTION_EXPIRED_EVENT_ID;
                    break;
            }
            eventData = {
                type: fourthwallPayload.type,
                ...baseEventData,
                subscriptionId: fourthwallPayload.data.id,
                from: fourthwallPayload.data.nickname,
                email: fourthwallPayload.data.email,
                subscriptionStatus: fourthwallPayload.data.subscription.type,
                subscriptionType: fourthwallPayload.data.subscription.variant.id,
                subscriptionInterval: fourthwallPayload.data.subscription.variant.interval,
                subscriptionAmount: fourthwallPayload.data.subscription.variant.amount.value,
                currency: fourthwallPayload.data.subscription.variant.amount.currency
            }
            break;

        case "THANK_YOU_SENT":
            eventName = THANK_YOU_SENT_EVENT_ID;
            eventData = {
                type: fourthwallPayload.type,
                ...baseEventData,
                thankYouId: fourthwallPayload.data.id,
                mediaUrl: fourthwallPayload.data.mediaUrl,
                contributionType: fourthwallPayload.data.contribution.type,
                contributionId: fourthwallPayload.data.contribution.id,
                recipientName: fourthwallPayload.data.contribution.supporter.username,
                email: fourthwallPayload.data.contribution.supporter.email,
                thankYouMessage: fourthwallPayload.data.contribution.supporter.message,
            }
            break;

        case "NEWSLETTER_SUBSCRIBED":
            eventName = NEWSLETTER_SUBSCRIBED_EVENT_ID;
            eventData = {
                type: fourthwallPayload.type,
                ...baseEventData,
                email: fourthwallPayload.data.email
            }
            break;

        case "PLATFORM_APP_DISCONNECTED":
            eventName = PLATFORM_APP_DISCONNECTED_EVENT_ID;
            eventData = {
                type: fourthwallPayload.type,
                ...baseEventData,
                appId: fourthwallPayload.data.appId
            }
            break;

        case "GIFT_DRAW_STARTED":
        case "GIFT_DRAW_ENDED":
            switch (fourthwallPayload.type) {
                case "GIFT_DRAW_STARTED":
                    eventName = GIFT_DRAW_STARTED_EVENT_ID;
                    break;

                case "GIFT_DRAW_ENDED":
                    eventName = GIFT_DRAW_ENDED_EVENT_ID;
                    break;
            }

            eventData = {
                type: fourthwallPayload.type,
                ...baseEventData,
                giftDrawId: fourthwallPayload.data.id,
                giftDrawType: fourthwallPayload.data.type,
                giveawayId: fourthwallPayload.data.giveawayId,
                giveawayFriendlyId: fourthwallPayload.data.giveawayFriendlyId,
                durationSeconds: fourthwallPayload.data.durationSeconds,
                from: fourthwallPayload.data.username,
                email: fourthwallPayload.data.email,
                donationMessage: fourthwallPayload.data.message,
                productId: fourthwallPayload.data.offer.id,
                productName: fourthwallPayload.data.offer.name,
                productDescription: fourthwallPayload.data.offer.description,
                productImageUrl: fourthwallPayload.data.offer.primaryImage.url,
                orderTotalAmount: fourthwallPayload.data.amounts.total.value,
                currency: fourthwallPayload.data.amounts.total.currency
            };
            break;

        default:
            firebot.logger.warn(`Unknown event type ${(payload as any).type}. Skipping.`);
            return;
    }

    firebot.logger.debug(`Triggering event ${eventName}`);
    firebot.events.trigger(EVENT_SOURCE_ID, eventName, eventData);
};

const plugin: Plugin<{
    copyWebhookUrl: void;
}> = {
    manifest: {
        name: PLUGIN_NAME,
        description: packageInfo.description,
        author: packageInfo.author,
        version: packageInfo.version,
        repo: "https://github.com/zunderscore/firebot-plugin-fourthwall",
        icon: {
            type: "custom",
            url: "data:image/png;base64,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",
            backgroundColor: "#000000"
        },
        minimumFirebotVersion: { major: 5, minor: 67 }
    },
    parametersSchema: [
        {
            name: "copyWebhookUrl",
            type: "button",
            title: "Webhook URL",
            description: "Copy this URL then go to your Fourthwall account settings. Under Settings > For developers > Webhooks, create a new webhook, paste the copied URL into the **URL** field, select which events you want Fourthwall to send, and click \"Save\".",
            backendEventName: `${PLUGIN_ID}:copy-webhook-url`,
            buttonText: "Copy URL"
        }
    ],
    registers: {
        eventSources: [FourthwallEventSource],
        variables: FourthwallVariables,
        additionalVariableEvents: FirebotVariableAdditionalEvents,
        webhooks: {
            handler: processWebhook,
            webhookNames: [
                PLUGIN_NAME
            ]
        },
        frontendListeners: [
            {
                eventName: `${PLUGIN_ID}:copy-webhook-url`,
                handler: () => {
                    firebot.frontendCommunicator.send("copy-to-clipboard", {
                        text: firebot.webhooks.getUrl(PLUGIN_NAME),
                    });
                }
            }
        ]
    }
}

export default plugin;