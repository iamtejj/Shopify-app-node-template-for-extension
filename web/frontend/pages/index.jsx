import {
  Box,
  Grid,
  Page,
  Text,
  List,
  Banner,
  Button
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans  } from "react-i18next";

import { trophyImage } from "../assets";
import "../assets/global.css"
import '../styles/home.scss'
import { ProductsCard } from "../components";
import { useAuthenticatedFetch } from "../hooks";
import { useState } from "react";


export default function HomePage() {
  const { t } = useTranslation();
  const [checkoutBlock,setCheckoutblock] = useState(false)
  const fetch = useAuthenticatedFetch()
  async function getsubscription(){
     let res = await fetch('/api/getSubscription');
     let jsonRes = await res.json()
     console.log(jsonRes)
  }
  async function createNewsubscription(){
    let res = await fetch('/api/createSubscription');
    let jsonRes = await res.json()
    
    if (jsonRes.data.appSubscriptionCreate.userErrors.length > 0) {
      return "no subscription found";
    }
    console.log(jsonRes.data)
    open(jsonRes.data.appSubscriptionCreate.confirmationUrl, "_top");
   
 }
 async function enablecheckoutblocks(){
  setCheckoutblock((oldvalue) => !oldvalue)
  const data = await fetch('/api/checkout/enableblocks')
  const resData = await data.json()
  console.log("metadata")
  console.log(resData)
 }

 async function testcount(){
  const data = await fetch('/api/products/count')
  const count = await data.json()
  console.log(count);
 }
  return (
    <div className="homepage-hero">
        <Page fullWidth>
           <Banner title="🚀 Welcome to Extensions Builder 🛒">
            <div className="homepage-banner-info">
              <Box className="homepage-banner-info-contianer" >
                <Text>✨ Easily enhance your Shopify Checkout page with our extensions.
                 Choose from a variety of extensions designed to improve the
                  shopping experience and boost sales on your Shopify store. 📈
                </Text>
                <List type="bullet">
                  <List.Item>🎨 Simple drag-and-drop setup process</List.Item>
                  <List.Item>⚙️ Customize settings directly within the extension block</List.Item>
                  <List.Item>📈 Enhance customer experience and boost sales</List.Item>
                  <List.Item>
                    🔴 To use extensions, ensure that Checkout Extensibility is enabled. To upgrade, Follow <a href="https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade" target='_blank'>Checkout Extensibility upgrade guide</a>
                  </List.Item> 
                </List>
              </Box>
            </div>
          </Banner>

          <div className="homepage-extensions">
            <div className="homepage-extensions-info">

              <div className="homepage-extension box-shadow">
                <Banner title="Shipping Bar">
                  <div className="homepage-extension-content">
                    <div className="homepage-extension-left">
                      <img
                        alt="Free shipping bar image"
                        width="100%"
                        height="100%"
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                        src="https://cdn.shopify.com/s/files/1/0681/4652/8471/files/FreeShipping.png"
                      />
                    </div>
                    <div className="homepage-extension-right">
                      <p>🚚 Show free shipping progress bar</p>
                      <p>📦 Gamify checkout to increase engagement</p>
                      <p>🌟 Display progress towards free shipping</p>
                      <p>💼 Showcase best products to boost sales</p>
                      <p>⚙️ Customize all settings within the extension</p>
                    </div>
                  </div>
                </Banner>
              </div>

              <div className="homepage-extension box-shadow">
                <Banner title="Upsell Widget">
                  <div className="homepage-extension-content">
                    <div className="homepage-extension-left">
                      <img
                        alt="Upsell widget image"
                        width="100%"
                        height="100%"
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                        src="https://cdn.shopify.com/s/files/1/0681/4652/8471/files/upsellWidget.png"
                      />
                    </div>
                    <div className="homepage-extension-right">
                      <p>🛍️ Add upsell widget to checkout</p>
                      <p>💡 Offer additional products during checkout</p>
                      <p>🌟 Showcase best products to boost sales</p>
                      <p>🛒 Allow variant selection</p>
                      <p>⚙️ Customize settings to your requirements</p>
                    </div>
                  </div>
                </Banner>
              </div>

              <div className="homepage-extension box-shadow">
                <Banner title="Reviews Widget">
                  <div className="homepage-extension-content">
                    <div className="homepage-extension-left">
                      <img
                        alt="Reviews widget image"
                        width="100%"
                        height="100%"
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                        src="https://cdn.shopify.com/s/files/1/0681/4652/8471/files/ReviewsWidget2.png?v=1713081417"
                      />
                    </div>
                    <div className="homepage-extension-right">
                      <p>🌟 Enhance checkout with customer reviews</p>
                      <p>🔍 Showcase best reviews on checkout page</p>
                      <p>🛡️ Build trust with authentic feedback</p>
                      <p>📊 Gain insights and improve satisfaction</p>
                      <p>⚙️ Manage all review inputs for easy customization</p>
                    </div>
                  </div>
                </Banner>
              </div>

              <div className="homepage-extension box-shadow">
                <Banner title="Image With Text">
                  <div className="homepage-extension-content">
                    <div className="homepage-extension-left">
                      <img
                        alt="Image with text image"
                        width="100%"
                        height="100%"
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                        src="https://cdn.shopify.com/s/files/1/0681/4652/8471/files/ImageWithText.png"
                      />
                    </div>
                    <div className="homepage-extension-right">
                      <p>🌟 Enhance checkout with custom text and images</p>
                      <p>🖼️ Add brand slogan or tagline for a memorable experience</p>
                      <p>🛡️ Instill trust with badges highlighting brand credibility</p>
                      <p>🎨 Showcase brand uniquely for a lasting impression</p>
                      <p>⚙️ Easily customize with provided settings</p>
                    </div>
                  </div>
                </Banner>
              </div>
              <div>
                <Button onClick={()=>{enablecheckoutblocks()}}>Sync Data</Button>
              </div>
            </div>
          </div>
        </Page>
      </div>
  );
}
