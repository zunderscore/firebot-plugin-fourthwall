type FourthwallEventType = 
    | "ORDER_PLACED"
    | "ORDER_UPDATED"
    | "GIFT_PURCHASE"
    | "DONATION"
    | "PRODUCT_CREATED"
    | "PRODUCT_UPDATED"
    | "SUBSCRIPTION_PURCHASED"
    | "SUBSCRIPTION_CHANGED"
    | "SUBSCRIPTION_EXPIRED"
    | "THANK_YOU_SENT"
    | "NEWSLETTER_SUBSCRIBED"
    | "PLATFORM_APP_DISCONNECTED"

type FourthwallPayloadBase = {
    testMode: boolean;
    id: string;
    webhookId: string;
    shopId: string;
    type: FourthwallEventType;
    apiVersion: string;
    createdAt: Date;
    data: unknown;
}

type FourthwallValueWithCurrency = {
    value: number;
    currency: string;
}

type FourthwallAmountWithCurrency = {
    amount: number;
    currency: string;
}

type FourthwallImage = {
    id: string;
    url: string;
    width: number;
    height: number;
}

type FourthwallOrderPayloadData = {
    id: string;
    shopId: string;
    friendlyId: string;
    checkoutId: string;
    promotionId: string;
    status: string;
    email: string;
    emailMarketingOptIn: boolean;
    username: string;
    message: string;
    amounts: {
        subtotal: FourthwallValueWithCurrency;
        shipping: FourthwallValueWithCurrency;
        tax: FourthwallValueWithCurrency;
        donation: FourthwallValueWithCurrency;
        discount: FourthwallValueWithCurrency;
        total: FourthwallValueWithCurrency;
    },
    // Intentionally omitting billing and shipping for privacy
    billing: unknown;
    shipping: unknown;
    offers: [
        {
            id: string;
            name: string;
            slug: string;
            description: string;
            primaryImage: FourthwallImage,
            variant: {
                id: string;
                name: string;
                sku: string;
                unitPrice: FourthwallAmountWithCurrency;
                quantity: number;
                price: FourthwallAmountWithCurrency;
                attributes: {
                    description: string;
                    color: {
                        name: string;
                        swatch: string;
                    };
                    size: {
                        name: string;
                    };
                };
            };
        }
    ],
    source: {
      type: string;
    },
    createdAt: Date;
    updatedAt: Date;
}

type FourthwallOrderPlacedPayload = FourthwallPayloadBase & {
    type: "ORDER_PLACED";
    data: FourthwallOrderPayloadData;
}

type FourthwallOrderUpdatedPayload = FourthwallPayloadBase & {
    type: "ORDER_UPDATED";
    data: {
        order: FourthwallOrderPayloadData;
    };
}

type FourthwallGiftStatus = 
    | "AVAILABLE"
    | "REDEEMED"
    | "CANCELLED"
    | "CHANGED_TO_PROMOTION"

type FourthwallGiftBase = {
    status: FourthwallGiftStatus;
    id: string;
    winner?: {
        email?: string;
        username: string;
    }
}

type FourthwallAvailableGift = FourthwallGiftBase & {
    status: "AVAILABLE";
}

type FourthwallRedeemedGift = FourthwallGiftBase & {
    status: "REDEEMED";
    orderId: string;
    orderFriendlyId: string;
}

type FourthwallCancelledGift = FourthwallGiftBase & {
    status: "CANCELLED";
}

type FourthwallChangedToPromotionGift = FourthwallGiftBase & {
    status: "CHANGED_TO_PROMOTION";
    promotionId: string;
}

type FourthwallGift = 
    | FourthwallAvailableGift
    | FourthwallRedeemedGift
    | FourthwallCancelledGift
    | FourthwallChangedToPromotionGift

type FourthwallGiftPurchasePayload = FourthwallPayloadBase & {
    type: "GIFT_PURCHASE";
    data: {
        id: string;
        friendlyId: string;
        shopId: string;
        offer: {
            id: string;
            name: string;
            slug: string;
            description: string;
            primaryImage: FourthwallImage;
        };
        quantity: number;
        amounts: {
            subtotal: FourthwallValueWithCurrency;
            tax: FourthwallValueWithCurrency;
            total: FourthwallValueWithCurrency;
            paidBySupporter: FourthwallValueWithCurrency;
            profit: FourthwallValueWithCurrency;
            prepaidShipping: FourthwallValueWithCurrency;
        };
        email: string;
        username: string;
        message: string;
        gifts: FourthwallGift[];
        createdAt: Date;
    }
}

type FourthwallDonationPayload = FourthwallPayloadBase & {
    type: "DONATION";
    data: {
        id: string;
        shopId: string;
        status: string;
        email: string;
        username: string;
        message: string;
        amounts: {
            total: FourthwallValueWithCurrency;
        };
        createdAt: Date;
        updatedAt: Date;
    }
}

type FourthwallProductVariant = {
    id: string;
    name: string;
    sku: string;
    unitPrice: FourthwallValueWithCurrency;
    attributes: {
        description: string;
        color: {
            name: string;
            swatch: string;
        };
        size: {
            name: string;
        };
    };
    stock: {
        type: string;
        inStock: number;
    };
    weight: {
        value: number;
        unit: string;
    };
    dimensions: {
        length: number;
        width: number;
        height: number;
        unit: string;
    };
    images: FourthwallImage[];
}

type FourthwallProductPayloadData = {
    id: string;
    name: string;
    slug: string;
    description: string;
    state: {
        type: string;
    };
    images: FourthwallImage[];
    variants: FourthwallProductVariant[];
    createdAt: Date;
    updatedAt: Date;
}

type FourthwallProductCreatedPayload = FourthwallPayloadBase & {
    type: "PRODUCT_CREATED";
    data: FourthwallProductPayloadData;
}

