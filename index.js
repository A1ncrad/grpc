import grpc from "@grpc/grpc-js";
import protoloader from "@grpc/proto-loader";

const packageDef = protoloader.loadSync("hypurr.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

export const hypurr = grpc.loadPackageDefinition(packageDef).hypurr;
const hypurrStatic = new hypurr.Static("grpc.hypurr.fun", grpc.credentials.createSsl());

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

const hypurrTelegram = new hypurr.Telegram("grpc.hypurr.fun", grpc.credentials.createSsl());

function buy(telegramStelSsid, launchId, walletId, amount) {

    const payload = {
        "auth_data": telegramStelSsid, 
        "launch_id": launchId,
        "wallet_id": walletId,
        "direction": 2,
        "amount": amount,
    }

    hypurrTelegram.HyperliquidLaunchTrade(payload, (err, res) => {
        if (err) {
            console.log(err)
            return;
        }

        console.log(res);
    });
}


function sell(telegramStelSsid, launchId, walletId, amount) {

    const payload = {
        "auth_data": telegramStelSsid, 
        "launch_id": launchId,
        "wallet_id": walletId,
        "direction": 1,
        "amount": amount,
    }
    
    hypurrTelegram.HyperliquidLaunchTrade(payload, (err, res) => {
        if (err) {
            console.log(err)
            return;
        }

        console.log(res);
    });
}

getWallet("0xBf3AB243d495AF193938076E2A193F320cFd26D2"); 

buy("", 8199, , 1.0);
