import shopify from "../shopify.js";
const enablecheckoutblock = async function (session) {
    try {
        const client = new shopify.api.clients.Graphql({ session });
        const shopQuery = `{
                shop{
                  id
                }
              }`
        const shopData = await client.request(shopQuery)

        const query = `mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
                metafieldsSet(metafields: $metafields) {
                metafields {
                    key
                    namespace
                    value
                    createdAt
                    updatedAt
                }
                userErrors {
                    field
                    message
                    code
                }
                }
            }`
        const shopid = shopData.data.shop.id;
        const hostName = shopify.api.config.hostName
        const queryVariable = {
            "key": "checkout-blocks",
            "namespace": "checkout block",
            "ownerId": shopid,
            type: "multi_line_text_field",
            value: hostName
        };
        const LastData = await client.request(query, {
            variables: {
                metafields: [queryVariable]
            }
        })
        const jsonData = LastData.data
        return jsonData

    } catch (error) {
        return { error }
    }


}

const cancelSubscription = async function (session,id) {
    try {
        const client = new shopify.api.clients.Graphql({ session });
        const cancelSubscription = `mutation appSubscriptionCancel($id: ID!) {
            appSubscriptionCancel(id: $id prorate: true) {
              appSubscription {
                 id
              }
              userErrors {
                field
                message
              }
            }
          }`;
        const LastData = await client.request(cancelSubscription, {
            variables: {
                id: id
            }
        })
        return {
            success: true,
            LastData
        }

    } catch (error) {
        console.log(error)
        return { error }
    }
}


export { enablecheckoutblock, cancelSubscription }