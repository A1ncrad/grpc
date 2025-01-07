import grpc from "@grpc/grpc-js";
import protoloader from "@grpc/proto-loader";

const packageDef = protoloader.loadSync("hypurr.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const pack = grpc.loadPackageDefinition(packageDef);
const hypurr = pack.hypurr
const credentials = grpc.credentials.createSsl();
const hypurrStatic = new hypurr.Static("grpc.hypurr.fun", credentials);

function getWallet(address) {

    const payload = {
        "ethereum_address": {
            "value": address
        }
    }

    hypurrStatic.HyperliquidWallet(payload, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log(res.wallet);
    });

}


const hypurrTelegram = new hypurr.Telegram("grpc.hypurr.fun", credentials);

function buy(telegramStelSsid, launchId, walletId, amount) {

    const payload = {
        "auth_data": telegramStelSsid, 
        "launch_id": launchId,
        "wallet_id": walletId,
        "direction": "BUY",
        "amount": amount,
    }

    hypurrTelegram.HyperliquidLaunchTrade(payload, (err, res) => {
        if (err) {
            console.log(err)
        }

        console.log("Buy: ");
        console.log(res);
    });
}




function sell(telegramStelSsid, launchId, walletId, amount) {

    const payload = {
        "auth_data": telegramStelSsid, 
        "launch_id": launchId,
        "wallet_id": walletId,
        "direction": "SELL",
        "amount": amount,
    }
    
    hypurrTelegram.HyperliquidLaunchTrade(payload, (err, res) => {
        if (err) {
            console.log(err)
            return;
        }

        console.log("Sell:");
        console.log(res);
    });
}

//getWallet("0xBf3AB243d495AF193938076E2A193F320cFd26D2"); 

const auth = {

}

buy(auth, 12101, 90245, 1000.0);
//sell(auth, 12101, 90245, 50.0);
