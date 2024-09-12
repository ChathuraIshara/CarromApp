import * as sdk from 'node-appwrite';
// export const {
//   VITE_PROJECT_ID: PROJECT_ID,
//   VITE_API_KEY: API_KEY,
//   VITE_DATABASE_ID: DATABASE_ID,
//   VITE_PLAYER_COLLECTION_ID: PLAYER_COLLECTION_ID,
//   VITE_BUCKET_ID: BUCKET_ID,
//   VITE_ENDPOINT: ENDPOINT,
// } = meta.env;
 export const PROJECT_ID="66dd9020000acf72fa3c"
export const API_KEY="standard_34985cb40e33cf0f6c47af190d7a9a675614ef923b89efac4e71d6e36fea3ae6d17471180e37ec87f15649f265ddd20206676e72d104e09567023ca1ecf452ccbc05f58dad6574ea5747e697a8801c25c1effd9d3912c8e85c4ff9c8902aad7780506b05a2912cded05bac832d1d5cafb6f96d60407a0a2c62f49587d0cfcff7"
export const DATABASE_ID="66e04fc1000d37169a1b"
export const PLAYER_COLLECTION_ID="66e04fe60010a176695f"
export const BUCKET_ID="66e1867800086b018e3c"
export const ENDPOINT="https://cloud.appwrite.io/v1"

const client =new sdk.Client();
client
    .setEndpoint(ENDPOINT!)
    .setProject(PROJECT_ID!)
    .setKey(API_KEY!);

export const databases =new sdk.Databases(client);
export const storage =new sdk.Storage(client);
export const users =new sdk.Users(client);