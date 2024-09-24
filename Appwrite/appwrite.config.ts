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
export const API_KEY="standard_cc16f69fc7241685bad484e43b9184c37ecb19b2a95e34dc284b084edb015754d74e31ad2cf18d1ad2a14c923e02289a941a96bd0fe2bf873ae3d02258b45dda58ecb910350906edba803981dc8a4331c9a468346244e9e2d5b6f16f9b3880a7e353b6f73dd97194a4f843e1d019c4d5bd397ec5fa2839a980c5ea607465478d"
export const DATABASE_ID="66e04fc1000d37169a1b"
export const PLAYER_COLLECTION_ID="66e04fe60010a176695f"
export const BUCKET_ID="66e1867800086b018e3c"
export const ENDPOINT="https://cloud.appwrite.io/v1"
export const MATCH_COLLECTION_ID="66e05063001e2f77fc2d"

export const VITE_PROJECT_ID="66dd9020000acf72fa3c"
export const VITE_API_KEY="standard_a6391039a3917115c0575330354fcfcc8a98dbed23ada782daefc812cc77c9008360dd22b7fc56794e94a24ec24c82a80f46863d61b9d1a335c9767ea4b627317eac9a38f833fab9ff16fbe1ecff3fa5c7ac877688969d8f631bc0ec785cc6822a86fdae10e8c57444a4baea321ceb6de72e188919e8fc202a082e9c1fca9bf3"
export const VITE_DATABASE_ID="66e04fc1000d37169a1b"
export const VITE_PLAYER_COLLECTION_ID="66e04fe60010a176695f"
export const VITE_BUCKET_ID="66e1867800086b018e3c"
export const VITE_ENDPOINT = "https://cloud.appwrite.io/v1";


const client =new sdk.Client();
client
    .setEndpoint(VITE_ENDPOINT!)
    .setProject(VITE_PROJECT_ID!)
    .setKey(VITE_API_KEY!);

export const databases =new sdk.Databases(client);
export const storage =new sdk.Storage(client);
export const users =new sdk.Users(client);
export const account =new sdk.Account(client);

export const CreateSessionClient = async (session?: string): Promise<sdk.Account> => {
  if (!ENDPOINT || !PROJECT_ID) {
    throw new Error("ENDPOINT and PROJECT_ID must be defined");
  }

  const client = new sdk.Client()
    .setEndpoint(VITE_ENDPOINT)
    .setProject(VITE_PROJECT_ID);

  if (session) {
    client.setSession(session);
  }

  return new sdk.Account(client);
};