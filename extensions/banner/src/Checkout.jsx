import {
  Banner,
  useApi,
  useTranslate,
  reactExtension,
  useMetafields,
  useMetafield,
  useAppMetafields,
  Text,
} from '@shopify/ui-extensions-react/checkout';
import { useEffect, useState } from 'react';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  const [appsubscription,setAppsubscription] = useState(false)
  const translate = useTranslate();
  const {sessionToken ,extension} = useApi();
 // Define the metafield namespace and key
 const metafieldNamespace = "checkout block";
 const metafieldKey = "checkout-blocks";

 // Get a reference to the metafield
 const metaFields = useAppMetafields();
 const deliveryInstructions = useMetafield({
   namespace: metafieldNamespace,
   key: metafieldKey,
 });


  async function getSubscriptionDetail(url){
    console.log("url")
    console.log(url)
    const token = await sessionToken.get();
    console.log(deliveryInstructions)
    console.log(token)
    const result = await fetch(
      `https://${url}/api/getSubscription`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }, 
    );
    const resJson = await result.json()
    console.log("sessionToken")
    console.log(resJson)
    console.log(token)
    
    if(resJson.length > 0){
      setAppsubscription(true)
    }
    console.log(resJson.length)
    return resJson;
  }

  useEffect(()=>{
    console.log("metaFields")
    
    if(metaFields.length){
      let checkoutBlockmetafield = metaFields.filter((metaTitle)=>(metaTitle.metafield.key === 'checkout-blocks'))  
      let url = checkoutBlockmetafield[0].metafield.value.replaceAll('"',"")
       getSubscriptionDetail(url)
    }
    // getSubscriptionDetail()
  },[metaFields])
  if(!appsubscription){
    return 
  }

  return (
    <Banner title="banner">
      <Text>Hi There</Text>
    </Banner>
  );
}