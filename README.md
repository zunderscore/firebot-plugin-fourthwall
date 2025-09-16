# Fourthwall Plugin for Firebot

This plugin adds support for Fourthwall events and related variables to Firebot.

## Prerequisites
- Firebot 5.65 or higher

## Setup

1. Copy the `firebot-fourthwall.js` file into your Firebot profile's `scripts` folder (e.g. `%appdata%\Firebot\v5\profiles\Main Profile\scripts`)
2. Go to Settings > Scripts in Firebot
3. Click on "Manage Startup Scripts"
4. Click "Add New Script"
5. Select the `firebot-fourthwall.js` file from the dropdown list
6. Click "Add & Configure"
7. Click the "Copy URL" button under "Webhook URL", then close both the script settings and the "Startup Scripts" modals
8. In your Fourthwall account, under Settings > For developers > Webhooks, create a new webhook, paste the copied URL into the **URL** field, select which events you want Fourthwall to send, and click "Save"

## Events

New events:
- **Fourthwall: Order Placed**
- **Fourthwall: Order Updated**
- **Fourthwall: Donation**
- **Fourthwall: Gift Purchase**
- **Fourthwall: Product Created**
- **Fourthwall: Product Updated**
- **Fourthwall: Subscription Purchased**
- **Fourthwall: Subscription Changed**
- **Fourthwall: Subscription Expired**
- **Fourthwall: Thank You Sent**
- **Fourthwall: Newsletter Subscribed**
- **Fourthwall: Platform App Disconnected**
- **Fourthwall: Gift Draw Started**
- **Fourthwall: Gift Draw Ended**

## Variables

Existing Firebot variables with added support for Fourthwall:
- `$donationAmount`
- `$donationFrom`
- `$donationMessage`

New variables:
- `$fourthwallApiVersion`
- `$fourthwallCurrency`
- `$fourthwallDonationStatus`
- `$fourthwallEventId`
- `$fourthwallEventType`
- `$fourthwallIsTestMode`
- `$fourthwallOrderId`
- `$fourthwallOrderStatus`
- `$fourthwallOrderTotalAmount`
- `$fourthwallProductDescription`
- `$fourthwallProductId`
- `$fourthwallProductImage`
- `$fourthwallProductName`
- `$fourthwallProductStatus`
- `$fourthwallQuantity`
- `$fourthwallShopId`
- `$fourthwallSubscriptionStatus`
- `$fourthwallSubscriptionType`
- `$fourthwallThankYouRecipient`
- `$fourthwallWebhookId`

**WARNING: The following variables may contain sensitive/private data. Use with caution!**

- `$fourthwallSupporterEmail`