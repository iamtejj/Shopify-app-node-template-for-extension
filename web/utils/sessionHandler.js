import { Session } from "@shopify/shopify-api";
import Cryptr from "cryptr";
import SessionModel from "./models/SessionModel.js";

const cryption = new Cryptr("shopifyapp");

const storeSession = async (session) => {
  await SessionModel.findOneAndUpdate(
    { id: session.id },
    {
      content: cryption.encrypt(JSON.stringify(session)),
      shop: session.shop,
    },
    { upsert: true }
  );

  return true;
};

const loadSession = async (id) => {
  const sessionResult = await SessionModel.findOne({ id });
  if (sessionResult === null) {
    return undefined;
  }
  if (sessionResult.content.length > 0) {
    const sessionObj = JSON.parse(cryption.decrypt(sessionResult.content));
    const returnSession = new Session(sessionObj);
    return returnSession;
  }
  return undefined;
};

const deleteSession = async (id) => {
  await SessionModel.deleteMany({ id });
  return true;
};

const findSessionsByShop = async (id) =>{
  const sessionResult = await SessionModel.findOne({ id });
  if (sessionResult === null) {
    return undefined;
  }
  if (sessionResult.content.length > 0) {
    const sessionObj = JSON.parse(cryption.decrypt(sessionResult.content));
    return sessionObj;
  }
}

const deleteSessions = async (id) =>{
  await SessionModel.deleteMany({ id });
  return true;
}

const sessionHandler = { storeSession, loadSession, deleteSession ,findSessionsByShop,deleteSessions };

export default sessionHandler;
