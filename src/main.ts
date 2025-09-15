import { Firebot } from "@crowbartools/firebot-custom-scripts-types";
import { Logger } from "@crowbartools/firebot-custom-scripts-types/types/modules/logger";
import { EventManager } from "@crowbartools/firebot-custom-scripts-types/types/modules/event-manager";
import { ReplaceVariableManager } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { WebhookConfig, WebhookManager } from "@crowbartools/firebot-custom-scripts-types/types/modules/webhook-manager";

import { FourthwallEventSource } from "./events";
import { FourthwallVariables, FirebotVariableAdditionalEvents } from "./variables";

import { FourthwallEventData, FourthwallPayload } from "./fourthwall-types";

import {
    PLUGIN_NAME,
    FOURTHWALL_EVENT_SOURCE_ID,
    FOURTHWALL_ORDER_PLACED_EVENT_ID,
    FOURTHWALL_ORDER_UPDATED_EVENT_ID,
    FOURTHWALL_DONATION_EVENT_ID,
    FOURTHWALL_GIFT_PURCHASE_EVENT_ID,
    FOURTHWALL_PRODUCT_CREATED_EVENT_ID,
    FOURTHWALL_PRODUCT_UPDATED_EVENT_ID,
    FOURTHWALL_SUBSCRIPTION_PURCHASED_EVENT_ID,
    FOURTHWALL_SUBSCRIPTION_CHANGED_EVENT_ID,
    FOURTHWALL_SUBSCRIPTION_EXPIRED_EVENT_ID,
    FOURTHWALL_THANK_YOU_SENT_EVENT_ID,
    FOURTHWALL_NEWSLETTER_SUBSCRIBED_EVENT_ID,
    FOURTHWALL_PLATFORM_APP_DISCONNECTED_EVENT_ID
} from "./constants";

const packageInfo = require("../package.json");

let logger: Logger;
let eventManager: EventManager;
let replaceVariableManager: ReplaceVariableManager;
let webhookManager: WebhookManager;

const logDebug = (msg: string, ...meta: any[]) => logger.debug(`[${PLUGIN_NAME}] ${msg}`, ...meta);
const logInfo = (msg: string, ...meta: any[]) => logger.info(`[${PLUGIN_NAME}] ${msg}`, ...meta);
const logWarn = (msg: string, ...meta: any[]) => logger.warn(`[${PLUGIN_NAME}] ${msg}`, ...meta);
const logError = (msg: string, ...meta: any[]) => logger.error(`[${PLUGIN_NAME}] ${msg}`, ...meta);

// Account for duplicate messages

