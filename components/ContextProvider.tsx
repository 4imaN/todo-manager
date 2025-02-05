  "use client";

  import {
    Session,
    createKeyStoreInteractor,
    createSingleSigAuthDescriptorRegistration,
    createWeb3ProviderEvmKeyStore,
    hours,
    registerAccount,
    registrationStrategy,
    ttlLoginRule,
  } from "@chromia/ft4";
  import { createClient } from "postchain-client";
  import { ReactNode, createContext, useContext, useEffect, useState } from "react";
  import { getRandomUserName } from "@/utils/user";

  // Create context for Chromia session
  const ChromiaContext = createContext<Session | undefined>(undefined);

  declare global {
    interface Window {
      ethereum: any;
    }
  }

  export function ContextProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | undefined>(undefined);

    useEffect(() => {
      const initSession = async () => {
        console.log("Initializing Session");

        try {
          // 1. Initialize Client
          const client = await createClient({
            nodeUrlPool: "http://localhost:7740",
            blockchainIid: 0,
          });
          console.log("Client initialized");

          // 2. Connect with MetaMask
          if (!window.ethereum) {
            throw new Error("MetaMask is not installed");
          }
          const evmKeyStore = await createWeb3ProviderEvmKeyStore(window.ethereum);
          console.log("Connected with MetaMask");

          // 3. Get all accounts associated with evm address
          const evmKeyStoreInteractor = createKeyStoreInteractor(client, evmKeyStore);
          const accounts = await evmKeyStoreInteractor.getAccounts();
          console.log("Accounts fetched:", accounts);

          if (accounts.length > 0) {
            // 4. Start a new session
            const { session } = await evmKeyStoreInteractor.login({
              accountId: accounts[0].id,
              config: {
                rules: ttlLoginRule(hours(2)),
                flags: ["S"],
              },
            });
            setSession(session);
            console.log("Session started:", session);
          } else {
            // 5. Create a new account by signing a message using MetaMask
            const authDescriptor = createSingleSigAuthDescriptorRegistration(["A", "T"], evmKeyStore.id);
            const { session } = await registerAccount(
              client,
              evmKeyStore,
              registrationStrategy.open(authDescriptor, {
                config: {
                  rules: ttlLoginRule(hours(2)),
                  flags: ["S"],
                },
              }),
              {
                name: "create_user",
                args: [getRandomUserName()],
              }
            );
            setSession(session);
            console.log("New account created and session started:", session);
          }
        } catch (error) {
          console.error("Error initializing session:", error);
        }
      };

      initSession();
    }, []);

    return <ChromiaContext.Provider value={session}>{children}</ChromiaContext.Provider>;
  }

  
  export function useSessionContext() {
    return useContext(ChromiaContext);
  }