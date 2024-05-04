import shopify from "../shopify.js";
export default async function createNewSubscription(session) {
    try {
        const client = new shopify.api.clients.Graphql({ session });
        console.log(session)
        const returnUrl = `https://${shopify.api.config.hostName}/api/auth?shop=${session.shop}`;
        console.log(returnUrl)
        const planName = "$15.00 plan";
        const planPrice = 15.00; //Always a decimal
        const newSubscriptionQuery = `mutation CreateSubscription{
        appSubscriptionCreate(
          name: "${planName}"
          returnUrl: "${returnUrl}"
          test: true
          trialDays:10
          lineItems: [
            {
              plan: {
                appRecurringPricingDetails: {
                  price: { amount: ${planPrice}, currencyCode: USD }
                }
              }
            }
          ]
        ) {
          userErrors {
            field
            message
          }
          confirmationUrl
          appSubscription {
            id
            status
          }
        }
      }
    `
    const response = await client.request(newSubscriptionQuery,{
      retries: 2,
    });
        return response
    } catch (error) {
        return error
    }


}