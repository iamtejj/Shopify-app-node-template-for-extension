import { Button, Divider, List } from "@shopify/polaris"
import "../assets/global.css"
import '../styles/home.scss'
import { useAuthenticatedFetch } from "../hooks"
import { useEffect, useState } from "react";

export default function Billing(){
    const [allreadySubscribed,setAllreadysubscribed] = useState(false);
    const [activeSubscription,setActiveSubscription] = useState([])
    const fetch = useAuthenticatedFetch();

    async function getSubscriptionDetails(){
        const dataSubscription = await fetch('/api/getSubscription');
        
        const jsonSubscription = await dataSubscription.json();
        if(jsonSubscription.length > 0){
            setAllreadysubscribed(true)
            setActiveSubscription(jsonSubscription[0])
        }
        else{
            setAllreadysubscribed(false)
        }
        console.log(jsonSubscription)
    }
    async function cancelsubscription(){
        const formData = {id:activeSubscription.id}
        const response = await fetch("/api/cancelsubscription", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          const scData = await response.json()
          getSubscriptionDetails()
        
    }
    async function createNewSubscription(){
        let response = await fetch("/api/createSubscription");
        let jsonResponse = await response.json();
        open(jsonResponse.data.appSubscriptionCreate.confirmationUrl, "_top");
        console.log(jsonResponse.data.appSubscriptionCreate.confirmationUrl);
    }
    useEffect(()=>{
        getSubscriptionDetails()
    },[])

    return(
        <>
        <div className="homepage-hero">
            <div className="mainbillingcontainer">
                <div className="pricingplan">
                    <span className="price">10$</span><span className="permonth">/month</span>
                </div>
                <div>Shopify Plus required</div>
                <Divider />
                <div className="list-box">
                <List  type="bullet">
                    <List.Item>1 active block + function</List.Item>
                    <List.Item>25+ checkout blocks</List.Item>
                    <List.Item>10+ functions</List.Item>
                    <List.Item>Discount functions (product, order, shipping)</List.Item>
                    <List.Item>Checkout branding</List.Item>
                    <List.Item>Unlimited orders</List.Item>
                </List>
                </div>
                <Button onClick={createNewSubscription} disabled={allreadySubscribed}  fullWidth={true}>
                    Try Now
                </Button>

                {allreadySubscribed && (
                    <Button onClick={()=>{cancelsubscription()}} fullWidth={true}>Cancel Subsription</Button>
                )}
                
            </div>
        </div>
        
        </>
    )
}