type FourthwallProductUpdatedPayload = FourthwallPayloadBase & {
    type: "PRODUCT_UPDATED";
    data: {
        product: FourthwallProductPayloadData;
    };
}

type FourthwallMembershipPayloadData = {
    id: string;
    email: string;
    nickname: string;
    subscription: {
        type: string;
        variant: {
            id: string;
            interval: string;
            amount: FourthwallValueWithCurrency;
        };
    };
}

type FourthwallMembershipSubscriptionPurchasedPayload = FourthwallPayloadBase & {
    type: "SUBSCRIPTION_PURCHASED";
    data: FourthwallMembershipPayloadData;
}

type FourthwallMembershipSubscriptionChangedPayload = FourthwallPayloadBase & {
    type: "SUBSCRIPTION_CHANGED";
    data: FourthwallMembershipPayloadData;
}

type FourthwallMembershipSubscriptionExpiredPayload = FourthwallPayloadBase & {
    type: "SUBSCRIPTION_EXPIRED";
    data: FourthwallMembershipPayloadData;
}

type FourthwallThankYouContributionType =
    | "ORDER"
    | "DONATION"
    | "GIFT_PURCHASE"

type FourthwallThankYouSentPayload = FourthwallPayloadBase & {
    type: "THANK_YOU_SENT";
    data: {
        id: string;
        mediaUrl: string;
        contribution: {
            type: FourthwallThankYouContributionType;
            id: string;
            shopId: string;
            supporter: {
                email: string;
                username: string;
                message: string;
            };
        };
    };
}

type FourthwallNewsletterSubscribedPayload = FourthwallPayloadBase & {
    type: "NEWSLETTER_SUBSCRIBED";
    data: {
        email: string;
    };
}

type FourthwallPlatformAppDisconnectedPayload = FourthwallPayloadBase & {
    type: "PLATFORM_APP_DISCONNECTED";
    data: {
        appId: string;
        shopId: string;
    };
}

export type FourthwallPayload =
    | FourthwallOrderPlacedPayload
    | FourthwallOrderUpdatedPayload
    | FourthwallGiftPurchasePayload
    | FourthwallDonationPayload
    | FourthwallProductCreatedPayload
    | FourthwallProductUpdatedPayload
    | FourthwallMembershipSubscriptionPurchasedPayload
    | FourthwallMembershipSubscriptionChangedPayload
    | FourthwallMembershipSubscriptionExpiredPayload
    | FourthwallThankYouSentPayload
    | FourthwallNewsletterSubscribedPayload
    | FourthwallPlatformAppDisconnectedPayload

type FourthwallEventDataBase = {
    testMode: boolean;
    eventId: string;
    webhookId: string;
    shopId: string;
    type: FourthwallEventType;
    apiVersion: string;
    createdAt: Date;
}

export type FourthwallOrderEventData = FourthwallEventDataBase & {
    type: "ORDER_PLACED" | "ORDER_UPDATED";
    orderId: string;
    friendlyId: string;
    checkoutId: string;
    status: string;
    from: string;
    email: string;
    emailMarketingOptIn: boolean;
    donationMessage: string;
    donationAmount: number;
    orderTotalAmount: number;
    quantity: number;
    currency: string;
    updatedAt: Date;
    source: string;
}

export type FourthwallGiftEventData = FourthwallEventDataBase & {
    type: "GIFT_PURCHASE";
    giftPurchaseId: string;
    friendlyId: string;
    productId: string;
    productName: string;
    productDescription: string;
    productImageUrl: string;
    quantity: number;
    from: string;
    email: string;
    donationMessage: string;
    orderTotalAmount: number;
    currency: string;
}

export type FourthwallDonationEventData = FourthwallEventDataBase & {
    type: "DONATION";
    donationId: string;
    status: string;
    from: string;
    email: string;
    donationMessage: string;
    donationAmount: number;
    currency: string;
    updatedAt: Date;
}

export type FourthwallProductEventData = FourthwallEventDataBase & {
    type: "PRODUCT_CREATED" | "PRODUCT_UPDATED";
    productId: string;
    productName: string;
    productDescription: string;
    productStatus: string;
    productImageUrl: string;
    variants: FourthwallProductVariant[];
    updatedAt: Date;
}

export type FourthwallSubscriptionEventData = FourthwallEventDataBase & {
    type: "SUBSCRIPTION_PURCHASED" | "SUBSCRIPTION_CHANGED" | "SUBSCRIPTION_EXPIRED";
    subscriptionId: string;
    from: string;
    email: string;
    subscriptionStatus: string;
    subscriptionType: string;
    subscriptionInterval: string;
    subscriptionAmount: number;
    currency: string;
}

export type FourthwallThankYouEventData = FourthwallEventDataBase & {
    type: "THANK_YOU_SENT";
    thankYouId: string;
    mediaUrl: string;
    contributionType: FourthwallThankYouContributionType;
    contributionId: string;
    recipientName: string;
    email: string;
    thankYouMessage: string;
}

export type FourthwallNewsletterSubscriptionEventData = FourthwallEventDataBase & {
    type: "NEWSLETTER_SUBSCRIBED";
    email: string;
}

export type FourthwallPlatformAppDisconnectEventData = FourthwallEventDataBase & {
    type: "PLATFORM_APP_DISCONNECTED";
    appId: string;
}

export type FourthwallEventData = 
    | FourthwallOrderEventData
    | FourthwallGiftEventData
    | FourthwallDonationEventData
    | FourthwallProductEventData
    | FourthwallSubscriptionEventData
    | FourthwallThankYouEventData
    | FourthwallNewsletterSubscriptionEventData
    | FourthwallPlatformAppDisconnectEventData