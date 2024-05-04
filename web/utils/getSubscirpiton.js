import shopify from "../shopify.js";


export default async function subscriptiondetail(session){
  const client = new shopify.api.clients.Graphql({ session });
    const getsubscripition = `{
        appInstallation {
          activeSubscriptions {
            name
            status
            test
            lineItems {
              plan {
                pricingDetails {
                  ... on AppRecurringPricing {
                    __typename
                    price {
                      amount
                      currencyCode
                    }
                    interval
                  }
                }
              }
            }
          }
        }
      }`
    const response = await client.request(getsubscripition);
    return response.data.appInstallation.activeSubscriptions
}