const processWebhook = ({ config, payload }: { config: WebhookConfig, payload: FourthwallPayload }) => {
    logDebug(`Got webhook for ${config.name}`);
    if (config.name !== PLUGIN_NAME) {
        logDebug(`Received unknown webhook event for ${config.name}. Ignoring.`);
        return;
    }

    logDebug(`Webhook type: ${payload.type}`);

    let eventName: string, eventData: FourthwallEventData;
    const baseEventData = {
        testMode: payload.testMode,
        eventId: payload.id,
        webhookId: payload.webhookId,
        shopId: payload.shopId,
        apiVersion: payload.apiVersion,
        createdAt: payload.createdAt
    };

    switch (payload.type) {
        case "ORDER_PLACED":
        case "ORDER_UPDATED":
            let orderBaseData;
            switch (payload.type) {
                case "ORDER_PLACED":
                    eventName = FOURTHWALL_ORDER_PLACED_EVENT_ID;
                    orderBaseData = payload.data;
                    break;

                case "ORDER_UPDATED":
                    eventName = FOURTHWALL_ORDER_UPDATED_EVENT_ID;
                    orderBaseData = payload.data.order;
                    break;
            }

            eventData = {
                type: payload.type,
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
            eventName = FOURTHWALL_DONATION_EVENT_ID;
            eventData = {
                type: payload.type,
                ...baseEventData,
                donationId: payload.data.id,
                status: payload.data.status,
                from: payload.data.username,
                email: payload.data.email,
                donationMessage: payload.data.message,
                donationAmount: payload.data.amounts.total.value,
                currency: payload.data.amounts.total.currency,
                updatedAt: payload.data.updatedAt
            }
            break;

        case "GIFT_PURCHASE":
            eventName = FOURTHWALL_GIFT_PURCHASE_EVENT_ID;
            eventData = {
                type: payload.type,
                ...baseEventData,
                giftPurchaseId: payload.data.id,
                friendlyId: payload.data.friendlyId,
                productId: payload.data.offer.id,
                productName: payload.data.offer.name,
                productDescription: payload.data.offer.description,
                productImageUrl: payload.data.offer.primaryImage.url,
                quantity: payload.data.quantity,
                from: payload.data.username,
                email: payload.data.email,
                donationMessage: payload.data.message,
                orderTotalAmount: payload.data.amounts.total.value,
                currency: payload.data.amounts.total.currency
            }
            break;

        case "PRODUCT_CREATED":
        case "PRODUCT_UPDATED":
            let baseProductData;
            switch (payload.type) {
                case "PRODUCT_CREATED":
                    eventName = FOURTHWALL_PRODUCT_CREATED_EVENT_ID;
                    baseProductData = payload.data;
                    break;

                case "PRODUCT_UPDATED":
                    eventName = FOURTHWALL_PRODUCT_UPDATED_EVENT_ID;
                    baseProductData = payload.data.product;
                    break;
            }

            eventData = {
                type: payload.type,
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
            switch (payload.type) {
                case "SUBSCRIPTION_PURCHASED":
                    eventName = FOURTHWALL_SUBSCRIPTION_PURCHASED_EVENT_ID;
                    break;

                case "SUBSCRIPTION_CHANGED":
                    eventName = FOURTHWALL_SUBSCRIPTION_CHANGED_EVENT_ID;
                    break;

                case "SUBSCRIPTION_EXPIRED":
                    eventName = FOURTHWALL_SUBSCRIPTION_EXPIRED_EVENT_ID;
                    break;
            }
            eventData = {
                type: payload.type,
                ...baseEventData,
                subscriptionId: payload.data.id,
                from: payload.data.nickname,
                email: payload.data.email,
                subscriptionStatus: payload.data.subscription.type,
                subscriptionType: payload.data.subscription.variant.id,
                subscriptionInterval: payload.data.subscription.variant.interval,
                subscriptionAmount: payload.data.subscription.variant.amount.value,
                currency: payload.data.subscription.variant.amount.currency
            }
            break;

        case "THANK_YOU_SENT":
            eventName = FOURTHWALL_THANK_YOU_SENT_EVENT_ID;
            eventData = {
                type: payload.type,
                ...baseEventData,
                thankYouId: payload.data.id,
                mediaUrl: payload.data.mediaUrl,
                contributionType: payload.data.contribution.type,
                contributionId: payload.data.contribution.id,
                recipientName: payload.data.contribution.supporter.username,
                email: payload.data.contribution.supporter.email,
                thankYouMessage: payload.data.contribution.supporter.message,
            }
            break;

        case "NEWSLETTER_SUBSCRIBED":
            eventName = FOURTHWALL_NEWSLETTER_SUBSCRIBED_EVENT_ID;
            eventData = {
                type: payload.type,
                ...baseEventData,
                email: payload.data.email
            }
            break;

        case "PLATFORM_APP_DISCONNECTED":
            eventName = FOURTHWALL_PLATFORM_APP_DISCONNECTED_EVENT_ID;
            eventData = {
                type: payload.type,
                ...baseEventData,
                appId: payload.data.appId
            }
            break;

        default:
            logDebug(`Unknown event type ${(payload as any).type}`);
            return;
    }

    logDebug(`Triggering event ${eventName}`);
    eventManager.triggerEvent(FOURTHWALL_EVENT_SOURCE_ID, eventName, eventData);
};

const script: Firebot.CustomScript<{
    copyWebhookUrl: void;
}> = {
    getScriptManifest: () => ({
        name: PLUGIN_NAME,
        description: packageInfo.description,
        author: packageInfo.author,
        version: packageInfo.version,
        firebotVersion: "5",
        startupOnly: true,
        initBeforeShowingParams: true
    }),
    getDefaultParameters: () => ({
        copyWebhookUrl: {
            type: "button",
            title: "Webhook URL",
            description: "Copy this URL then go to your Fourthwall account settings. Under Settings > For developers > Webhooks, create a new webhook, paste the copied URL into the **URL** field, select which events you want Fourthwall to send, and click \"Save\".",
            backendEventName: "fourthwall:copy-webhook-url",
            buttonText: "Copy URL",
            icon: "fa-copy",
            sync: true
        }
    }),
    run: ({ modules }) => {
        ({ logger, eventManager, replaceVariableManager, webhookManager } = modules);

        logInfo(`Starting ${PLUGIN_NAME} plugin...`);

        if (webhookManager == null) {
            logError(`Cannot start ${PLUGIN_NAME} plugin. You must be on Firebot 5.65 or higher.`);
            return;
        }

        logDebug("Registering events...");
        eventManager.registerEventSource(FourthwallEventSource);

        logDebug("Registering variables...");
        for (const variable of FourthwallVariables) {
            replaceVariableManager.registerReplaceVariable(variable);
        }

        for (const firebotVariable of Object.keys(FirebotVariableAdditionalEvents)) {
            for (const eventName of FirebotVariableAdditionalEvents[firebotVariable]) {
                replaceVariableManager.addEventToVariable(firebotVariable, FOURTHWALL_EVENT_SOURCE_ID, eventName);
            }
        }

        logDebug("Registering frontend listener");
        const frontendCommunicator = modules.frontendCommunicator;
        frontendCommunicator.on("fourthwall:copy-webhook-url", () => {
            frontendCommunicator.send("copy-to-clipboard", { 
                text: webhookManager.getWebhookUrl(PLUGIN_NAME),
            });
        });


        logDebug("Registering webhook listener...");
        webhookManager.on("webhook-received", processWebhook);

        logDebug("Checking for webhook...");
        let webhook = webhookManager.getWebhook(PLUGIN_NAME);

        if (webhook == null) {
            logDebug("Webhook not found. Registering...");

            webhook = webhookManager.saveWebhook(PLUGIN_NAME);
        }

        if (webhook == null) {
            logError("Something went wrong while registering webhook. Exiting.");
            return;
        }

        logDebug("Webhook registered");
        logInfo("Plugin ready. Listening for events.");
    },
    stop: (uninstalling: boolean) => {
        logDebug(`Stopping ${PLUGIN_NAME} plugin`);

        logDebug("Stopping webhook listener");
        webhookManager.removeListener("webhook-received", processWebhook);

        if (uninstalling === true) {
            logDebug("Removing webhook...");

            webhookManager.deleteWebhook(PLUGIN_NAME);

            logInfo("Plugin uninstalled");
        } else {
            logInfo("Plugin stopped");
        }
    }
}

export default script;